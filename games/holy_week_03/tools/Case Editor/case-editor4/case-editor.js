class CaseEditor {
    constructor() {
        this.fileInput = document.getElementById('file-input');
        this.actSelect = document.getElementById('act-select');
        this.caseSelect = document.getElementById('case-select');
        this.searchInput = document.getElementById('search-input');
        this.exportBtn = document.getElementById('export-btn');
        this.saveFileBtn = document.getElementById('save-file-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.statusEl = document.getElementById('status');
        this.sectionsContainer = document.getElementById('sections-container');

        // fileName -> raw source text exactly as loaded (never mutated; every
        // "Save Act File" is re-spliced from this, so re-saving is always safe)
        this.fileSources = {};
        // fileName -> [{ fileName, varName, id, title, actLabel, data, original, openBrace, closeBrace, modified }]
        this.filesData = {};
        // currently loaded case entry, or null
        this.currentCase = null;

        this.bindEvents();
        window.addEventListener('beforeunload', (e) => {
            if (this.hasAnyModifiedCase()) {
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }

    bindEvents() {
        this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        this.actSelect.addEventListener('change', () => {
            if (!this.confirmDiscardIfNeeded()) { this.actSelect.value = this.lastActValue || ''; return; }
            this.lastActValue = this.actSelect.value;
            this.populateCaseSelect();
        });
        this.caseSelect.addEventListener('change', () => {
            if (!this.confirmDiscardIfNeeded()) { this.caseSelect.value = this.lastCaseValue || ''; return; }
            this.lastCaseValue = this.caseSelect.value;
            this.loadSelectedCase();
        });
        this.searchInput.addEventListener('input', () => this.applySearchFilter());
        this.exportBtn.addEventListener('click', () => this.exportCurrentCase());
        this.saveFileBtn.addEventListener('click', () => this.saveActFile());
        this.resetBtn.addEventListener('click', () => this.resetCurrentCase());
    }

    confirmDiscardIfNeeded() {
        if (this.currentCase && this.currentCase.modified) {
            return window.confirm(`"${this.currentCase.title}" has unsaved changes that will be lost. Continue?`);
        }
        return true;
    }

    hasAnyModifiedCase() {
        return Object.values(this.filesData).some((cases) => cases.some((c) => c.modified));
    }

    // ---------- Loading & parsing ----------

    async handleFiles(fileList) {
        if (!fileList || !fileList.length) return;
        this.setStatus(`Reading ${fileList.length} file(s)...`);

        for (const file of Array.from(fileList)) {
            try {
                const text = await this.readFile(file);
                const cases = this.parseCasesFromSource(text, file.name);
                if (!cases.length) {
                    console.warn(`No "export const NAME = { ... }" objects found in ${file.name}`);
                }
                this.fileSources[file.name] = text;
                this.filesData[file.name] = cases;
            } catch (err) {
                console.error(`Failed to parse ${file.name}`, err);
                this.setStatus(`Error parsing ${file.name}: ${err.message}`);
            }
        }

        this.populateActSelect();
        const totalCases = Object.values(this.filesData).reduce((sum, arr) => sum + arr.length, 0);
        this.setStatus(`Loaded ${Object.keys(this.filesData).length} file(s), ${totalCases} case(s) found. Choose an Act and Case to begin.`);
        this.fileInput.value = '';
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Could not read file'));
            reader.readAsText(file);
        });
    }

    parseCasesFromSource(text, fileName) {
        const cases = [];
        const declRegex = /export\s+const\s+([A-Za-z0-9_]+)\s*=\s*{/g;
        let match;

        while ((match = declRegex.exec(text)) !== null) {
            const varName = match[1];
            const openBraceIndex = match.index + match[0].length - 1;
            const closeIndex = this.findMatchingBrace(text, openBraceIndex);

            if (closeIndex === -1) {
                console.warn(`Could not find closing brace for ${varName} in ${fileName}`);
                continue;
            }

            const objectText = text.slice(openBraceIndex, closeIndex + 1);
            let data;
            try {
                data = this.evaluateObjectLiteral(objectText);
            } catch (err) {
                console.error(`Failed to evaluate ${varName} in ${fileName}`, err);
                continue;
            }

            cases.push({
                fileName,
                varName,
                id: data.id || varName,
                title: data.title || varName,
                actLabel: data.actLabel || fileName.replace(/\.js$/i, ''),
                data,
                original: this.deepClone(data),
                openBrace: openBraceIndex,
                closeBrace: closeIndex,
                modified: false,
            });
        }

        return cases;
    }

    evaluateObjectLiteral(objectText) {
        const stubbed = new Set();
        for (let attempt = 0; attempt < 10; attempt++) {
            const stubDecls = Array.from(stubbed)
                .map((name) => `const ${name} = (...args) => args[0];`)
                .join('\n');
            try {
                return new Function(`${stubDecls}\nreturn (${objectText});`)();
            } catch (err) {
                const match = /^([A-Za-z_$][A-Za-z0-9_$]*) is not defined$/.exec(err.message);
                if (match && !stubbed.has(match[1])) {
                    stubbed.add(match[1]);
                    continue;
                }
                throw err;
            }
        }
        throw new Error('Too many undefined references to stub out');
    }

    findMatchingBrace(text, openIndex) {
        let depth = 0;
        let inString = null;
        let inLineComment = false;
        let inBlockComment = false;

        for (let i = openIndex; i < text.length; i++) {
            const c = text[i];

            if (inLineComment) { if (c === '\n') inLineComment = false; continue; }
            if (inBlockComment) {
                if (c === '*' && text[i + 1] === '/') { inBlockComment = false; i++; }
                continue;
            }
            if (inString) {
                if (c === '\\') { i++; continue; }
                if (c === inString) inString = null;
                continue;
            }
            if (c === '/' && text[i + 1] === '/') { inLineComment = true; i++; continue; }
            if (c === '/' && text[i + 1] === '*') { inBlockComment = true; i++; continue; }
            if (c === '"' || c === "'" || c === '`') { inString = c; continue; }

            if (c === '{') depth++;
            else if (c === '}') {
                depth--;
                if (depth === 0) return i;
            }
        }
        return -1;
    }

    // ---------- Act / Case selects ----------

    populateActSelect() {
        const previous = this.actSelect.value;
        this.actSelect.innerHTML = '';

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = '-- Select an Act --';
        this.actSelect.appendChild(placeholder);

        for (const fileName of Object.keys(this.filesData)) {
            const cases = this.filesData[fileName];
            const label = (cases[0] && cases[0].actLabel) || fileName;
            const modifiedCount = cases.filter((c) => c.modified).length;
            const option = document.createElement('option');
            option.value = fileName;
            option.textContent = `${label} (${fileName})${modifiedCount ? ` — ${modifiedCount} unsaved` : ''}`;
            this.actSelect.appendChild(option);
        }

        if (previous && this.filesData[previous]) {
            this.actSelect.value = previous;
        }
        this.lastActValue = this.actSelect.value;

        this.populateCaseSelect();
    }

    populateCaseSelect() {
        const fileName = this.actSelect.value;
        this.caseSelect.innerHTML = '';

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = fileName ? '-- Select a Case --' : '-- Select an Act first --';
        this.caseSelect.appendChild(placeholder);

        if (fileName && this.filesData[fileName]) {
            for (const c of this.filesData[fileName]) {
                const option = document.createElement('option');
                option.value = c.varName;
                option.textContent = `${c.modified ? '● ' : ''}${c.title} (${c.id})`;
                this.caseSelect.appendChild(option);
            }
        }

        this.saveFileBtn.classList.toggle('hidden', !fileName);
        this.lastCaseValue = '';
        this.clearEditor();
    }

    loadSelectedCase() {
        const fileName = this.actSelect.value;
        const varName = this.caseSelect.value;

        if (!fileName || !varName) {
            this.clearEditor();
            return;
        }

        const entry = (this.filesData[fileName] || []).find((c) => c.varName === varName);
        if (!entry) {
            this.clearEditor();
            return;
        }

        this.currentCase = entry;
        this.buildSections(entry.data);
        this.exportBtn.classList.remove('hidden');
        this.saveFileBtn.classList.remove('hidden');
        this.resetBtn.classList.toggle('hidden', !entry.modified);
        this.applySearchFilter();
        this.setStatus(`Editing: ${entry.title} (${entry.id})${entry.modified ? ' — unsaved changes' : ''}`);
    }

    clearEditor() {
        this.currentCase = null;
        this.sectionsContainer.innerHTML = '';
        this.exportBtn.classList.add('hidden');
        this.resetBtn.classList.add('hidden');
        if (!this.actSelect.value) {
            this.saveFileBtn.classList.add('hidden');
            this.setStatus('Load one or more actN_case.js files to begin.');
        } else {
            this.setStatus('Select a Case to begin editing.');
        }
    }

    resetCurrentCase() {
        if (!this.currentCase) return;
        if (!window.confirm(`Discard all unsaved edits to "${this.currentCase.title}" and reload it as originally imported?`)) return;
        this.currentCase.data = this.deepClone(this.currentCase.original);
        this.currentCase.modified = false;
        this.buildSections(this.currentCase.data);
        this.applySearchFilter();
        this.resetBtn.classList.add('hidden');
        this.refreshCaseOption();
        this.setStatus(`Reset: ${this.currentCase.title} (${this.currentCase.id})`);
    }

    refreshCaseOption() {
        const option = Array.from(this.caseSelect.options).find((o) => o.value === this.currentCase.varName);
        if (option) {
            option.textContent = `${this.currentCase.modified ? '● ' : ''}${this.currentCase.title} (${this.currentCase.id})`;
        }
        const fileName = this.currentCase.fileName;
        const actOption = Array.from(this.actSelect.options).find((o) => o.value === fileName);
        if (actOption) {
            const cases = this.filesData[fileName] || [];
            const label = (cases[0] && cases[0].actLabel) || fileName;
            const modifiedCount = cases.filter((c) => c.modified).length;
            actOption.textContent = `${label} (${fileName})${modifiedCount ? ` — ${modifiedCount} unsaved` : ''}`;
        }
    }

    markDirty() {
        if (!this.currentCase) return;
        this.currentCase.modified = true;
        this.resetBtn.classList.remove('hidden');
        this.refreshCaseOption();
        this.setStatus(`Editing: ${this.currentCase.title} (${this.currentCase.id}) — unsaved changes`);
    }

    // ---------- Top-level sections (one per case property) ----------
    //
    // The editor is deliberately DATA-only: keys are always shown read-only
    // (no rename), and there is no "add an arbitrary new field of any type"
    // control anywhere. The only structural action available is adding a new
    // item to an array — and that's done by cloning an existing item in that
    // same array, so the new item always has the right shape already filled
    // in. Anyone who genuinely needs to add a field the form doesn't show can
    // use the "{ } raw" toggle on that node to edit it as JSON directly.

    buildSections(caseData) {
        this.sectionsContainer.innerHTML = '';

        for (const key of Object.keys(caseData)) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-section';
            wrapper.dataset.key = key.toLowerCase();
            wrapper.appendChild(this.createNode(caseData, key, { topLevel: true }));
            this.sectionsContainer.appendChild(wrapper);
        }
    }

    // containerObj: the object or array holding this value
    // key: the property name (object) or index (array) within containerObj
    // opts: { topLevel, labelOverride, onDeleteSelf, onMoveUp, onMoveDown }
    createNode(containerObj, key, opts = {}) {
        const node = document.createElement('div');
        node.className = 'node' + (opts.topLevel ? ' node-top' : '');

        const header = document.createElement('div');
        header.className = 'node-header';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'node-toggle';
        toggle.textContent = '▼';

        const keyEl = document.createElement('span');
        keyEl.className = 'node-key-label';
        keyEl.textContent = opts.labelOverride ?? key;

        header.appendChild(toggle);
        header.appendChild(keyEl);

        const body = document.createElement('div');
        body.className = 'node-body';

        const rawToggle = document.createElement('button');
        rawToggle.type = 'button';
        rawToggle.className = 'node-raw-toggle';
        rawToggle.textContent = '{ }';
        rawToggle.title = 'Edit this value as raw JSON (lets you add fields the form doesn\'t show)';
        let rawMode = false;
        rawToggle.addEventListener('click', () => {
            rawMode = !rawMode;
            rawToggle.classList.toggle('active', rawMode);
            if (rawMode) {
                this.renderRawBody(body, containerObj, key);
            } else {
                this.renderBody(body, containerObj, key);
            }
        });
        header.appendChild(rawToggle);

        if (opts.onMoveUp) {
            const upBtn = document.createElement('button');
            upBtn.type = 'button';
            upBtn.className = 'node-move';
            upBtn.textContent = '↑';
            upBtn.title = 'Move up';
            upBtn.addEventListener('click', () => opts.onMoveUp());
            header.appendChild(upBtn);
        }
        if (opts.onMoveDown) {
            const downBtn = document.createElement('button');
            downBtn.type = 'button';
            downBtn.className = 'node-move';
            downBtn.textContent = '↓';
            downBtn.title = 'Move down';
            downBtn.addEventListener('click', () => opts.onMoveDown());
            header.appendChild(downBtn);
        }
        if (opts.onDeleteSelf) {
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.className = 'node-delete';
            deleteBtn.textContent = '✕';
            deleteBtn.title = 'Remove this item';
            deleteBtn.addEventListener('click', () => opts.onDeleteSelf());
            header.appendChild(deleteBtn);
        }

        node.appendChild(header);
        node.appendChild(body);

        this.renderBody(body, containerObj, key);

        toggle.addEventListener('click', () => {
            const collapsed = body.classList.toggle('hidden');
            toggle.textContent = collapsed ? '▶' : '▼';
        });

        return node;
    }

    // Fills `body` with editable content matching the current type of containerObj[key].
    renderBody(body, containerObj, key) {
        body.innerHTML = '';
        const value = containerObj[key];
        const type = this.typeOf(value);

        if (type === 'object') {
            this.renderObjectBody(body, value);
        } else if (type === 'array') {
            this.renderArrayBody(body, value, key);
        } else if (type === 'string') {
            const textarea = document.createElement('textarea');
            textarea.className = 'leaf-textarea';
            textarea.value = value;
            textarea.rows = this.computeRows(value);
            textarea.spellcheck = false;
            textarea.addEventListener('input', () => {
                containerObj[key] = textarea.value;
                this.markDirty();
            });
            body.appendChild(textarea);
        } else if (type === 'number') {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = 'leaf-number';
            input.value = value;
            input.addEventListener('input', () => {
                const n = input.valueAsNumber;
                containerObj[key] = Number.isNaN(n) ? 0 : n;
                this.markDirty();
            });
            body.appendChild(input);
        } else if (type === 'boolean') {
            const label = document.createElement('label');
            label.className = 'leaf-boolean-label';
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = value;
            input.addEventListener('change', () => {
                containerObj[key] = input.checked;
                this.markDirty();
            });
            label.appendChild(input);
            label.appendChild(document.createTextNode(' true'));
            body.appendChild(label);
        } else {
            const span = document.createElement('span');
            span.className = 'leaf-null';
            span.textContent = 'not set (null) — use "{ }" above if this needs a value';
            body.appendChild(span);
        }
    }

    // The raw-JSON escape hatch for a single node: replaces the form with one
    // textarea holding JSON.stringify(value). Valid edits write straight back
    // to containerObj[key], same as every other field.
    renderRawBody(body, containerObj, key) {
        body.innerHTML = '';
        const textarea = document.createElement('textarea');
        textarea.className = 'leaf-textarea raw-json';
        const jsonText = JSON.stringify(containerObj[key] === undefined ? null : containerObj[key], null, 2);
        textarea.value = jsonText;
        textarea.rows = this.computeRows(jsonText);
        textarea.spellcheck = false;

        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-msg hidden';

        textarea.addEventListener('input', () => {
            try {
                containerObj[key] = JSON.parse(textarea.value);
                textarea.classList.remove('invalid');
                errorMsg.classList.add('hidden');
                this.markDirty();
            } catch (err) {
                textarea.classList.add('invalid');
                errorMsg.textContent = err.message;
                errorMsg.classList.remove('hidden');
            }
        });

        body.appendChild(textarea);
        body.appendChild(errorMsg);
    }

    // Object nodes: every existing key is shown, read-only, in its original
    // order. No control here adds, removes, or renames a field.
    renderObjectBody(body, obj) {
        for (const k of Object.keys(obj)) {
            body.appendChild(this.createNode(obj, k, {}));
        }
        if (Object.keys(obj).length === 0) {
            const span = document.createElement('span');
            span.className = 'leaf-null';
            span.textContent = '(empty object)';
            body.appendChild(span);
        }
    }

    // Array nodes: each item is rendered the same recursive way, with
    // move/delete controls. The only way to grow the array is "+ Add", which
    // clones the last item so the new one already has the right shape.
    renderArrayBody(body, arr, arrKey) {
        arr.forEach((_, idx) => {
            const childNode = this.createNode(arr, idx, {
                labelOverride: `[${idx}]`,
                onDeleteSelf: () => {
                    if (!confirm(`Remove item [${idx}]?`)) return;
                    arr.splice(idx, 1);
                    this.markDirty();
                    this.renderArrayBody(body, arr, arrKey);
                },
                onMoveUp: idx > 0 ? () => {
                    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                    this.markDirty();
                    this.renderArrayBody(body, arr, arrKey);
                } : null,
                onMoveDown: idx < arr.length - 1 ? () => {
                    [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                    this.markDirty();
                    this.renderArrayBody(body, arr, arrKey);
                } : null,
            });
            body.appendChild(childNode);
        });

        const addRow = document.createElement('div');
        addRow.className = 'add-item-row';
        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'add-item-btn';
        const label = this.singularLabel(arrKey);

        if (arr.length > 0) {
            addBtn.textContent = `+ Add ${label} (copy of last)`;
            addBtn.addEventListener('click', () => {
                arr.push(this.deepClone(arr[arr.length - 1]));
                this.markDirty();
                this.renderArrayBody(body, arr, arrKey);
            });
        } else {
            const template = this.emptyArrayTemplate(arrKey);
            addBtn.textContent = `+ Add ${label}`;
            addBtn.addEventListener('click', () => {
                arr.push(this.deepClone(template));
                this.markDirty();
                this.renderArrayBody(body, arr, arrKey);
            });
        }
        addRow.appendChild(addBtn);
        body.appendChild(addRow);
    }

    // A friendly singular noun for the "+ Add ___" button, derived from the
    // array's own key name (evidencePool -> Evidence Item, suspects -> Suspect...).
    singularLabel(arrKey) {
        const known = {
            evidencePool: 'Evidence Item',
            suspects: 'Suspect',
            npcs: 'NPC',
            prophecies: 'Prophecy',
            bibleRefs: 'Reference',
            propheticRefs: 'Reference',
        };
        if (known[arrKey]) return known[arrKey];
        if (!arrKey || typeof arrKey === 'number') return 'Item';
        return String(arrKey).replace(/s$/i, '') || 'Item';
    }

    // When an array is empty there's no existing item to clone, so a small
    // set of known fallback shapes are used for the arrays this editor is
    // built for. Anything else falls back to a blank object, editable via the
    // "{ }" raw toggle.
    emptyArrayTemplate(arrKey) {
        const templates = {
            evidencePool: {
                id: 'new_evidence_id', name: 'New Evidence', type: 'physical',
                relatedProphecy: '', icon: '🔍', location: '', snippet: '',
                description: '', bibleRef: '', investigatorNote: '',
                fake: false, category: 'event', timelineOrder: 1,
                clues: { compare: '', link: '', timeline: '', contradict: '' },
            },
            suspects: { id: 'new_suspect_id', name: 'New Suspect', role: '', avatar: '👤', bibleRef: '' },
            npcs: { id: 'new_npc_id', name: 'New NPC', role: '' },
            prophecies: { id: '', ref: '', text: '' },
            bibleRefs: { ref: '', link: '' },
            propheticRefs: { ref: '', link: '' },
        };
        return templates[arrKey] || {};
    }

    // ---------- Small helpers ----------

    typeOf(value) {
        if (value === null || value === undefined) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    }

    deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    computeRows(text) {
        const lineCount = String(text).split('\n').length;
        return Math.min(20, Math.max(2, lineCount));
    }

    // ---------- Search ----------

    applySearchFilter() {
        const term = this.searchInput.value.trim().toLowerCase();
        const wrappers = this.sectionsContainer.querySelectorAll('.form-section');

        wrappers.forEach((wrapper) => {
            if (!term) {
                wrapper.classList.remove('hidden');
                return;
            }
            let text = wrapper.dataset.key || '';
            wrapper.querySelectorAll('input, textarea, .node-key-label').forEach((el) => {
                text += ' ' + (el.value !== undefined ? el.value : el.textContent);
            });
            wrapper.classList.toggle('hidden', !text.toLowerCase().includes(term));
        });
    }

    // ---------- Export: single case as JSON ----------

    exportCurrentCase() {
        if (!this.currentCase) return;
        const dataStr = JSON.stringify(this.currentCase.data, null, 2);
        this.downloadText(dataStr, `${this.currentCase.id || this.currentCase.varName}.json`, 'application/json');
        this.setStatus(`Exported ${this.currentCase.id || this.currentCase.varName}.json`);
    }

    // ---------- Export: whole act file as .js, edits spliced back in ----------
    //
    // Rebuilds a complete, drop-in-ready actN_case.js: starts from the exact
    // original source text (imports, comments, helper calls, formatting for
    // every case all preserved) and replaces only the object-literal body of
    // each case with its current in-memory data. Cases you never touched come
    // back out byte-for-byte identical; cases you edited come back out as
    // clean re-serialized JSON in place of their old object literal.
    saveActFile() {
        const fileName = this.actSelect.value;
        if (!fileName || !this.fileSources[fileName]) return;

        const cases = this.filesData[fileName] || [];
        let text = this.fileSources[fileName];

        const ordered = [...cases].sort((a, b) => b.openBrace - a.openBrace);
        for (const c of ordered) {
            const newObjectText = JSON.stringify(c.data, null, 2);
            text = text.slice(0, c.openBrace) + newObjectText + text.slice(c.closeBrace + 1);
        }

        this.downloadText(text, fileName, 'text/javascript');

        for (const c of cases) c.modified = false;
        if (this.currentCase && this.currentCase.fileName === fileName) {
            this.resetBtn.classList.add('hidden');
            this.setStatus(`Saved ${fileName} — editing: ${this.currentCase.title} (${this.currentCase.id})`);
        } else {
            this.setStatus(`Saved ${fileName}`);
        }
        this.populateActSelect();
        this.actSelect.value = fileName;
        this.populateCaseSelect();
        if (this.currentCase) {
            this.caseSelect.value = this.currentCase.varName;
            this.loadSelectedCase();
        }
    }

    downloadText(text, fileName, mimeType) {
        const blob = new Blob([text], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    setStatus(text) {
        this.statusEl.textContent = text;
    }
}

window.addEventListener('DOMContentLoaded', () => new CaseEditor());

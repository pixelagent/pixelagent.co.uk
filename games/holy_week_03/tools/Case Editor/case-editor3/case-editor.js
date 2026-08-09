class CaseEditor {
    constructor() {
        this.fileInput = document.getElementById('file-input');
        this.actSelect = document.getElementById('act-select');
        this.caseSelect = document.getElementById('case-select');
        this.searchInput = document.getElementById('search-input');
        this.exportBtn = document.getElementById('export-btn');
        this.statusEl = document.getElementById('status');
        this.tocEl = document.getElementById('toc');
        this.sectionsContainer = document.getElementById('sections-container');

        // fileName -> [{ fileName, varName, id, title, actLabel, data }]
        this.filesData = {};
        // currently loaded case entry, or null
        this.currentCase = null;
        // key -> { wrapper, toggle, body, tocLink }
        this.sectionRefs = {};
        // key of the single section currently expanded (accordion), or null
        this.openSectionKey = null;

        this.bindEvents();
    }

    bindEvents() {
        this.fileInput.addEventListener('change', (e) => this.handleFiles(e.target.files));
        this.actSelect.addEventListener('change', () => this.populateCaseSelect());
        this.caseSelect.addEventListener('change', () => this.loadSelectedCase());
        this.searchInput.addEventListener('input', () => this.applySearchFilter());
        this.exportBtn.addEventListener('click', () => this.exportCurrentCase());
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
                this.filesData[file.name] = cases;
            } catch (err) {
                console.error(`Failed to parse ${file.name}`, err);
                this.setStatus(`Error parsing ${file.name}: ${err.message}`);
            }
        }

        this.populateActSelect();
        const totalCases = Object.values(this.filesData).reduce((sum, arr) => sum + arr.length, 0);
        this.setStatus(`Loaded ${Object.keys(this.filesData).length} file(s), ${totalCases} case(s) found. Choose an Act and Case to begin.`);
    }

    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Could not read file'));
            reader.readAsText(file);
        });
    }

    // Finds every `export const NAME = { ... };` in the source, regardless of
    // how many there are or what the properties inside them are called.
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
            });
        }

        return cases;
    }

    // Evaluates an object literal as JS. Case files sometimes call small helper
    // functions imported from elsewhere (e.g. `formatIntro(...)`) that aren't
    // available in this standalone context. Rather than losing the whole case,
    // any "X is not defined" error is caught and X is stubbed out as a
    // pass-through function (returning its first argument unchanged), then
    // evaluation is retried. This repeats for as many undefined names as show up.
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

    // Scans forward from an opening brace to find its matching closing brace,
    // correctly skipping over strings, template literals, and comments so that
    // braces inside them don't throw off the depth count.
    findMatchingBrace(text, openIndex) {
        let depth = 0;
        let inString = null;
        let inLineComment = false;
        let inBlockComment = false;

        for (let i = openIndex; i < text.length; i++) {
            const c = text[i];

            if (inLineComment) {
                if (c === '\n') inLineComment = false;
                continue;
            }
            if (inBlockComment) {
                if (c === '*' && text[i + 1] === '/') {
                    inBlockComment = false;
                    i++;
                }
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
            const option = document.createElement('option');
            option.value = fileName;
            option.textContent = `${label} (${fileName})`;
            this.actSelect.appendChild(option);
        }

        if (previous && this.filesData[previous]) {
            this.actSelect.value = previous;
        }

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
                option.textContent = `${c.title} (${c.id})`;
                this.caseSelect.appendChild(option);
            }
        }

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
        this.applySearchFilter();
        this.setStatus(`Editing: ${entry.title} (${entry.id})`);
    }

    clearEditor() {
        this.currentCase = null;
        this.sectionRefs = {};
        this.openSectionKey = null;
        this.sectionsContainer.innerHTML = '';
        this.tocEl.innerHTML = '';
        this.tocEl.classList.add('hidden');
        this.exportBtn.classList.add('hidden');
        if (!this.actSelect.value) {
            this.setStatus('Select an Act and Case to begin editing.');
        }
    }

    markDirty() {
        if (this.currentCase) {
            this.setStatus(`Editing: ${this.currentCase.title} (${this.currentCase.id}) — unsaved changes`);
        }
    }

    // ---------- Top-level sections (one per case property) ----------

    buildSections(caseData) {
        this.sectionsContainer.innerHTML = '';
        this.tocEl.innerHTML = '';
        this.sectionRefs = {};
        this.openSectionKey = null;

        const keys = Object.keys(caseData);

        const tocHeading = document.createElement('div');
        tocHeading.className = 'toc-heading';
        tocHeading.textContent = 'Jump to section';
        this.tocEl.appendChild(tocHeading);

        for (const key of keys) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-section';
            wrapper.id = `section-${key}`;
            wrapper.dataset.key = key.toLowerCase();

            const node = this.createNode(caseData, key, {
                topLevel: true,
                onDeleteSelf: () => {
                    if (!confirm(`Delete the top-level field "${key}" from this case?`)) return;
                    delete caseData[key];
                    wrapper.remove();
                    delete this.sectionRefs[key];
                    const tocLink = this.tocEl.querySelector(`a[data-key="${key}"]`);
                    if (tocLink) tocLink.remove();
                    this.markDirty();
                },
                onToggleClick: () => {
                    if (this.openSectionKey === key) {
                        this.setOpenSection(null);
                    } else {
                        this.setOpenSection(key);
                    }
                },
            });

            wrapper.appendChild(node);
            this.sectionsContainer.appendChild(wrapper);

            const toggle = node.querySelector(':scope > .node-header > .node-toggle');
            const body = node.querySelector(':scope > .node-body');
            this.sectionRefs[key] = { wrapper, toggle, body };

            const tocLink = document.createElement('a');
            tocLink.href = `#section-${key}`;
            tocLink.textContent = key;
            tocLink.dataset.key = key;
            tocLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.setOpenSection(key, { scroll: true });
            });
            this.tocEl.appendChild(tocLink);
            this.sectionRefs[key].tocLink = tocLink;
        }

        const addRow = this.createAddFieldRow(caseData, () => this.buildSections(caseData));
        addRow.classList.add('top-level-add-row');
        this.sectionsContainer.appendChild(addRow);

        this.tocEl.classList.toggle('hidden', keys.length === 0);

        // Accordion: start with only the first section expanded.
        if (keys.length) {
            this.setOpenSection(keys[0]);
        }
    }

    // Expands exactly one top-level section (accordion behaviour) and collapses
    // the rest. Pass null to collapse everything. Pass { scroll: true } to bring
    // the opened section into view (used by table-of-contents links).
    setOpenSection(key, { scroll = false } = {}) {
        this.openSectionKey = key;

        for (const [k, ref] of Object.entries(this.sectionRefs)) {
            const isOpen = k === key;
            ref.body.classList.toggle('hidden', !isOpen);
            ref.toggle.textContent = isOpen ? '▼' : '▶';
            ref.wrapper.classList.toggle('section-open', isOpen);
            if (ref.tocLink) ref.tocLink.classList.toggle('active', isOpen);
        }

        if (scroll && key && this.sectionRefs[key]) {
            this.sectionRefs[key].wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // ---------- Generic node renderer (object / array / leaf, any depth) ----------

    // containerObj: the object or array holding this value
    // key: the property name (object) or index (array) within containerObj
    // opts: { topLevel, keyEditable, labelOverride, onDeleteSelf, onMoveUp, onMoveDown }
    createNode(containerObj, key, opts = {}) {
        const node = document.createElement('div');
        node.className = 'node' + (opts.topLevel ? ' node-top' : '');

        const header = document.createElement('div');
        header.className = 'node-header';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'node-toggle';
        toggle.textContent = '▼';

        let keyEl;
        if (opts.keyEditable) {
            keyEl = document.createElement('input');
            keyEl.type = 'text';
            keyEl.className = 'node-key-input';
            keyEl.value = key;
            keyEl.addEventListener('change', () => {
                const newKey = keyEl.value.trim();
                if (!newKey || newKey === key) { keyEl.value = key; return; }
                if (Object.prototype.hasOwnProperty.call(containerObj, newKey)) {
                    alert(`A field called "${newKey}" already exists here.`);
                    keyEl.value = key;
                    return;
                }
                this.renameObjectKey(containerObj, key, newKey);
                this.markDirty();
                if (opts.onRenamed) opts.onRenamed(newKey);
            });
        } else {
            keyEl = document.createElement('span');
            keyEl.className = 'node-key-label';
            keyEl.textContent = opts.labelOverride ?? key;
        }

        const typeSelect = document.createElement('select');
        typeSelect.className = 'node-type-select';
        ['string', 'number', 'boolean', 'null', 'object', 'array'].forEach((t) => {
            const o = document.createElement('option');
            o.value = t;
            o.textContent = t;
            typeSelect.appendChild(o);
        });
        typeSelect.value = this.typeOf(containerObj[key]);
        typeSelect.addEventListener('change', () => {
            containerObj[key] = this.defaultForType(typeSelect.value);
            this.markDirty();
            this.renderBody(body, containerObj, key);
            body.classList.remove('hidden');
            toggle.textContent = '▼';
        });

        header.appendChild(toggle);
        header.appendChild(keyEl);
        header.appendChild(typeSelect);

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
            deleteBtn.title = 'Delete';
            deleteBtn.addEventListener('click', () => opts.onDeleteSelf());
            header.appendChild(deleteBtn);
        }

        const body = document.createElement('div');
        body.className = 'node-body';

        node.appendChild(header);
        node.appendChild(body);

        this.renderBody(body, containerObj, key);

        toggle.addEventListener('click', () => {
            if (opts.onToggleClick) {
                opts.onToggleClick();
                return;
            }
            const collapsed = body.classList.toggle('hidden');
            toggle.textContent = collapsed ? '▶' : '▼';
        });

        if (opts.onToggleClick) {
            header.style.cursor = 'pointer';
            const interactiveTags = new Set(['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA']);
            header.addEventListener('click', (e) => {
                if (interactiveTags.has(e.target.tagName)) return;
                opts.onToggleClick();
            });
        }

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
            this.renderArrayBody(body, value);
        } else if (type === 'string') {
            const textarea = document.createElement('textarea');
            textarea.className = 'leaf-textarea';
            textarea.value = value;
            textarea.rows = this.computeRows(value);
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
            span.textContent = 'null — use the type dropdown above to give this a value';
            body.appendChild(span);
        }
    }

    renderObjectBody(body, obj) {
        const keys = Object.keys(obj);
        for (const k of keys) {
            const childNode = this.createNode(obj, k, {
                keyEditable: true,
                onDeleteSelf: () => {
                    if (!confirm(`Delete field "${k}"?`)) return;
                    delete obj[k];
                    this.markDirty();
                    this.renderObjectBody(body, obj);
                    this.appendAddFieldRow(body, obj);
                },
            });
            body.appendChild(childNode);
        }
        this.appendAddFieldRow(body, obj);
    }

    appendAddFieldRow(body, obj) {
        const addRow = this.createAddFieldRow(obj, () => {
            this.renderObjectBody(body, obj);
        });
        body.appendChild(addRow);
    }

    createAddFieldRow(obj, onAdded) {
        const row = document.createElement('div');
        row.className = 'add-field-row';

        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.placeholder = 'new field name';
        keyInput.className = 'add-field-key';

        const typeSelect = document.createElement('select');
        typeSelect.className = 'add-field-type';
        ['string', 'number', 'boolean', 'null', 'object', 'array'].forEach((t) => {
            const o = document.createElement('option');
            o.value = t;
            o.textContent = t;
            typeSelect.appendChild(o);
        });

        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'add-field-btn';
        addBtn.textContent = '+ Add Field';

        const submit = () => {
            const newKey = keyInput.value.trim();
            if (!newKey) return;
            if (Object.prototype.hasOwnProperty.call(obj, newKey)) {
                alert(`A field called "${newKey}" already exists here.`);
                return;
            }
            obj[newKey] = this.defaultForType(typeSelect.value);
            this.markDirty();
            onAdded();
        };

        addBtn.addEventListener('click', submit);
        keyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
        });

        row.appendChild(keyInput);
        row.appendChild(typeSelect);
        row.appendChild(addBtn);
        return row;
    }

    renderArrayBody(body, arr) {
        arr.forEach((_, idx) => {
            const childNode = this.createNode(arr, idx, {
                labelOverride: `[${idx}]`,
                onDeleteSelf: () => {
                    if (!confirm(`Delete item [${idx}]?`)) return;
                    arr.splice(idx, 1);
                    this.markDirty();
                    this.renderArrayBody(body, arr);
                    this.appendAddItemRow(body, arr);
                },
                onMoveUp: idx > 0 ? () => {
                    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                    this.markDirty();
                    this.renderArrayBody(body, arr);
                    this.appendAddItemRow(body, arr);
                } : null,
                onMoveDown: idx < arr.length - 1 ? () => {
                    [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
                    this.markDirty();
                    this.renderArrayBody(body, arr);
                    this.appendAddItemRow(body, arr);
                } : null,
            });
            body.appendChild(childNode);
        });
        this.appendAddItemRow(body, arr);
    }

    appendAddItemRow(body, arr) {
        const addRow = this.createAddItemRow(arr, () => {
            this.renderArrayBody(body, arr);
        });
        body.appendChild(addRow);
    }

    createAddItemRow(arr, onAdded) {
        const row = document.createElement('div');
        row.className = 'add-item-row';

        const typeSelect = document.createElement('select');
        typeSelect.className = 'add-item-type';

        if (arr.length) {
            const dupOpt = document.createElement('option');
            dupOpt.value = 'duplicate';
            dupOpt.textContent = 'copy of last item';
            typeSelect.appendChild(dupOpt);
        }
        ['object', 'string', 'number', 'boolean', 'array', 'null'].forEach((t) => {
            const o = document.createElement('option');
            o.value = t;
            o.textContent = t;
            typeSelect.appendChild(o);
        });
        typeSelect.value = arr.length ? 'duplicate' : 'object';

        const addBtn = document.createElement('button');
        addBtn.type = 'button';
        addBtn.className = 'add-item-btn';
        addBtn.textContent = '+ Add Item';
        addBtn.addEventListener('click', () => {
            let newItem;
            if (typeSelect.value === 'duplicate') {
                newItem = this.deepClone(arr[arr.length - 1]);
            } else {
                newItem = this.defaultForType(typeSelect.value);
            }
            arr.push(newItem);
            this.markDirty();
            onAdded();
        });

        row.appendChild(typeSelect);
        row.appendChild(addBtn);
        return row;
    }

    // ---------- Small helpers ----------

    typeOf(value) {
        if (value === null || value === undefined) return 'null';
        if (Array.isArray(value)) return 'array';
        return typeof value;
    }

    defaultForType(type) {
        switch (type) {
            case 'string': return '';
            case 'number': return 0;
            case 'boolean': return false;
            case 'object': return {};
            case 'array': return [];
            default: return null;
        }
    }

    deepClone(value) {
        try {
            return JSON.parse(JSON.stringify(value));
        } catch (e) {
            return value;
        }
    }

    // Renames a key in-place while preserving the object's original key order.
    renameObjectKey(obj, oldKey, newKey) {
        const rebuilt = {};
        for (const k of Object.keys(obj)) {
            if (k === oldKey) {
                rebuilt[newKey] = obj[oldKey];
            } else {
                rebuilt[k] = obj[k];
            }
        }
        for (const k of Object.keys(obj)) delete obj[k];
        Object.assign(obj, rebuilt);
    }

    computeRows(text) {
        const lineCount = String(text).split('\n').length;
        return Math.min(20, Math.max(2, lineCount));
    }

    // ---------- Search ----------

    applySearchFilter() {
        const term = this.searchInput.value.trim().toLowerCase();

        if (!term) {
            for (const ref of Object.values(this.sectionRefs)) {
                ref.wrapper.classList.remove('hidden');
                if (ref.tocLink) ref.tocLink.classList.remove('hidden');
            }
            const fallback = this.openSectionKey || Object.keys(this.sectionRefs)[0] || null;
            this.setOpenSection(fallback);
            return;
        }

        for (const [key, ref] of Object.entries(this.sectionRefs)) {
            let text = key;
            ref.wrapper.querySelectorAll('input, textarea, .node-key-label').forEach((el) => {
                text += ' ' + (el.value !== undefined ? el.value : el.textContent);
            });
            const matches = text.toLowerCase().includes(term);

            ref.wrapper.classList.toggle('hidden', !matches);
            if (ref.tocLink) ref.tocLink.classList.toggle('hidden', !matches);

            if (matches) {
                ref.body.classList.remove('hidden');
                ref.toggle.textContent = '▼';
                ref.wrapper.classList.add('section-open');
            }
        }
    }

    // ---------- Export ----------

    exportCurrentCase() {
        if (!this.currentCase) return;

        const dataStr = JSON.stringify(this.currentCase.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const fileName = `${this.currentCase.id || this.currentCase.varName}.json`;

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.setStatus(`Exported ${fileName}`);
    }

    setStatus(text) {
        this.statusEl.textContent = text;
    }
}

window.addEventListener('DOMContentLoaded', () => new CaseEditor());

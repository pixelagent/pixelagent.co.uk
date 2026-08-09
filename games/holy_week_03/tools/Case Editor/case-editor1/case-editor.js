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
        // key -> { wrapper, textarea, errorMsg, errorBadge }
        this.sectionEls = {};

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

    // Asks for confirmation if the currently-open case has unsaved edits
    // before letting the user navigate away from it. Returns true if it's OK
    // to proceed (no edits, or user confirmed discarding them).
    confirmDiscardIfNeeded() {
        if (this.currentCase && this.currentCase.modified) {
            return window.confirm(
                `"${this.currentCase.title}" has unsaved changes that will be lost. Continue?`
            );
        }
        return true;
    }

    hasAnyModifiedCase() {
        return Object.values(this.filesData)
            .some((cases) => cases.some((c) => c.modified));
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
        // Allow re-selecting the same file(s) later without the browser
        // ignoring the change event.
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
                original: this.deepClone(data),
                openBrace: openBraceIndex,
                closeBrace: closeIndex,
                modified: false,
            });
        }

        return cases;
    }

    deepClone(value) {
        return JSON.parse(JSON.stringify(value));
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
        this.sectionEls = {};
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
        if (!window.confirm(`Discard all unsaved edits to "${this.currentCase.title}" and reload it as originally imported?`)) {
            return;
        }
        this.currentCase.data = this.deepClone(this.currentCase.original);
        this.currentCase.modified = false;
        this.buildSections(this.currentCase.data);
        this.applySearchFilter();
        this.resetBtn.classList.add('hidden');
        this.refreshCaseOption();
        this.setStatus(`Reset: ${this.currentCase.title} (${this.currentCase.id})`);
    }

    // Keeps the case-select option text (the "●" unsaved marker) and the act
    // dropdown's "N unsaved" count in sync with this.currentCase.modified.
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

    // ---------- Dynamic sections (one per property, no hard-coding) ----------

    buildSections(caseData) {
        this.sectionsContainer.innerHTML = '';
        this.sectionEls = {};

        for (const [key, value] of Object.entries(caseData)) {
            const section = this.createSection(key, value);
            this.sectionsContainer.appendChild(section.wrapper);
            this.sectionEls[key] = section;
        }
    }

    createSection(key, value) {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-section';
        wrapper.dataset.key = key.toLowerCase();

        const header = document.createElement('div');
        header.className = 'section-header';

        const toggle = document.createElement('span');
        toggle.className = 'section-toggle';
        toggle.textContent = '▼';

        const title = document.createElement('h3');
        title.textContent = key;

        const errorBadge = document.createElement('span');
        errorBadge.className = 'error-badge hidden';
        errorBadge.textContent = 'invalid JSON';

        header.appendChild(toggle);
        header.appendChild(title);
        header.appendChild(errorBadge);

        const body = document.createElement('div');
        body.className = 'section-body';

        const jsonText = JSON.stringify(value === undefined ? null : value, null, 2);

        const textarea = document.createElement('textarea');
        textarea.dataset.section = key;
        textarea.value = jsonText;
        textarea.rows = this.computeRows(jsonText);
        textarea.spellcheck = false;

        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-msg hidden';

        body.appendChild(textarea);
        body.appendChild(errorMsg);

        header.addEventListener('click', () => {
            const collapsed = body.classList.toggle('hidden');
            toggle.textContent = collapsed ? '▶' : '▼';
        });

        textarea.addEventListener('input', () => {
            const valid = this.validateSection(textarea, errorMsg, errorBadge);
            if (this.currentCase) {
                if (valid) {
                    // Write the change straight back into the in-memory case
                    // object so it survives switching cases/acts and is
                    // available to "Save Act File".
                    this.currentCase.data[key] = JSON.parse(textarea.value);
                    this.currentCase.modified = true;
                    this.resetBtn.classList.remove('hidden');
                    this.refreshCaseOption();
                }
                this.setStatus(
                    `Editing: ${this.currentCase.title} (${this.currentCase.id}) — ` +
                    (valid ? 'unsaved changes' : `invalid JSON in "${key}", not yet saved to memory`)
                );
            }
        });

        wrapper.appendChild(header);
        wrapper.appendChild(body);

        return { wrapper, textarea, errorMsg, errorBadge, body, toggle };
    }

    computeRows(jsonText) {
        const lineCount = jsonText.split('\n').length;
        return Math.min(40, Math.max(3, lineCount + 1));
    }

    validateSection(textarea, errorMsg, errorBadge) {
        try {
            JSON.parse(textarea.value);
            textarea.classList.remove('invalid');
            errorMsg.classList.add('hidden');
            errorBadge.classList.add('hidden');
            return true;
        } catch (err) {
            textarea.classList.add('invalid');
            errorMsg.textContent = err.message;
            errorMsg.classList.remove('hidden');
            errorBadge.classList.remove('hidden');
            return false;
        }
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
            const key = wrapper.dataset.key;
            const textarea = wrapper.querySelector('textarea');
            const matches = key.includes(term) || (textarea && textarea.value.toLowerCase().includes(term));
            wrapper.classList.toggle('hidden', !matches);
        });
    }

    // ---------- Export: single case as JSON ----------

    exportCurrentCase() {
        if (!this.currentCase) return;

        const result = {};
        let hasError = false;

        for (const [key, section] of Object.entries(this.sectionEls)) {
            const valid = this.validateSection(section.textarea, section.errorMsg, section.errorBadge);
            if (!valid) {
                hasError = true;
                continue;
            }
            result[key] = JSON.parse(section.textarea.value);
        }

        if (hasError) {
            this.setStatus('Cannot export — fix the invalid JSON section(s) marked above.');
            return;
        }

        this.downloadText(
            JSON.stringify(result, null, 2),
            `${this.currentCase.id || this.currentCase.varName}.json`,
            'application/json'
        );
        this.setStatus(`Exported ${this.currentCase.id || this.currentCase.varName}.json`);
    }

    // ---------- Export: whole act file as .js, edits spliced back in ----------

    // Rebuilds a complete, drop-in-ready actN_case.js: starts from the exact
    // original source text (imports, comments, helper calls, formatting for
    // every case all preserved) and replaces only the object-literal body of
    // each case with its current in-memory data. Cases you never touched come
    // back out byte-for-byte identical; cases you edited come back out as
    // clean re-serialized JSON in place of their old object literal.
    saveActFile() {
        const fileName = this.actSelect.value;
        if (!fileName || !this.fileSources[fileName]) return;

        // Make sure the currently-open case's textarea edits are flushed into
        // memory (input handler already does this on every keystroke, but a
        // pending invalid-JSON edit should block the save with a clear error
        // instead of silently reverting to the last valid version).
        if (this.currentCase && this.currentCase.fileName === fileName) {
            for (const section of Object.values(this.sectionEls)) {
                if (!this.validateSection(section.textarea, section.errorMsg, section.errorBadge)) {
                    this.setStatus(`Cannot save ${fileName} — fix the invalid JSON marked above first.`);
                    return;
                }
            }
        }

        const cases = this.filesData[fileName] || [];
        let text = this.fileSources[fileName];

        // Splice from the end of the file backward so earlier offsets stay valid.
        const ordered = [...cases].sort((a, b) => b.openBrace - a.openBrace);
        for (const c of ordered) {
            const newObjectText = JSON.stringify(c.data, null, 2);
            text = text.slice(0, c.openBrace) + newObjectText + text.slice(c.closeBrace + 1);
        }

        this.downloadText(text, fileName, 'text/javascript');

        for (const c of cases) {
            c.modified = false;
        }
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

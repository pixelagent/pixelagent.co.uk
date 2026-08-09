import { renderIcon } from "../utils.js";

export class CodexUI {
    constructor(caseManager, evidenceSystem, accessibility, audio) {
        this.cm = caseManager;
        this.es = evidenceSystem;
        this.a11y = accessibility;
        this.audio = audio;

        this.selectedCodexEvidenceId = null;
        this.selectedCodexProphecyId = null;
        this.codexMatchFeedback = null;
    }

    render() {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const propheciesWithStatus = this.es.getPropheciesWithStatus();
        const unseenProps = propheciesWithStatus.filter(p => p.status === 'unseen');
        const rumorProps = propheciesWithStatus.filter(p => p.status === 'rumor');
        const foundProps = propheciesWithStatus.filter(p => p.status === 'found_scripture');
        const completeProps = propheciesWithStatus.filter(p => p.status === 'complete');
        const collectedEvidence = this.es.getCollected();
        
        return `
            <h3 class="section-title">Biblical Patterns</h3>
            <div class="codex-intro">
                Link scripture fragments to their fulfillments in the Lab to complete your research.
            </div>

            ${completeProps.length > 0 ? `
            <h3 class="section-title">Completed Research (${completeProps.length})</h3>
            <div class="codex-grid">
                ${completeProps.map(p => `
                    <div class="prophecy-card complete" onclick="window.ui.showProphecyDetail('${p.id}')">
                        <div class="prophecy-card-icon">${renderIcon(p.icon)}</div>
                        <div class="prophecy-card-info">
                            <div class="prophecy-card-reference">${p.reference}</div>
                            <div class="prophecy-card-desc">${(p.fulfilledBy || p.desc || '').substring(0, 60)}...</div>
                        </div>
                        <div class="prophecy-card-badge"><img src='../assets/gfx/check-circle-duotone.svg' class='icon-svg' loading='lazy'></div>
                    </div>`).join('')}
            </div>` : ''}

            ${foundProps.length > 0 ? `
            <h3 class="section-title">Scripture Found (${foundProps.length})</h3>
            <div class="codex-grid">
                ${foundProps.map(p => `
                    <div class="prophecy-card found" onclick="window.ui.showProphecyDetail('${p.id}')">
                        <div class="prophecy-card-icon">${renderIcon(p.icon)}</div>
                        <div class="prophecy-card-info">
                            <div class="prophecy-card-reference">${p.reference}</div>
                            <div class="prophecy-card-desc">${(p.text || '').substring(0, 80)}...</div>
                        </div>
                        <div class="prophecy-card-badge"><img src='../assets/gfx/scroll-duotone.svg' class='icon-svg' loading='lazy'></div>
                    </div>`).join('')}
            </div>` : ''}

            ${rumorProps.length > 0 ? `
            <h3 class="section-title">Rumors Heard (${rumorProps.length})</h3>
            <div class="codex-grid">
                ${rumorProps.map(p => `
                    <div class="prophecy-card rumor" onclick="window.ui.showProphecyDetail('${p.id}')">
                        <div class="prophecy-card-icon"><i class="fa-solid fa-question"></i></div>
                        <div class="prophecy-card-info">
                            <div class="prophecy-card-reference">???</div>
                            <div class="prophecy-card-desc">A rumor heard in conversation...</div>
                        </div>
                        <div class="prophecy-card-badge"><img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'></div>
                    </div>`).join('')}
            </div>` : ''}

            ${unseenProps.length > 0 ? `
            <h3 class="section-title">Undiscovered (${unseenProps.length})</h3>
            <div class="codex-grid">
                ${unseenProps.map(p => `
                    <div class="prophecy-card unseen">
                        <div class="prophecy-card-icon"><i class="fa-solid fa-lock"></i></div>
                        <div class="prophecy-card-info">
                            <div class="prophecy-card-reference">???</div>
                            <div class="prophecy-card-desc">Not yet discovered</div>
                        </div>
                    </div>`).join('')}
            </div>` : ''}

            <div id="codex-feedback" class="codex-feedback" ${!this.codexMatchFeedback ? 'hidden' : ''}>
                ${this.codexMatchFeedback || ''}
            </div>`;
    }

    selectEvidenceForMatching(evidenceId) {
        this.selectedCodexEvidenceId = (this.selectedCodexEvidenceId === evidenceId) ? null : evidenceId;
        window.ui.switchInvTab('codex');
    }

    selectProphecyForMatching(prophecyId) {
        const prophecy = this.es.getProphecyById(prophecyId);
        const status = this.es.getPropheciesWithStatus().find(p => p.id === prophecyId)?.status;
        
        if (prophecy && status === 'complete') {
            if (typeof window.ui.showProphecyDetail === 'function') {
                window.ui.showProphecyDetail(prophecyId);
            }
        } else if (prophecy && (status === 'found_scripture' || status === 'rumor')) {
            if (typeof window.ui.showProphecyDetail === 'function') {
                window.ui.showProphecyDetail(prophecyId);
            }
        } else {
            this.selectedCodexProphecyId = (this.selectedCodexProphecyId === prophecyId) ? null : prophecyId;
        }
        window.ui.switchInvTab('codex');
    }

    attemptProphecyMatch() {
        const result = this.es.attemptProphecyMatch();
        if (!result) return;

        if (result.success) {
            if (this.audio.enabled) this.audio.playBonus();
            this.codexMatchFeedback = `<div class="codex-feedback-msg success"><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> Research Complete! +20 RP<br><small>${result.message}</small></div>`;
            if (typeof window.ui?.checkChains === 'function') {
              window.ui.checkChains();
            }
        } else {
            if (this.audio.enabled) this.audio.playError();
            this.codexMatchFeedback = `<div class="codex-feedback-msg error"><img src='../assets/gfx/x-circle-duotone.svg' class='icon-svg' loading='lazy'> ${result.message}</div>`;
        }
        this.selectedCodexEvidenceId = null;
        this.selectedCodexProphecyId = null;
        window.ui.switchInvTab('codex');
        setTimeout(() => { this.codexMatchFeedback = null; window.ui.switchInvTab('codex'); }, 4000);
    }
}

function avatarMarkup(a){if(!a)return'';if(a.endsWith('.svg'))return`<img src="../assets/characters/${a}"style="width:1.5em;height:1.5em;vertical-align:middle;object-fit:contain;"alt="">`;return a;}

export class AccuseUI {
    constructor(caseManager) {
        this.cm = caseManager;
    }

    render() {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const prog = this.cm.getCaseProgress(c.id);
        const unlockedSuspects = prog?.unlockedSuspects || prog?.discoveredSuspects || [];

        return `<h3 class="section-title">Make Your Accusation</h3>
            <div class="prophecy-accuse-intro">
                When you have uncovered the truth, name the culprit. A wrong accusation costs you the case.
            </div>
            <div class="accuse-panel">
                <div class="suspect-list">
                    ${c.suspects.map(s => {
                        const isLocked = !unlockedSuspects.includes(s.id);
                        const status = this.cm.getSuspectStatus(s.id);
                        return `<div class="suspect-accordion">
                                    <button class="suspect-btn ${isLocked ? 'locked' : ''}" onclick="toggleSuspect(this)" aria-expanded="false">
                                        <span class="suspect-btn-avatar"><img src="../assets/characters/${s.avatar}" style="width:1.5em;height:1.5em;vertical-align:middle;object-fit:contain;" alt=""></span>
                                        <div class="suspect-btn-info"><div class="suspect-btn-name">${s.name}</div><div class="suspect-btn-role">${s.role}</div></div>
                                        <span class="accordion-chevron" aria-hidden="true">▶</span>
                                    </button>
                                    <div class="suspect-details">
                                        <div class="suspect-details-content">
                                            <div class="suspect-detail-row"><span class="suspect-detail-label">Bible Reference</span><span class="suspect-detail-value">${s.bibleRef || '—'}</span></div>
                                            <div class="suspect-detail-row"><span class="suspect-detail-label">Status</span><span class="suspect-detail-value">${status.status}</span></div>
                                            <div class="suspect-action-row">
                                                <button class="accuse-btn ${isLocked ? 'locked' : ''}" onclick="accuse('${s.id}')" ${isLocked ? 'disabled' : ''}>${isLocked ? "<img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'> Locked" : 'Accuse →'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                    }).join("")}
                </div>
            </div>`;
    }
}
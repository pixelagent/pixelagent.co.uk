class EvidenceReactionUI {
    constructor(uiManager, evidenceSystem) {
        this.uiManager = uiManager;
        this.evidenceSystem = evidenceSystem;
        this.modal = document.getElementById('evidence-reaction-modal');
        this.avatarEl = document.getElementById('reaction-modal-avatar');
        this.npcNameEl = document.getElementById('reaction-modal-npc-name');
        this.reactionTextEl = document.getElementById('evidence-reaction-text');
        this.scoringEl = document.getElementById('evidence-reaction-scoring');
        this.clueEl = document.getElementById('evidence-reaction-clue');

        this.init();
    }

    init() {
        const closeButton = this.modal.querySelector('.close-button');
        closeButton.addEventListener('click', () => this.uiManager.hideModal(this.modal));
    }

    show(npc, reaction) {
        if (!npc || !reaction) return;

        // Populate modal with NPC and reaction info
        this.avatarEl.innerHTML = npc.avatar || '';
        this.npcNameEl.textContent = `${npc.name}'s Reaction`;
        this.reactionTextEl.textContent = reaction.text;

        // Populate scoring feedback
        this.scoringEl.innerHTML = this.buildScoringHtml(reaction);

        // Populate new clue feedback
        if (reaction.revealedClue) {
            const clue = this.evidenceSystem.getEvidenceById(reaction.revealedClue);
            if (clue) {
                const evidenceType = this.evidenceSystem.getEvidenceType(clue.type);
                this.clueEl.innerHTML = `
                    <p>New Information Unlocked:</p>
                    <div class="picker-card minimal">
                        <div class="picker-icon"><img src='${evidenceType.icon}' class='icon-svg' loading='lazy'></div>
                        <div class="picker-title">${clue.name}</div>
                    </div>`;
                this.clueEl.style.display = 'block';
            }
        } else {
            this.clueEl.style.display = 'none';
        }

        this.uiManager.showModal(this.modal);
    }

    buildScoringHtml(reaction) {
        let feedbackHtml = '';
        if (reaction.points) {
            feedbackHtml += `<div class="feedback-item points"><span>Points</span><span>+${reaction.points}</span></div>`;
        }
        if (reaction.doubt) {
            feedbackHtml += `<div class="feedback-item doubt"><span>Doubt</span><span>+${reaction.doubt}</span></div>`;
        }
        if (reaction.reputation) {
            const repChange = reaction.reputation.change;
            const sign = repChange > 0 ? '+' : '';
            const repClass = repChange > 0 ? 'positive' : 'negative';
            feedbackHtml += `
                <div class="feedback-item reputation">
                    <span>Reputation (${reaction.reputation.faction})</span>
                    <span class="${repClass}">${sign}${repChange}</span>
                </div>`;
        }

        if (!feedbackHtml) {
            return '<div class="feedback-item"><span>No immediate score change.</span></div>';
        }

        return feedbackHtml;
    }
}
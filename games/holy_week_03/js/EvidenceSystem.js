/**
 * Manages the collection of narrative Evidence Tokens.
 */
export class EvidenceSystem {
    constructor() {
        this.collected = new Set();
    }

    collect(id) {
        if (!this.collected.has(id)) {
            this.collected.add(id);
            console.log(`Investigation Updated: Collected ${id}`);
            window.dispatchEvent(new CustomEvent('evidence-added', { detail: { id } }));
        }
    }

    has(id) {
        return this.collected.has(id);
    }
}

export const evidenceSystem = new EvidenceSystem();
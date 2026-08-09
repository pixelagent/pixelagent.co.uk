import { actions as actionDefs } from '../config.js';

const actionQuestMap = {
    'listen': 'RUMOR',
    'interrogate': 'WITNESS',
    'examine': 'EVIDENCE',
    'reflect': 'PARABLE'
};

export class ActionManager {
     constructor(iconMgr) {
         this.actions = [...actionDefs];
         this.pendingFloatingIcon = null;
         this.iconMgr = iconMgr;
         this._quests = [];
     }

     setQuests(quests) {
         this._quests = quests || [];
     }

     getActions() {
         return this.actions;
     }

     getActiveQuests() {
         return this._quests;
     }

    executeAction(action, activeNpc, updateUI, playSoundFunc, playQuestSound) {
        if (playSoundFunc) playSoundFunc();

        this.showFloatingActionIcon(action.iconType || action.icon);

        let questCompleted = false;

        // 1. Look inside appState-level active quests for current level
        const quests = this.getActiveQuests();
        if (activeNpc && activeNpc.data && activeNpc.data.questId !== undefined) {
            const targetQuestType = actionQuestMap[action.type];
            const quest = quests.find(q => q.id === targetQuestType);

            if (quest) {
                quest.cur = quest.tar;
                quest.completed = true;
                questCompleted = true;
                if (playQuestSound) playQuestSound();
            }
        }

        if (!questCompleted) {
            this.performActionLogic(action);
        }

        if (action.uses !== undefined && action.uses > 0) {
            action.uses--;
            if (action.uses === 0) {
                const index = this.actions.indexOf(action);
                if (index > -1) this.actions.splice(index, 1);
            }
        }

        if (updateUI) updateUI();


        return questCompleted;
    }

    performActionLogic(action) {
        switch (action.type) {
            case 'scan':
                console.log('Performing scan action');
                break;
            case 'repair':
                console.log('Performing repair action');
                break;
            case 'hack':
                console.log('Performing hack action');
                break;
            case 'heal':
                console.log('Performing heal action');
                break;
            default:
                console.log(`Performing ${action.name} action`);
                break;
        }
    }

    showFloatingActionIcon(iconType) {
        this.pendingFloatingIcon = iconType;
    }

    renderFloatingIcon(camera, playerPosition) {
        if (this.pendingFloatingIcon) {
            const iconEl = this.iconMgr.createIconElement(this.pendingFloatingIcon, {
                size: 32,
                color: 'var(--accent-secondary)',
                className: 'floating-action-icon' // Ensure positioning
            });

            const playerScreenPos = playerPosition.project(camera);
            const startX = (playerScreenPos.x * 0.5 + 0.5) * window.innerWidth + (Math.random() - 0.5) * 60;
            const startY = (playerScreenPos.y * -0.5 + 0.5) * window.innerHeight + (Math.random() - 0.5) * 20;
            iconEl.style.left = `${startX}px`;
            iconEl.style.top = `${startY}px`;

            iconEl.style.transform = 'translate(0, 0) scale(2)';
            iconEl.style.opacity = '1';

            document.body.appendChild(iconEl);

            let startTime = null;
            const duration = 3000;
            const travelDistance = 500;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const scale = 2 - progress;
                const translateY = -travelDistance * progress;
                iconEl.style.transform = `translate(0, ${translateY}px) scale(${scale})`;

                let opacity;
                if (progress < 0.2) {
                    opacity = 1;
                } else if (progress < 0.6) {
                    opacity = 1 - ((progress - 0.2) / 0.4);
                } else {
                    opacity = 0;
                }
                iconEl.style.opacity = opacity;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(iconEl);
                }
            };

            requestAnimationFrame(animate);
            this.pendingFloatingIcon = null;
        }
    }

}


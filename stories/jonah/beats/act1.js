/**
 * BEATS/ACT1.JS — Fleeing from God
 * Input type: reaction / timing
 */

const Act1Beats = (function () {

    function boardShip(boardedInTime) {
        if (boardedInTime) Compass.nudge('fear', 5);
        Compass.recordBeat('act1_board');
    }

    function brace(hitCalmSpot) {
        if (hitCalmSpot) {
            Compass.nudge('trust', 5);
        } else {
            Compass.nudge('fear', 8);
        }
        Compass.recordBeat('act1_brace');
    }

    function castLots() {
        // Always resolves to Jonah — inevitability is the point, no branching outcome.
        Compass.recordBeat('act1_lots');
    }

    return { boardShip, brace, castLots };
})();

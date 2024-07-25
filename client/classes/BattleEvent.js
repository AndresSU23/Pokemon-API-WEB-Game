
class BattleEvent {
    constructor (encounters) {
        this.encounters = encounters
    }

    triggerEvent() {
        const random = Math.floor(Math.random() * 100);
        let floor = 0;
        for (let i in this.encounters) {
            if (floor >= random && random <= this.encounters[i].probability) {
                console.log(`Battle Event triggered with Id ${this.encounters[i].encounterId}`);
            }
            floor += this.encounters[i].probability;
        }
    }
}

export default BattleEvent;
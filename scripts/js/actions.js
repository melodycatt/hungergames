import { Presets } from "../utils.js"

export class Action {
    //constructor stuff
    action = document.createElement('div');
    container = document.createElement('div');
    constructor(text, playersNeeded, lethal, itemNeeded, itemGained, itemLost) {
        //players involved
        this.players = [];
        this.text = text;
        this.playersNeeded = playersNeeded;
        this.lethal = lethal;
        if (typeof itemNeeded == 'string') {
            this.itemNeeded = eval(itemNeeded);
        }
        else {
            this.itemNeeded = itemNeeded;
        }
        if (typeof itemGained == 'string') {
            this.itemGained = eval(itemGained);
        }
        else {
            this.itemGained = itemGained;
        }
        if (typeof itemLost == 'string') {
            this.itemLost = eval(itemLost);
        }
        else {
            this.itemLost = itemLost;
        }
    }
    //does all the stuff the action does
    run() {
        //debug
        this.generate();
        //if lethal, get rid of all the players except the first one, might make it so which players die is specified later
        if (this.lethal) {
            //slice returns a copy of a section of an array. this returns everything but the first and kills each of the plauyers
            this.players.slice(1).forEach((player, index) => {
                player.kill();
            });
        }
        //item stuff
        if (this.itemGained[1] > 0) {
            this.players[this.itemGained[1]].inv.push(this.itemGained[0]);
        }
        if (this.itemLost[1] > 0) {
            this.players[this.itemLost[1]].inv.push(this.itemLost[0]);
        }
    }
    generate() {
        this.container.className = 'actionContainer'
        section.appendChild(this.container)
        for (let player of this.players) {
            this.container.appendChild(player.img.cloneNode());
        }
        this.action.className = 'action';
        this.action.innerHTML = eval(this.text);
        this.container.appendChild(this.action);
    }
}

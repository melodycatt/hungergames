import { PresetItems, PresetActions } from "./utils.js"
import * as items from "./items.js"
import { playersAlive } from "./hungerGamesScript/main.js";
const section = document.getElementById('day')

export class Action {
    //constructor stuff
    action = document.createElement('div');
    constructor(text, playersNeeded, itemData) {
        //players involved
        this.cloneData = [text, playersNeeded, itemData]
        this.players = [];
        this.text = text;
        this.playersNeeded = playersNeeded;
        this.itemData = itemData;
    }
    //does all the stuff the action does
    run(owner, container) {
        this.players = [owner]
        let viable = this.viablePlayers
        while (this.players.length < this.playersNeeded) {
            this.players.push(viable.splice(Math.round(Math.random() * (viable.length - 1)), 1)[0])
        }
        this.itemData.parent = this;
        this.itemData.run(owner)
        this.action.className = 'action';
        this.action.innerHTML = eval(this.text);
        container.appendChild(this.action.cloneNode(true));
        container.appendChild(this.itemData.effects.cloneNode(true))
    }
    
    get viablePlayers() {
        let output = []
        for ( let player of playersAlive ) {
            if (this.itemData.type == 'attack' || this.itemData.type == 'eat') {
                if (player.hasItem(this.itemData.itemInstances[0])) {
                    output.push(player)
                }
            } else if (this.itemData.type == 'craft') {
                let hasI = 0
                for (let a of this.itemData.itemInstances) {
                    if (player.hasItem([a])) {
                        hasI++; 
                    }
                }
                if (hasI == this.itemData.itemInstances.length) {
                    output.push(player)
                }
            } else {
                output.push(player)
            }
        }
        return output    
    }

    clone() {
        return new Action(this.cloneData[0], this.cloneData[1], this.cloneData[2]);
    }
}


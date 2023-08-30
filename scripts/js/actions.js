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
        console.log(itemData, itemData[0], eval(itemData))
        this.players = [];
        this.text = text;
        this.playersNeeded = playersNeeded;
        this.itemData = itemData;
    }
    //does all the stuff the action does
    run(owner, container) {
        console.log(5)
        this.players = [owner]
        let viable = this.viablePlayers
        while (this.players.length < this.playersNeeded) {
            console.log(6)
            this.players.push(viable.splice(Math.round(Math.random() * (viable.length - 1)), 1)[0])
        }
        for (let i of this.itemData) {
            console.log(7)
            console.log(i)
            i.parent = this;
            i.run(owner)
        }
        this.action.className = 'action';
        this.action.innerHTML = eval(this.text);
        container.appendChild(this.action.cloneNode());
        container.appendChild(this.itemData.effects.cloneNode())
    }
    
    get viablePlayers() {
        let output = []
        for ( let player of playersAlive ) {
            let add = 0
            for ( let i of this.itemData) {
                if (i.type == 'attack' || i.type == 'eat') {
                    if (player.hasItem(i.itemInstances[0])) {
                        add++
                    }
                } else if (i.type == 'craft') {
                    let hasI = 0
                    for (let a in i.itemInstances) {
                        if (player.hasItem(i.itemInstances[a])) {
                            hasI++; 
                        }
                    }
                    if (hasI == i.itemInstances.length) {
                        add++
                    }
                } else {
                    add++
                }
            }
            if (add == this.itemData.length) {
                output.push(player)
            }
        }
        return output    
    }

    clone() {
        return new Action(this.cloneData[0], this.cloneData[1], this.cloneData[2]);
    }
}


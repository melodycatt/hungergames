import { PresetItems, PresetActions, viableActions } from "./utils.js"
import * as items from "./items.js"
const section = document.getElementById('day')

export class Action {
    //constructor stuff
    action = document.createElement('div');
    container = document.createElement('div');
    constructor(text, playersNeeded, itemData) {
        //players involved
        console.log(itemData, itemData[0], eval(itemData))
        this.players = [];
        this.text = text;
        this.playersNeeded = playersNeeded;
        this.itemData = eval(itemData)
        for (let i in this.itemData) {
            console.log(i)
            this.itemData[i] = eval(this.itemData[i]);
            this.itemData[i].parent = this;
        }
    }
    //does all the stuff the action does
    run() {
        //debug
        this.generate();
        //if lethal, get rid of all the players except the first one, might make it so which players die is specified later
        /*if (this.lethal) {
            //slice returns a copy of a section of an array. this returns everything but the first and kills each of the plauyers
            this.players.slice(1).forEach((player, index) => {
                player.kill();
            });
        }*/
        //item stuff
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


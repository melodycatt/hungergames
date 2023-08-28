"use strict";

import { Player } from "./players.js"
import { Presets } from "../utils.js"
//this whole thing is a hunger games sim
//if you wanna run this download deno its the equiv of node.js
;
// the player or tribute class
//item stuff tbh just ignore all this
class Item {
    constructor(name, count, customTags) {
        this.name = name;
        this.count = count;
        this.customTags = customTags;
    }
}
class Weapon extends Item {
    constructor(name, count, durability, damage, customTags) {
        super(name, count, customTags);
        this.durability = durability;
        this.damage = damage;
    }
}
class Food extends Item {
    constructor(name, count, hunger, customTags) {
        super(name, count, customTags);
        this.hunger = hunger;
    }
}
//Action class declaration
class Action {
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
//init players alive and stuff
export let playersAlive = [
    new Player("Big Poo"),
    new Player("Izutsumi"),
    new Player("Hilber"),
    new Player("Liliaa"),
    new Player("Celestial"),
];
console.log(playersAlive);
let playersLeftInRound;
const section = document.getElementById('day')
const dayButton = document.getElementById('dayBtn')
dayButton.addEventListener("mouseup", (e) => {
    day()
})
console.log(section)
//loop through the players and runs the event method on each
export function day() {
    playersLeftInRound = playersAlive.slice();
    while (playersLeftInRound[0]) {
        console.log(playersLeftInRound)
        console.log(playersAlive, 'playersAlive')
        playersLeftInRound[Math.round(Math.random() * (playersLeftInRound.length - 1))].event();
    }
    console.log(playersLeftInRound)
    console.log(playersAlive, 'playersAlive')
}
console.log(day)

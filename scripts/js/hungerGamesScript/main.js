"use strict";

import { Player } from "./players.js"
import { Presets } from "../utils.js"
import * as items from "../items.js" 
import { Action } from "../actions.js"
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

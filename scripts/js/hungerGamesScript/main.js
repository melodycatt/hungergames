"use strict";

import { Player } from "./players.js"
import { Presets } from "../utils.js"
import * as items from "../items.js" 
import { Action } from "../actions.js"
//this whole thing is a hunger games sim
//if you wanna run this download deno its the equiv of node.js
//Action class declaration
//init players alive and stuff
export let playersAlive = [
    new Player("Big Poo"),
    new Player("Izutsumi"),
    new Player("Hilber"),
    new Player("Liliaa"),
    new Player("Celestial", "https://images.newscientist.com/wp-content/uploads/2023/04/06160828/SEI_151092237.jpg?width=1200"),
    new Player("Vevi", "https://media.discordapp.net/attachments/939571899279761521/1145839671167955054/Untitled691_20230828175727.png?width=1196&height=1196"),
];
const section = document.getElementById('day')
const dayButton = document.getElementById('dayBtn')
dayButton.addEventListener("mouseup", (e) => {
    day()
})
//loop through the players and runs the event method on each
export function day() {
    for (let player of playersAlive) {
        player.event()
    }
}

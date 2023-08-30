"use strict";

import * as items from "./items.js"
import { Action } from "./actions.js";
import { Player } from "./hungerGamesScript/players.js";
import { playersAlive } from "./hungerGamesScript/main.js";
//returns random property from an object
export function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
;
//returns a random number between min and max -- not sure why this is a fiunction
export function ranIntInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function range(start, end, inclusive = false) {
    let output = []
    if (inclusive) {
        for (let i = start; i < end + 1; i++) {
            output.push(i)
        }        
    } else {
        for (let i = start; i < end; i++) {
            output.push(i)
        }        
    }
    return output
}

export const PresetItems = {
    Weapons: {
        Spear: new items.Weapon('Spear', 3, 45),
        Dagger: new items.Weapon('Dagger', 1, 20),
        Sword: new items.Weapon('Sword', 4, 55),
        Bow: new items.Weapon('Bow', 1, 35),
    },
    Food: {
        Bread: new items.Food('Bread', 1, 2),
        Apple: new items.Food('Apple', 1, 1),
        Steak: new items.Food('Steak', 1, 3),
        Berries: new items.Food('Berries', 1, 1),
        Nuts: new items.Food('Nuts', 1, 1),
    },
    null: new items.Item('', 0),
    kill: new items.Weapon('killer', 10000, 10000),
}

//presets of items and events
export const PresetActions = [
    new Action("this.players[0].name + ' stabs ' + this.players[1].name + ' with a Spear.'", 2, [new items.ActionItemTemplate([PresetItems.Weapons.Spear], [1], "attack", {affectedPlayers: [1]})]),
    new Action("this.players[0].name + ' tries to climb a tree, but falls out of it and dies.'", 1, [new items.ActionItemTemplate([PresetItems.null], [0], "none", {})]),
    new Action("this.players[0].name + ' gets a piece of bread.'", 1, [new items.ActionItemTemplate([PresetItems.Food.Bread], [0], "gain", {})]),
    new Action("this.players[0].name + ' pees.'", 2, [new items.ActionItemTemplate([PresetItems.null], [0], "none", {})]),
];


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

//presets of items and events
export let Presets = {
    Actions: [
        "new Action(\"this.players[0].name + ' stabs ' + this.players[1].name + ' with a Spear.'\", 2, '[Presets.Items.null, 0]', '[Presets.Items.null, 0]', '[Presets.Items.Weapons.Spear, 1]')",
        "new Action(\"this.players[0].name + ' tries to climb a tree, but falls out of it and dies.'\", 1, '[Presets.Items.null, 0]', '[Presets.Items.null, 0]', '[Presets.Items.kill, 0]')",
        "new Action(\"this.players[0].name + ' gets a piece of bread.'\", 1, '[Presets.Items.null, 0]', '[Presets.Items.Food.Bread, 0]', '[Presets.Items.null, 0]')"
    ],
    Items: {
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
};

/**
 * Returns Viable Player Actions
 * @param { Player } player 
 * @returns {Array}
 */
export function viableActions(player) {
    let output = []
    for (let action of Presets.Actions) {
        action = eval(action);
        if (action.playersNeeded <= playersAlive.length) {
            for ( let i of action.itemData) {
                if (i.type == 'attack' || 'eat') {
                    if (player.hasItem(i.itemInstances[0])) {
                        output.push(action);
                    }
                } else if (i.type == 'craft') {
                    let hasI = 0
                    for (let a in i.itemInstances) {
                        if (player.hasItem(i.itemInstances[a])) {
                            hasI++; 
                        }
                    }
                    if (hasI == i.itemInstances.length) {
                        output.push(action)
                    }
                } else if (i.type == 'gain') {
                    output.push(action)
                }
            }
        } else {
            continue;
        }
    }
    return output
}


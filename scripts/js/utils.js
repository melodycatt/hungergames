"use strict";

import * as items from "./item.js"
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

//presets of items and events
export let Presets = {
    Actions: {
        spearStab: "new Action(\"this.players[0].name + ' stabs ' + this.players[1].name + ' with a Spear.'\", 2, '[Presets.Items.null, 0]', '[Presets.Items.null, 0]', '[Presets.Items.items.weapons.Spear, 1]')",
        treeClimb: "new Action(\"this.players[0].name + ' tries to climb a tree, but falls out of it and dies.'\", 2, '[Presets.Items.null, 0]', '[Presets.Items.null, 0]', '[Presets.Items.kill, 2]')",
        bread: "new Action(\"this.players[0].name + ' gets a piece of bread.'\", 1, '[Presets.Items.null, 0]', '[Presets.Items.Food.Bread, 0]', '[Presets.Items.null, 0]')"
    },
    Items: {
        Weapons: {
            Spear: new items.weapon('Spear', 3, 45),
            Dagger: new items.weapon('Dagger', 1, 20),
            Sword: new items.weapon('Sword', 4, 55),
            Bow: new items.weapon('Bow', 1, 35),
        },
        Food: {
            Bread: new Food('Bread', 1, 2),
            Apple: new Food('Apple', 1, 1),
            Steak: new Food('Steak', 1, 3),
            Berries: new Food('Berries', 1, 1),
            Nuts: new Food('Nuts', 1, 1),
        },
        null: new Item('', 0),
        kill: new items.weapon('killer', 10000, 10000),
    }
};

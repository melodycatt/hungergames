"use strict";
//this whole thing is a hunger games sim
//if you wanna run this download deno its the equiv of node.js
;
// the player or tribute class
class Player {
    //constructor ofc
    constructor(name, img) {
        this.inv = [];
        this.alliances = [];
        this.hunger = 3;
        this.name = name;
        this.img = document.createElement('img');
        this.img.className = 'player';
        this.img.src = img || 'default.jpg';
        console.log(this.img)
        this.img.style.width = '100px';
        this.img.style.height = '100px';
        this.stats = {
            maxHealth: ranIntInterval(80, 130),
            health: null,
            speed: ranIntInterval(8, 12),
            strength: ranIntInterval(8, 12),
            defense: ranIntInterval(8, 12)
        };
        this.stats.health = this.stats.maxHealth;
    }
    //if youve ever seen the brantsteele.net simulator its kinda like that. theres just a set of events that can happen between people like "person kills person"
    //this method starts those events
    event() {
        //initialises a random event/action from preset ones ive made (go to the Action class definition for context ig??)
        let actionReal = eval(randomProperty(Presets.Actions));
        //makes sure that the amount of players needed for the chosen action is not greater than the amount of players left that are eligible to be part of an action
        while (actionReal.playersNeeded > playersLeftInRound.length) {
            actionReal = eval(randomProperty(Presets.Actions));
        }
        //adds this to the action's list of players invoved
        actionReal.players = [this];
        //removes this from the list of players eligible for actions
        playersLeftInRound.splice(playersLeftInRound.indexOf(this), 1);
        //adds a random other player (and removes that random player from the list) to the list of involved players to fulfill the amount of players needed for the action 
        for (let i = 0; i < actionReal.playersNeeded - 1; i++) {
            actionReal.players.push(playersLeftInRound.splice(Math.round(Math.random() * playersLeftInRound.length - 1), 1)[0]);
        }
        //does all the things the action does just go to the action declaration
        actionReal.run();
    }
    // removes this from the alive players. tbh dont know why this is a function when its 1 line
    kill() {
        playersAlive.splice(playersAlive.indexOf(this), 1);
    }
    //hunger stuff. it is the *hunger* games after all
    handleHunger() {
        if (this.hunger == 0) {
            this.stats.health -= 15;
        }
    }
}
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
//presets of items and events
let Presets = {
    Actions: {
        kills: "new Action(\"this.players[0].name + ' kills ' + this.players[1].name + '.'\", 2, true, '[Presets.Items.null, 0]', '[Presets.Items.null, 0]', '[Presets.Items.null, 0]')",
        bread: "new Action(\"this.players[0].name + ' gets a piece of bread.'\", 1, false, '[Presets.Items.null, 0]', '[Presets.Items.Food.Bread, 0]', '[Presets.Items.null, 0]')"
    },
    Items: {
        Weapons: {},
        Food: {
            Bread: new Food('Bread', 1, 2)
        },
        null: new Item('', 0)
    }
};
//returns random property from an object
function randomProperty(obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}
;
//returns a random number between min and max -- not sure why this is a fiunction
function ranIntInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
//init players alive and stuff
let playersAlive = [
    new Player("Big Poo"),
    new Player("Izutsumi"),
    new Player("Hilber"),
    new Player("Liliaa"),
    new Player("Celestial"),
];
;
let playersLeftInRound;
const section = document.getElementById('day')
//loop through the players and runs the event method on each
function day() {
    playersLeftInRound = playersAlive.slice();
    for (let player of playersLeftInRound) {
        player.event();
    }
}

"use strict";
import * as utils from "../utils.js"
import * as items from "../items.js"
import { Action } from "../actions.js"
import { playersAlive } from "./main.js";

const section = document.getElementById('day')

export class Player {
    //constructor ofc
    constructor(name, img) {
        this.inv = [];
        this.alliances = [];
        this.hunger = 3;
        this.name = name;
        this.img = document.createElement('img');
        this.img.className = 'player';
        this.img.src = img || 'default.jpg';
        this.img.style.width = '100px';
        this.img.style.height = '100px';
        this.img.style.objectFit = 'cover';
        this.stats = {
            maxHealth: utils.ranIntInterval(80, 130),
            health: null,
            speed: utils.ranIntInterval(8, 12),
            strength: utils.ranIntInterval(8, 12),
            defense: utils.ranIntInterval(8, 12)
        };
        this.stats.health = this.stats.maxHealth;
    }
    //if youve ever seen the brantsteele.net simulator its kinda like that. theres just a set of events that can happen between people like "person kills person"
    //this method starts those events
    event() {
        let actionChance = 100;
        let actionReal;
        let viable = utils.viableActions();
        if(Math.round(Math.random * 100) <= actionChance) {
            actionReal = viable[Math.round(Math.random * (viable.length - 1))]
        }
        //adds this to the action's list of players invoved
        actionReal.players = [this];
        //adds a random other player (and removes that random player from the list) to the list of involved players to fulfill the amount of players needed for the action 
        for (let i = 0; i < actionReal.playersNeeded - 1; i++) {
            let tempPlayer = playersAlive[Math.round(Math.random() * (playersAlive.length - 1))];
            if ( tempPlayer.viable(actionReal) ) {
                actionReal.players.push(tempPlayer);
            }
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

    viable(action) {
        let output = false;
        for ( let i of action.itemData) {
            if (i.type == 'eat') {
                if (this.hasItem(i.itemInstances[0])) {
                    output = true;
                }
            } else if (i.type == 'craft') {
                let hasI = 0
                for (let a in i.itemInstances) {
                    if (this.hasItem(i.itemInstances[a])) {
                        hasI++; 
                    }
                }
                if (hasI == i.itemInstances.length) {
                    output = true
                }
            } else if (i.type == 'gain') {
                output = true;
            }
        }
        return output;
    }

    hasItem(item) {
        for (let i of this.inv) {
            if (i.name == item.name && i.customTags == item.customTags && i.count >= item.count) {
                return true;
            }
        }
        return false;
    }
}

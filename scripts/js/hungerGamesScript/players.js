"use strict";
import { PresetActions, ranIntInterval } from "../utils.js";
import { playersAlive } from "./main.js";

const section = document.getElementById('day')

export class Player {
    //constructor ofc
    container = document.createElement('div');
    alive = true
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
        this.img.style.margin = '25px';
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
        let actionChance = 100;
        let actionReal;
        let viable = this.viableActions;
        this.container.classList.add('playerActionContainer');
        this.container.classList.add('flexWrap');
        this.container.appendChild(this.img.cloneNode(true))
        for (let i of this.menus) {
            this.container.appendChild(i)
        }
        while (Math.round(Math.random() * 100) <= actionChance && this.alive == true) {
            console.log(3)
            actionReal = viable.splice(Math.round(Math.random() * (viable.length - 1)), 1)[0].clone()
            actionReal.run(this, this.container);
            actionChance /= 3;
            actionChance = Math.round(actionChance)
        }
        section.appendChild(this.container.cloneNode(true))
    }
    // removes this from the alive players. tbh dont know why this is a function when its 1 line
    kill() {
        playersAlive.splice(playersAlive.indexOf(this), 1);
        this.alive = false
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

    get viableActions() {
        let out = [];
        for (let action of PresetActions) {
            if (action.viablePlayers.includes(this) && action.viablePlayers.includes(this) <= playersAlive.length) {
                out.push(action);
            }
        }
        return out;
    }

    get menus() {
        let output = [[document.createElement('div'), document.createElement('div')], [document.createElement('div'), document.createElement('div')]]
        output[0][1].innerHTML = JSON.stringify(this.inv)
        output[0][0].appendChild(output[0][1])
        output[0][0].classList.add('playerInv')
        output[0][1].classList.add('playerInvContent')
        output[1][1].innerHTML = JSON.stringify(this.stats)
        output[1][0].appendChild(output[1][1])
        output[1][0].classList.add('playerStats')
        output[1][1].classList.add('playerStatsContent')
        return [output[0][0], output[1][0]]
    }
}

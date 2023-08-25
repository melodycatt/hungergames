"use strict";

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

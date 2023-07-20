interface PlayerStats {
    maxHealth: number
    health: any
    speed: number
    strength: number
    defense: number
}

class Player {
    img: string;
    name: string;
    stats : PlayerStats;
    inv: Array<Item> = [];
    alliances: Array<Player> = [];
    hunger: number = 3;

    constructor (name : string, img : string) {
        this.name = name;
        this.img = img;
        this.stats = {
            maxHealth: ranIntInterval(80,130),
            health: null,
            speed: ranIntInterval(8,12),
            strength: ranIntInterval(8,12),
            defense: ranIntInterval(8,12)
        };
        this.stats.health = this.stats.maxHealth;
    }

    event() {

    }

    kill() {

    }

    handleHunger () {
        if (this.hunger == 0) {
            this.stats.health -= 15;
        }
    }
}

class Item {
    name : string;
    count : number;
    customTags : object | undefined;
    constructor(name : string, count : number, customTags? : object) {
        this.name = name;
        this.count = count;
        this.customTags = customTags;
    }
}

class Weapon extends Item {
    durability : number;
    damage : number
    constructor (name : string, count : number, durability : number, damage : number, customTags? : object) {
        super(name, count, customTags);
        this.durability = durability;
        this.damage = damage;
    }
}

class Food extends Item {
    hunger : number;
    constructor (name : string, count : number, hunger : number, customTags? : object) {
        super(name, count, customTags);
        this.hunger = hunger;
    }
}

class Action {
    text : string;
    playersNeeded : number;
    players : Array<Player> | undefined = undefined;
    lethal : boolean;
    itemNeeded : [Item, number];
    itemGained : [Item, number];
    itemLost : [Item, number];
    constructor(text : string, playersNeeded : number, lethal : boolean, itemNeeded : [Item, number] | string, itemGained : [Item, number] | string, itemLost : [Item, number] | string) {
        this.text = text;
        this.playersNeeded = playersNeeded;
        this.lethal = lethal;
        if (typeof itemNeeded == 'string') {
            this.itemNeeded = eval(itemNeeded)
        } else {
            this.itemNeeded = itemNeeded;
        }
        if (typeof itemGained == 'string') {
            this.itemGained = eval(itemGained)
        } else {
            this.itemGained = itemGained;
        }
        if (typeof itemLost == 'string') {
            this.itemLost = eval(itemLost)
        } else {
            this.itemLost = itemLost;
        }
    }

    run (players : Array<Player>) {
        this.players = players;
        if (this.lethal == true) {
            players.slice(1).forEach((player, index) => {
                player.kill();
            });
        }
        if (this.itemGained[1] > 0) {
            this.players[this.itemGained[1]].inv.push(this.itemGained[0]);
        }
        if (this.itemLost[1] > 0) {
            this.players[this.itemLost[1]].inv.push(this.itemLost[0]);
        }
    }
}


let Presets = {
    Actions: {
        kills: "new Action(\"this.players[0] + 'kills' + this.players[1]\", 2, true, '[Presets.Items.null, 0]', '[Presets.Items.null, 0]', '[Presets.Items.null, 0]')",
        bread: "new Action(\"this.players[0] + 'gets a piece of bread.'\", 2, true, '[Presets.Items.null, 0]', '[Presets.Items.Food.Bread, 0]', '[Presets.Items.null, 0]')"
    },

    Items: {
        Weapons: {

        },
        Food: {
            Bread: new Food('Bread', 1, 2)
        },
        null: new Item('', 0)
    }
}

function ranIntInterval(min : number, max : number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(Presets.Actions.kills);
console.log(eval(Presets.Actions.bread));

function init() {
    let playersAlive : Player[] = [
        new Player("Big Poo", 'unused'),
        new Player("Izutsumi", 'unused'),
        new Player("Hilber", 'unused'),
        new Player("Liliaa", 'unused'),        
    ];
    let playersLeftInRound : Player[];

}
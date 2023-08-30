import { range } from './utils.js'
 
const section = document.getElementById('day')

export class Item {
    constructor(name, count, customTags) {
        this.name = name;
        this.count = count;
        this.customTags = customTags;
    }
}
export class Weapon extends Item {
    constructor(name, count, durability, damage, customTags) {
        super(name, count, customTags);
        this.durability = durability;
        this.damage = damage;
    }
}
export class Food extends Item {
    constructor(name, count, hunger, customTags) {
        super(name, count, customTags);
        this.hunger = hunger;
    }
}

export class ActionItemTemplate {
    static types = ["attack", "eat", "craft", "gain", "none"]
    effects;
    constructor (itemInstances, players, type, tags) {
        this.players = players
        console.log(ActionItemTemplate.types)
        this.itemInstances = itemInstances;
        if (ActionItemTemplate.types.includes(type)) {
            this.type = type
        }
        this.tags = tags;
    }
    
    run(owner) {        
        this.effects = document.createElement('div');
        this.effectsExtra = document.createElement('div');
        this.effects.className = this.type + 'Effect';
        this.effectsExtra.className = this.type + 'EffectExtra';

        if (this.type == "attack" && this.itemInstances[0] instanceof Weapon) {
            this.effects.innerHTML = `${this.itemInstances[0].damage} damage ▼`
            this.itemInstances[0].durability -= 1;
            this.effectsExtra.innerHTML = `${owner}'s ${this.itemInstances[0].name} loses 1 durability`
            owner.inv[owner.inv.indexOf(this.itemInstances[0])] = this.itemInstances[0]
            for (let player of this.players) {
                this.effectsExtra.innerHTML = this.effectsExtra.innerHTML + `${this.parent.players[player].name} loses ${this.itemInstances[0].damage}.` + this.players.indexOf(player) < this.players.length - 1 ? '\n' : ''
                this.parent.players[player].stats.health -= this.itemInstances[0].damage;
                if (this.parent.players[player].stats.health <= 0) {
                    this.effectsExtra.innerHTML = this.effectsExtra.innerHTML + `${this.parent.players[player].name} dies.` + this.players.indexOf(player) < this.players.length - 1 ? '\n' : ''
                    this.parent.players[player].kill();
                }
            }
            this.effects.appendChild(this.effectsExtra)
        } else if (this.type = "eat") {
            this.effects.innerHTML = `+${this.itemInstances[0].hunger} hunger ▼`
            for (let player in this.players) {
                this.effectsExtra.innerHTML = this.effectsExtra.innerHTML + `${this.parent.players[player].name} gains ${this.itemInstances[0].hunger} hunger.` + this.players.indexOf(player) < this.players.length - 1 ? '\n' : ''
                this.parent.players[player].hunger -= this.itemInstances[0].hunger;
            }
            this.effects.appendChild(this.effectsExtra)
        } else if (this.type == "craft") {
            this.effects.innerHTML = `Crafting ▼`
            for (let i in range(0, this.tags.itemsLost - 1)) {
                this.effectsExtra.innerHTML = this.effectsExtra.innerHTML + `-${this.tags.count[i]} ${this.itemInstances[i].name}.\n`
                this.itemInstances[i].count -= this.tags.count[i];
            }
            for (let i of range(this.tags.itemsLost, this.tags.itemsGained - 1)) {
                this.effectsExtra.innerHTML = this.effectsExtra.innerHTML + `+${this.tags.count[i]} ${this.itemInstances[i].name}` + i < this.itemInstances.length - 1 ? '\n' : ''
                this.itemInstances[i].count += this.tags.count[i];
            }
            for (let player in this.players) {
                for (let item of itemInstances) {
                    this.parent.players[player].inv[item] = item;
                }
            }
            this.effects.appendChild(this.effectsExtra)
        } else if (this.type == "gain") {
            this.effects.innerHTML = `+${this.itemInstances[0].count} ${this.itemInstances[0].count} ▼`
            for (let player in this.players) {
                this.effectsExtra.innerHTML = this.effectsExtra.innerHTML + `${this.parent.players[player].name} gains ${this.itemInstances[0].count} ${this.itemInstances[0].count}.` + this.players.indexOf(player) < this.players.length - 1 ? '\n' : ''
                this.parent.players[player].inv.push(this.itemInstances[0]);
            }
            this.effects.appendChild(this.effectsExtra)
        }
    }
}
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
    static types = ["attack", "eat", "craft"]
    constructor (itemInstances, players, type, tags) {
        this.players = players
        this.itemInstances = itemInstances;
        if (this.types.includes(type)) {
            this.type = type
        }
        if (this.type == "attack" && this.itemInstances[0] instanceof Weapon) {
            this.affectedPlayers = tags.affectedPlayers;
            this.owner = tags.owner;
            this.itemInstances[0].durability -= 1;
            this.owner.inv[this.owner.inv.indexOf(this.itemInstances[0])] = this.itemInstances[0]
            for (let player of this.affectedPlayers) {
                player.stats.health -= this.itemInstances[0].damage;
                if (player.stats.health <= 0) {
                    player.kill();
                }
            }
        } else if (this.type = "eat") {
            for (let player of this.players) {
                player.hunger -= this.itemInstances[0].hunger;
            }
        } else if (this.type == "craft") {
            for (let i in range(0, this.tags.itemsLost - 1)) {
                this.itemInstances[i].count -= tags.count[i];
            }
            for (let i in range(this.tags.itemsLost, this.tags.itemsGained - 1)) {
                this.itemInstances[i].count += tags.count[i];
            }
            for (let player of this.players) {
                for (let item in itemInstances) {
                    player.inv[item] = this.itemInstances[item]
                }
            }
        }
    }
}
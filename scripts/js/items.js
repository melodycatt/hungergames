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

"use strict";
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


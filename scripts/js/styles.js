const navButtons = Array.from(document.getElementsByClassName('navicon'))
const navButtonsMiddle = Math.floor(navButtons.length / 2)

navButtons.forEach((elm, i) => {
    elm.addEventListener("mouseenter", () => {
        elm.style.translate = `0px -15px`;
        elm.style.boxShadow = `0px 15px 0px #01764b`;
        elm.style.transitionDuration = `0.5s`
        })
    elm.addEventListener("mouseleave", () => {
        elm.style.translate = `0px 0px`
        elm.style.boxShadow = `0px 0px 0px #01764b`
        elm.style.transitionDuration = `0.5s`
    })
    elm.addEventListener("mousedown", () => {
        elm.style.translate = `0px -7px`
        elm.style.boxShadow = `0px 7px 0px #01764b`
        elm.style.transitionDuration = `0.1s`
    })
    elm.addEventListener("mouseup", () => {
        elm.style.translate = `0px -15px`;
        elm.style.boxShadow = `0px 15px 0px #01764b`;
    }) 
});


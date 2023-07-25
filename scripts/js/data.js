const dataSection = document.getElementById('data')
const playerData = document.getElementById('dataPlayerSection')

function getData (i) {
    const nameInput = document.getElementById('nameInput' + i);
    const imgInput = document.getElementById('imgInput' + i);
    const pContainer = document.getElementById('dataInputContainer' + i)
    console.log(imgInput.value)
    if (imgInput.value != '') {
        document.getElementById('dataPlayerImg' + i.toString()).src = imgInput.value;
        playersAlive[i].img.src = imgInput.value
    } else {
        document.getElementById('dataPlayerImg' + i.toString()).src = imgInput.placeholder;
        playersAlive[i].img.src = imgInput.placeholder;
    }
    pContainer.removeChild(imgInput);
    const name = document.createElement('div');
    name.className = 'dataPlayerName';
    name.innerHTML = nameInput.value;
    playersAlive[i].name = nameInput.value;
    name.id = 'dataPlayerName' + i
    pContainer.appendChild(name);
    pContainer.removeChild(nameInput);
    pContainer.removeChild(pContainer.querySelector('button'));
    pContainer.style.transform = null;
    pContainer.style.boxShadow = null;
    setTimeout(() => {pContainer.setAttribute('onclick', 'inputs(' + i.toString() + ')');}, 1)
}


let i = 0;
for (let player of playersAlive) {
    const container = document.createElement('div')
    const name = document.createElement('div');
    const img = player.img.cloneNode();
    container.id = 'dataInputContainer' + i.toString()
    container.className = 'dataPlayerContainer';
    container.setAttribute('onclick', 'inputs(' + i.toString() + ')');
    name.className = 'dataPlayerName';
    name.innerHTML = player.name;
    img.className = 'dataPlayerImg';
    name.id = 'dataPlayerName' + i.toString()
    img.id = 'dataPlayerImg' + i.toString()
    playerData.appendChild(container);
    container.appendChild(img);
    container.appendChild(name);
    i++;
}

function inputs(elementNumber) {
    let container = document.getElementById('dataInputContainer' + elementNumber.toString())
    let nameInput = container.querySelector('.dataPlayerName');
    let imgInput = document.createElement('input');
    let btn = document.createElement('button')
    let imgPlaceholder = container.querySelector('.dataPlayerImg').getAttribute('src');
    container.style.transform = `scale(1.1)`;
    container.style.boxShadow = `0px 5px 15px 2px black`;
    btn.innerHTML = 'Save'
    btn.setAttribute('onclick', 'getData(' + elementNumber + ')')
    imgInput.placeholder = imgPlaceholder;
    imgInput.id = 'imgInput' + elementNumber
    imgInput.style.width = '92px';
    imgInput.style.display = 'block';
    let namePlaceholder = nameInput.innerHTML;
    container.removeChild(nameInput);
    nameInput = document.createElement('input');
    nameInput.placeholder = namePlaceholder;
    nameInput.value = namePlaceholder;
    nameInput.id = 'nameInput' + elementNumber
    nameInput.style.width = '92px';
    nameInput.style.display = 'block';
    container.appendChild(nameInput);
    container.appendChild(imgInput);
    container.appendChild(btn);
    container.setAttribute('onclick', null);
    console.log(container);
}
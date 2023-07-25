function changePage(sectionId) {
    const section = document.getElementById(sectionId);
    let sections = [...document.getElementsByTagName('section')]
    console.log(sections, section)
    sections.splice(sections.indexOf(section), 1)
    section.className = 'active';
    for (let s of sections) {
        console.log('hi')
        s.className = 'inactive';
    }
    const btn = document.createElement('a');
    btn.href = '#' + sectionId;
    btn.click();
    btn.remove;
}
console.log(document.getElementById('data'))
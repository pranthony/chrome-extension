const ingrid = {
    universidades: []
}
let nodeE = document.querySelectorAll('section.education-container.list-container > section > ol a > dl > dt > span');
const obj = Array.from(nodeE);
obj.forEach((e)=>ingrid.universidades.push(e.innerHTML))
console.log(ingrid);

//function contentScriptFunc(name) {}

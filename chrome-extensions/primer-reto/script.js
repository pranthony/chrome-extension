let data = {
    nombres: ''
}
const dataSelectors= {
    nombre:'.pv-text-details__left-panel h1',
    educacion: 'div.pvs-list__outer-container > ul > li > div > div.display-flex.flex-column.full-width.align-self-center > div.display-flex.flex-row.justify-space-between > a',
    experiencia: 'div.pvs-list__outer-container > ul > li> div > div.display-flex.flex-column.full-width.align-self-center > div > div.display-flex.flex-column.full-width'
}
async function wait(seconds){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        }, seconds*1000)
    })
}

async function waitForSelector(selector,s){
    for (let i = 0; i < s; i++) {
        await wait(1);
        if(document.querySelector(selector)) return selector;
    } 
    return false
}
waitForSelector(dataSelectors.experiencia, 10).then(()=>{
    data.nombres = recolectar(dataSelectors.nombre)
    data.educacion = recolectar(dataSelectors.educacion)
    data.experiencia = recolectar(dataSelectors.experiencia)    
    chrome.runtime.sendMessage({data})
})


function recolectar(selector){
    return Array.from(document.querySelectorAll(selector)).map((e)=>e.innerText)
}

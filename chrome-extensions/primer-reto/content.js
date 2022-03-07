console.log('content')
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
waitForSelector('.entity-result__title-text .app-aware-link', 5).then(e=>{
        if(e){
            const links = Array.from(document.querySelectorAll(e)).map((e)=>e.href);
            
            chrome.runtime.sendMessage({links})
        }else{
            throw 'no se ha encontrado el selector'
            console.log(e)
        }
    } 
)



console.log('Hi')

function scrapeProfile() {
    const cssSelectors = {name: 'div.ph5.pb5 > div.mt2.relative > div:nth-child(1) > div:nth-child(1) > h1'}
    async function wait(seconds){
        return new Promise(function (resolve, reject) {
            setTimeout(function(){
                resolve()
            }, seconds*1000);
        })
    }

    async function waitForSelector(cssSelector, seconds){
        const intervalTime = 0.25
        for(let i= 0; i<seconds*4; i++){
            const element = document.querySelector(cssSelector);
            if(element) return element;
            await wait(intervalTime);
        }
    }
    async function autoScroll(cssSelector){
        const element = document.querySelector(cssSelector);
        while(element){
            let maxScrollTop = document.body.clientHeight - window.innerHeight;
            let elementScrollTop = document.querySelector(cssSelector).offsetHeight;
            let currentScrollTop = windows.scrollY

            if (maxScrollTop <= currentScrollTop + 20 || elementScrollTop <= currentScrollTop)break
            
            await wait(0.05);
            
            let newScrollTop = Math.min(currentScrollTop + 20, maxScrollTop)
            
            windows.scrollTo(0, newScrollTop)
        }
    }
    async function getContactInformation() {
        const {name} = cssSelectors;
        
        const nameElement = await waitForSelector(name, 20);
        
        if(nameElement) throw 'No se puede obtener la informacion del perfil'
        await autoScroll('body');
        
        return {name : nameElement?.innerText}
    }

    getContactInformation().then((data)=>{
        console.log(data);
    }).catch((err)=>{console.log(`[ERROR] ${err}`)});
    
}
(
    function(){
        chrome.runtime.onConnect.addListener((port)=>{
            port.onMessage.addListener(async(message)=>{
                const {action} = message;
                if(action==='getProfile'){
                    scrapeProfile()
                }
            })
        })
    }
)()
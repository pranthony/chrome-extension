
let perfiles = []
let links;
let urls = {
    search: 'https://www.linkedin.com/search/results/people/?keywords=', 
    page: '&page='
}
let c;
let maxTab;
let keyword;
let i= 0;
chrome.runtime.onMessage.addListener(async(request, t)=>{
    if (request.pages) {
        keyword = request.input
        maxTab = request.pages
        c=0;
        links = []
    }
        
    if(c<=maxTab){
        
        chrome.tabs.query({active: true, currentWindow: true})
        .then(async(tabs)=>{
            const [tab] = await tabs;
            const currentTab = await tab.id;
            const {search} = urls;
            const {page} = urls;
            await chrome.tabs.update(currentTab, {url: `${search}${keyword}${page}${++c}`}).then(async()=>{
                await scrapear(currentTab, 'content.js').catch((err)=>{
                    console.log(err)
                });
                if(request.links){
                    links = [...links, ...request.links]
                    console.log(links);
                }
            })
        })
    }else{

        let element = links[i++];
        if(element){
            chrome.tabs.query({active: true, currentWindow: true})
            .then(async(tabs)=>{
                const [tab] = await tabs;
                const currentProfile = await tab.id;
                await chrome.tabs.update(currentProfile, {url: `${element}`}).then(async()=>{
                    await scrapear(currentProfile, 'script.js').catch((err)=>{
                        console.log(err)
                    });
                    if (request.data){
                        console.log(request.data)
                        perfiles.push(request.data)
                    }
                    
                })
            })
        }else{
            console.log(perfiles)
        }
    }
})
async function scrapear(currentTab, file){
    setTimeout(()=>{    
        chrome.scripting.executeScript({
            target: {tabId: currentTab},
            files: [file]
        })
    }, 5000)
}

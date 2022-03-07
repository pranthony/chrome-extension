let tabSelected = null;
let perfil = [];
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    const {action}  = request;
    
    if(action === 'lnkS-getProfile'){
        chrome.tabs.query({active: true, currentWindows: true}).then((tabs)=>{
            const [tab] = tabs;
            tabSelected = tab.id;
            chrome.tabs.update(tab.id, {url: 'https://www.linkedin.com/in/pamela-vital/'}).then((data)=>{
                sendResponse({message:'Ok'})
            })
        })
    }
    return true;
})

chrome.tabs.onUpdate.addListener(function(tabId, changeInfo, tab){
    if (tabId == tabSelected){
        if(changeInfo.status== 'complete'){
            scrapingProfile()
            tabSelected = null;
        }
    }
})

async function scrollingProfile(){
    const [tab] = await chrome.tabs.query({active:true, currentWindows: true})
    const port = chrome.tabs.connect(tab.id)
    port.postMessage({action: 'getProfile'})
}
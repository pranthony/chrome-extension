chrome.commands.onCommand.addListener(command => {
    // command will be "flip-tabs-forward" or "flip-tabs-backwards"
    chrome.tabs.query({currentWindow: true}, tabs => {
      // Sort tabs according to their index in the window.
      tabs.sort((a, b) => a.index - b.index);
      const activeIndex = tabs.findIndex((tab) => tab.active);
      const lastTab = tabs.length - 1;
      let newIndex = -1;
      if (command === 'flip-tabs-backwards') {
        newIndex = activeIndex === 0 ? lastTab : activeIndex - 1;
      }else if(command === 'flip-tabs-forward'){
        newIndex = activeIndex === lastTab ? 0 : activeIndex + 1;
      }else if(command === 'flip-all-tabs'){
        newIndex = lastTab;
      }else {
        newIndex = 0;
      }
      chrome.tabs.update(tabs[newIndex].id, {active: true});
      
    });
});
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content.js']
  });
});


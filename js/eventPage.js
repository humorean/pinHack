chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo=="showPageAction"){
        //retrieves all the tabs and in current window
        chrome.tabs.query({
            active : true,
            currentWindow : true,
        },function(tabs){
            chrome.pageAction.show(tabs[0].id);
        })
    }
})

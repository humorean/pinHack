chrome.runtime.sendMessage({
    todo : "showPageAction"
});

// chrome.storage.sync.get(['endOgPage'], function(result) {
//     console.log('Value currently is ' + result.bodyHeight);
// });

//Add message listener when message is received from popup.js script
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    
    let documentHeight = document.body.scrollHeight;
    // console.log('you are in the message listener');
    // console.log(`This is request Object: ${request}`);
    // console.log(`This is request.todo Object: ${request.todo}`);
    if(request.todo == "scroll"){//&& check if documentHeight>=request.incr
        // console.log(`This is request Object after you ensured scoll: ${request}`);
        scrolling(request.incr, request.incrSm);
    }
})
  
let yPosition = 0; //keeps track of y position, if this >= document.body height then change endOfPage in chrome.storage and reset yPosition

//scrolling will take scrollIncrement from request.incr
function scrolling(yIncrement, yIncrementSmall){
    let bodyHeight = document.body.scrollHeight
    // console.log(`Initial yPos: ${yPosition}`);
    // console.log(`yIncrement: ${yIncrement}`);
    // console.log(`yIncrementSmall: ${yIncrementSmall}`);
    yPosition += bodyHeight-yPosition<1000?yIncrementSmall:yIncrement;

    console.log(`You are in content scrolling and bodyHeight is ${bodyHeight}`);
    console.log(`You are in content scrolling and yPosition is ${yPosition}`);

    window.scrollTo(0, yPosition);

    if(yPosition>=bodyHeight){
        // yPosition = 0; //Reset yPosition
        // window.scrollTo(0, yPosition); //scroll to top Position
        var endOfPageStatus = 0;
        chrome.storage.local.get(['endOfPage'],function(results){
            console.log('your endOfPageStatus is now ' + results.endOfPage)
            endOfPageStatus = results.endOfPage;
            if(endOfPageStatus == 0 || null){
                chrome.storage.local.set({endOfPage: 1}, function() {
                    console.log('Set endOfPage to 1 because it was zero');
                });
            }else if(endOfPageStatus ==1){
                chrome.storage.local.set({endOfPage: 0}, function() {
                    console.log('Set endOfPage to 0 because it was 1');
                });
            }
        });
    }
}



// popup will listen for change of Chrome storage body height
// set Chrome storage body height only when DOM body height reached its max. => y coordinate == DOM body height
// popup has interval and every second it will increate y coordinate to DOM, pass in as request.yIncrement

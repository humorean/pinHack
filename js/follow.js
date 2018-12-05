
var followBtn = document.querySelector('.followBtn');

//When changes made, clear interval
chrome.storage.onChanged.addListener(function(changes, namespace){
    if(changes){
        // alert('reached end of page');
        // clearInterval(scrollInterval);
    }
});


function toggle(element,action,stop){
    if(element.innerText == action){
        element.innerText = stop;
        return action;
    }else if(element.innerText == stop){
        element.innerText = action;
        return stop;
    }
}


// chrome middleware here:
function chromeFollow(){
    // console.log(increment);
    //increment determines how many pixels to scroll down
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
    function(tabs){
        //{todo: "scroll"} is the request object to the content.js page
        chrome.tabs.sendMessage(tabs[0].id,{
            todo: "follow"
        })
    })
}

//every setinterval runs, this will increase by 1;

followBtn.addEventListener("click",function(){
    // let scrollStopStatus = toggle(followBtn,"Follow","Stop");
    // //interval set here:
    // if(scrollStopStatus=='stop'){
    //     clearInterval(scrollInterval);
    // }else if(scrollStopStatus == 'scroll'){
    //     // interval[intervalCount] +=1;
    //     scrollInterval = setInterval(function(){
    //         chromeLogic(intervalConfig.intervalCount,intervalConfig.intervalPixelIncrement,intervalConfig.intervalPixelIncrementSmall);
    //     },intervalConfig.intervalTime);
    // }    
});


var color = "red";

var scrollBtn = document.querySelector('.scrollBtn');
var stopBtn = document.querySelector('.stopBtn');
var testBtn = document.querySelector('.testBtn');

//TEST AREA

//END TEST AREA

//When changes made, clear interval
chrome.storage.onChanged.addListener(function(changes, namespace){
    if(changes){
        alert('reached the end of page ')
        clearInterval(scrollInterval);
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
function chromeLogic(intervalCount, yIncrement, yIncrememntSmall, totalScrolled){
    // console.log(increment);
    //increment determines how many pixels to scroll down
    chrome.tabs.query({
        active: true,
        currentWindow: true
    },
    function(tabs){
        //{todo: "scroll"} is the request object to the content.js page
        chrome.tabs.sendMessage(tabs[0].id,{
            todo: "scroll",
            incr: yIncrement,
            incrSm: yIncrememntSmall,
            intervalCount: intervalCount
        })
    })
}

let scrollInterval='';

//every setinterval runs, this will increase by 1;
var intervalConfig = {
    intervalCount : 0,
    intervalTime : 50,
    intervalPixelIncrement : 100, //Static, use this to scroll fast, until reach close to the end but still waitint to load then use the small 
    intervalPixelIncrementSmall : 5 //Static, use this when we are closed to the end but still waiting to load
}

scrollBtn.addEventListener("click",function(){
    let scrollStopStatus = toggle(scrollBtn, "Scroll", "Stop");
    //interval set here:
    if(scrollStopStatus=='Stop'){
        clearInterval(scrollInterval);
    }else if(scrollStopStatus == 'Scroll'){
        // interval[intervalCount] +=1;
        scrollInterval = setInterval(function(){
            chromeLogic(intervalConfig.intervalCount,intervalConfig.intervalPixelIncrement,intervalConfig.intervalPixelIncrementSmall);
        },intervalConfig.intervalTime);
    }    
});


let yInterval =0;
function scrollLogic(){
    window.scrollTo(0, yInterval);
    let yIntervalIncrement = document.body.scrollHeight-yInterval<1000?5:100
    yInterval += yIntervalIncrement;
    console.log(`yIntervalTotal: ${yInterval} <br> Window document Height is: ${document.body.scrollHeight}`);
    if(yInterval>document.body.scrollHeight){
        console.log("Reached the end of the page bottom, now scroll to top");
        clearInterval(scrolling);
        window.scrollTo(500,0);
    }
}

scroll();


let scrolling ='';


let stopBtn = document.querySelector('.stopBtn');
let scrollBtn = document.querySelector('.scrollBtn');

scrollBtn.addEventListener('click',function(){
    scrolling = setInterval(function(){
        scrollLogic();
    },50);
})

stopBtn.addEventListener('click',function(){
    clearInterval(scrolling);
})


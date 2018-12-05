// This will work for Instagram and Twitter scroll to the end

let yInterval = 0; 

//For every 10 miliseconds we want to scroll down 10
let scrolling = setInterval(function(){
                    window.scrollTo(0, yInterval);
                    let yIntervalIncrement = document.body.scrollHeight-yInterval<1000?5:100
                    yInterval += yIntervalIncrement;
                    console.log(`yIntervalTotal: ${yInterval} <br> Window document Height is: ${document.body.scrollHeight}`);
                    if(yInterval>document.body.scrollHeight){
                        console.log("Reached the end of the page bottom, now scroll to top");
                        clearInterval(scrolling);
                        window.scrollTo(500,0);
                    }
                },20)

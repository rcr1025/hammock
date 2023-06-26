/*
js code for thank you page. Page includes a countdown that directs user to homepage when it hits 0
 */


const startingSeconds = 4;  //countdown starts 1 second under proper number
let time = startingSeconds;

const countdownElement = document.getElementById('countdown');

// Repeats updateCountdown every second
setInterval(updateCountdown, 1000);

// Updates countdown and redirects user to home page when finished
function updateCountdown(){

    // redirects user to home page when countdown hits 0
    if( time === 0) window.location.replace("home-page.html")

    //updates text to reflect current time
    countdownElement.innerHTML = `Redirecting to home page ${time}`;

    //subtract time by 1
    time--;
}
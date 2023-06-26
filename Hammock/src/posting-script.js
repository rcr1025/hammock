
/* This is the script page for our posting-page.html. This page adds the logic to get the different forms to transition to each other.
   This page also contains the script to take the information a property owner puts in about their property and posts it to the sites database for rent.
 */

// gets the elements for all 6 forms and stores them into variables
var Form1 = document.getElementById("Form1");
var Form2 = document.getElementById("Form2");
var Form3 = document.getElementById("Form3");
var Form4 = document.getElementById("Form4");
var Form5 = document.getElementById("Form5");
var Form6 = document.getElementById("Form6");

// gets all the 'next' buttons for the forms and stores them into variables
var Next1 = document.getElementById("Next1");
var Next2 = document.getElementById("Next2");
var Next3 = document.getElementById("Next3");
var Next4 = document.getElementById("Next4");
var Next5 = document.getElementById("Next5");

// gets all the 'back' buttons for the forms and stores them into variables
var Back1 = document.getElementById("Back1");
var Back2 = document.getElementById("Back2");
var Back3 = document.getElementById("Back3");
var Back4 = document.getElementById("Back4");
var Back5 = document.getElementById("Back5");

var progress = document.getElementById("progress");

// creates the form data object that will be used to send all the information about the property to the server
const formData = new FormData();

// take information from form 1, adds it to the formData object, and progresses to the next form
Next1.onclick = function (){
    Form1.style.left = "-450px";
    Form2.style.left = "40px";
    progress.style.width = "120px";
    formData.set('title', document.getElementById('prop-title').value);
    formData.set('type', document.getElementById('prop-type').value);
    formData.set('location', document.getElementById('prop-location').value);
}
Back1.onclick = function (){
    Form1.style.left = "40px";
    Form2.style.left = "450px";
    progress.style.width = "60px";
}

// take information from form 2, adds it to the formData object, and progresses to the next form
Next2.onclick = function (){
    Form2.style.left = "-450px";
    Form3.style.left = "40px";
    progress.style.width = "180px";
    formData.set('guests', document.getElementById('cnt-guest').innerText);
    formData.set('beds', document.getElementById('cnt-bed').innerText);
    formData.set('baths', document.getElementById('cnt-bath').innerText);
}
Back2.onclick = function (){
    Form2.style.left = "40px";
    Form3.style.left = "450px";
    progress.style.width = "120px";
}

// take information from form 3, adds it to the formData object, and progresses to the next form
Next3.onclick = function (){
    Form3.style.left = "-450px";
    Form4.style.left = "40px";
    progress.style.width = "240px";
    // bit of logic to get only the checked checkboxes from the amenities section so they can be added to the formData
    let amenities = [];
    let checkboxes = document.getElementsByName('amenities[]');
    // takes each object in the checkbox array with the 'checked' value, and adds them to an array of 'checked checkboxes'
    for(let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
            amenities.push(checkboxes[i].value);
        }
    }
    formData.set('amenities',amenities.toString());
}
Back3.onclick = function (){
    Form3.style.left = "40px";
    Form4.style.left = "450px";
    progress.style.width = "180px";
}

// take information from form 4, adds it to the formData object, and progresses to the next form
Next4.onclick = function (){
    Form4.style.left = "-450px";
    Form5.style.left = "40px";
    progress.style.width = "300px";
    // we had intended to add in logic to properly upload images to the website for use later, but had to cut this feature due to time
    // the form automatically adds a generic photo to the property data instead
    formData.set('main_photo', "villa-main");
    formData.set('side_photo',"villa-main");
}
Back4.onclick = function (){
    Form4.style.left = "40px";
    Form5.style.left = "450px";
    progress.style.width = "240px";
}

// take information from form 5, adds it to the formData object, and progresses to the next form
Next5.onclick = function (){
    Form5.style.left = "-450px";
    Form6.style.left = "40px";
    progress.style.width = "360px";
    formData.set('description', document.getElementById('prop-description').value);
}
Back5.onclick = function (){
    Form5.style.left = "40px";
    Form6.style.left = "450px";
    progress.style.width = "300px";
}
// take information from form 6, adds it to the formData object, then takes the now complete formData object and POSTs its data to the database through our HammockAPI
Form6.addEventListener('submit', e => {
    e.preventDefault();
    formData.set("price", document.getElementById("prop-price").value);
    formData.set("email", document.getElementById("prop-email").value);
   // converts the formData object into a JSON object so that we can post it to the database
    const object = {};
    formData.forEach((value,key) => object[key] = value);
    const json = JSON.stringify(object);
    console.log(json);

    // FetchAPI takes the form information and sends it along to our HammockAPI, which then posts the data to the database, the user is then directed to property-dashboard.html
    fetch('http://localhost:8080/api/properties/',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: json,
    })
        .then(res => res.text())
        .then(text => {
            console.log(text);
            window.location.href = 'property-dashboard.html';
        })
        .catch(err => console.log(err))
})


function guestClick(click){
    const totalClicks = document.getElementById('cnt-guest');
    const sumvalue = parseInt(totalClicks.innerText) + click;
    console.log(sumvalue + click);
    totalClicks.innerText = sumvalue;
    if(sumvalue < 0){
        totalClicks.innerText = 0;
    }
}

function bedClick(click){
    const totalClicks = document.getElementById('cnt-bed');
    const sumvalue = parseInt(totalClicks.innerText) + click;
    console.log(sumvalue + click);
    totalClicks.innerText = sumvalue;
    if(sumvalue < 0){
        totalClicks.innerText = 0;
    }
}
function bathClick(click){
    const totalClicks = document.getElementById('cnt-bath');
    const sumvalue = parseFloat(totalClicks.innerText) + click;
    console.log(sumvalue + click);
    totalClicks.innerText = sumvalue;
    if(sumvalue < 0){
        totalClicks.innerText = 0;
    }
}
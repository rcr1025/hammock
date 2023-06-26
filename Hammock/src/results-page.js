/**
 * Script for the Results Page. This class handles all the logic related to displaying the search results of a renter searching
 * for a property, including building and displaying property cards (container for each individual property), connecting to the
 * backend API, and searching or filtering by location, price, property type, number of guests, or amenities.
 *
 */


// Search terms from Search Page, via browser localStorage
let inputLocation  = localStorage.getItem('location');
let inputStartDate = localStorage.getItem('start-date');
let inputEndDate   = localStorage.getItem('end-date');
let inputGuests    = localStorage.getItem('guests');

// Define search bar HTML elements
const srchBarLocation  = document.getElementById("srch-bar-location");
const srchBarStartDate = document.getElementById("srch-bar-start-date");
const srchBarEndDate   = document.getElementById("srch-bar-end-date");
const srchBarGuests    = document.getElementById("srch-bar-guests");
const srchBarButton    = document.getElementById("srch-bar-submit");

// Fill in value of search bar elements so search data carries over from Search Page
srchBarLocation.value = inputLocation;
srchBarStartDate.value = inputStartDate;
srchBarEndDate.value = inputEndDate;
srchBarGuests.value = inputGuests;

// URL initializes Results page with properties of the type inputLocation (used in fetch call below)
let locationFetchURL = 'http://localhost:8080/api/properties/?location=' + inputLocation;

// Function for top search bar, takes values for new search and updates URL
srchBarButton.addEventListener("click", ()=>{
    localStorage.setItem('location', srchBarLocation.value);
    localStorage.setItem('start-date', srchBarStartDate.value);
    localStorage.setItem('end-date', srchBarEndDate.value);
    localStorage.setItem('guests', srchBarGuests.value);
    locationFetchURL = 'http://localhost:8080/api/properties/?location=' + srchBarLocation.value;
});


// calls the API using the URL and fills in results page with returned properties
fetch(locationFetchURL)
    .then( res => res.json())
    .then( data => buildCards(data))

// builds template using property data received from FetchAPI call
function propertyTemplate(property){
    return `
        <div class="card" onclick="passData(${property.id})">
            <div class="card-image" style="background-image: url('Main1.JPG')"></div>
            <h2>${property.title}</h2>
            <p>${property.guests} guests - ${property.beds} bedrooms - ${property.baths} baths</p>
            <h3 class="price">${property.price}</h3>
        </div>
    `
}

// takes properties returned from search and builds a property card for each of them
function buildCards(propData) {
    document.getElementById("card-container").innerHTML = `
    <h1 id="heading">Results for stays in ${inputLocation}</h1>
    ${propData.map(propertyTemplate).join('')} 
`
}

// function that passes the property id of the property clicked on to the property-detailed page so that it knows which property to use to fill in template literal
function passData(propID){
    window.location.href = 'property-detailed.html' + '#' + propID;
}



/**
 *  Below are all functions and variables for the left-hand side filter bar
 */
// HTML elements for price slider filter
const rangeInput = document.querySelectorAll(".range-input input"),
      priceInput = document.querySelectorAll(".price-input input"),
      progress = document.querySelector(".slider .progress");

// HTML elements for # of guests filter
const adultPlus = document.getElementById("adult-plus"),
    adultMinus = document.getElementById("adult-minus"),
    adultNum = document.getElementById("adult-num"),
    childrenPlus = document.getElementById("children-plus"),
    childrenMinus = document.getElementById("children-minus"),
    childrenNum = document.getElementById("children-num");


// function for price slider filter (called in rangeInput.forEach function below
function filterSearchPrice(min, max) {

    // builds a string as comma separated list ("minimum-price,maximum-price") parsed by the API via fetch
    let queryString = min + "," + max;
    console.log(queryString);

    fetch('http://localhost:8080/api/properties?price=' + queryString)
        .then( res => res.json())
        .then( data => buildCards(data))
}

// Function for property type filter (called by onClick attribute in checkbox HTML)
function filterSearchType () {

    let urlString = "";
    let checkedFilters = document.querySelectorAll("input[class='checkbox-type']:checked"); // builds an array

    // builds a string of property types structured as a comma separated list
    checkedFilters.forEach(function(checkbox) {
        if (checkbox.value.length !== 0 ){
            urlString += checkbox.value + ","
        }
    });
    console.log("Filter by: " + urlString);

    fetch('http://localhost:8080/api/properties?type=' + urlString)
        .then( res => res.json())
        .then( data => buildCards(data))
}

// Function for amenities filter (called by onClick attribute in checkbox HTML)
function filterSearchAmenities () {

    let urlString = "";
    let checkedFilters = document.querySelectorAll("input[class='checkbox-amen']:checked"); // builds an array

    // builds a string of amenities structured as a comma separated list
    checkedFilters.forEach(function(checkbox) {
        if (checkbox.value.length !== 0 ){
            urlString += checkbox.value + ","
        }
    });
    console.log("Filter by: " + urlString);

    fetch('http://localhost:8080/api/properties?amenities=' + urlString)
        .then( res => res.json())
        .then( data => buildCards(data))
}

// Guest counter Buttons
let a = 0,
    c = 0;

function filterSearchGuests () {
    let totalGuests = parseInt(a) + parseInt(c);

    fetch('http://localhost:8080/api/properties?guests=' + totalGuests)
        .then( res => res.json())
        .then( data => buildCards(data))
}

adultPlus.addEventListener("click", ()=>{
    a++;
    a = (a<10) ? "0" + a : a;
    adultNum.innerText=a;
    filterSearchGuests();
});

adultMinus.addEventListener("click", ()=>{
    if(a>0){
        a--;
        a = (a<10) ? "0" + a : a;
        adultNum.innerText=a;
    }
    filterSearchGuests();
});

childrenPlus.addEventListener("click", ()=>{
    c++;
    c = (c<10) ? "0" + c : c;
    childrenNum.innerText=c;
    filterSearchGuests();
});

childrenMinus.addEventListener("click", ()=>{
    if(c>0){
        c--;
        c = (c<10) ? "0" + c : c;
        childrenNum.innerText=c;
    }
    filterSearchGuests();
});


// Function for price slider filter
let priceGap = 100;
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        // getting two input values and parsing them to a number
        let minVal = parseInt(priceInput[0].value),
            maxVal = parseInt(priceInput[1].value);

        if((maxVal - minVal >= priceGap) && maxVal <=10000){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }else{
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        }
    });
})

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        // getting two range values and parsing them to a number
        let minVal = parseInt(rangeInput[0].value),
            maxVal = parseInt(rangeInput[1].value);

        if(maxVal - minVal < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            }else{
                rangeInput[1].value = minVal + priceGap;
            }

        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
        // function call passes in min and max prices and passes to API search filter function
        filterSearchPrice(rangeInput[0].value, rangeInput[1].value);
    });
})
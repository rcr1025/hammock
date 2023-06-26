/**
 * Script for the Search Page; a majority of the logic is handled in the Search button click function which takes all search
 * parameters, performs error checking, and stores search data in the browser's localStorage to pass into the Results Page.
 * Executing a search navigates the user to the Results Page
 */

// HTML elements for search-page (input fields and search button)
const searchButton = document.querySelector(".search-btn")
const searchInputLocation = document.getElementById("text-input-location");
const searchInputStartDate = document.getElementById("start-date");
const searchInputEndDate = document.getElementById("end-date");
const searchInputGuests = document.getElementById("guests");


// Click function for main search button
// Function takes all search terms, checks for errors, stores them in browser's localStorage, then navigates to results-page
$(searchButton).click(function () {
    event.preventDefault();

    // Get values from HTML form
    let inputLocation = searchInputLocation.value;
    let inputStartDate = searchInputStartDate.value;
    let inputEndDate = searchInputEndDate.value;
    let inputGuests = searchInputGuests.value;

    // For console logging
    fetchSearchResults()
        .then(response => {
            console.log("Fetching search results for " + inputLocation);
        });
    async function fetchSearchResults() {
        const response = await fetch('http://localhost:8080/api/properties' + "?location=" + inputLocation);
    }

    // Set key-values in browser's localStorage so search term data can pass into the Results page
    localStorage.setItem('location', inputLocation);
    localStorage.setItem('start-date', inputStartDate);
    localStorage.setItem('end-date', inputEndDate);
    localStorage.setItem('guests', inputGuests);


    // Error handling for searches: location cannot be empty, and the end date cannot be prior to the start date
    if(inputLocation === "" || dateCompare(inputEndDate, inputStartDate)) {
        if (inputLocation === "") {
            document.getElementById("form-location").style.borderColor = "#eb4034";
            document.getElementById("form-location").style.borderWidth = "2px";
            alert("Location cannot be empty");
        }
        if (dateCompare(inputEndDate, inputStartDate)) {
            console.log("Dates are incorrect")
            document.getElementById("form-dates").style.borderColor = "#eb4034";
            document.getElementById("form-location").style.borderColor = "#309ca0";
            document.getElementById("form-location").style.borderWidth = "1px";
            document.getElementById("form-dates").style.borderWidth = "2px";
            alert("Date range must be valid");
        }
    }
    else {
        window.location.href = 'results-page.html';
    }
})

/**
 * Compares two date to determine their relativity
 * @param date1 A string in the format 'MM/DD/YYYY'
 * @param date2 A string in the format 'MM/DD/YYYY'
 * @returns {boolean} returns TRUE if the second date comes before (is prior to) the first date
 */
function dateCompare(date1, date2) {
    return new Date(date2) > new Date(date1);
}



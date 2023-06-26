
/* This is the script page for our booking-page.html. It holds the logic for building out the dynamic html for the page, along with the script to make the modal functional.

 */

// takes the id of the proeprty being opened from the url and uses it to create the proper HTTP address for said property
var propID = window.location.hash.substring(1)
var fetchURL = 'http://localhost:8080/api/properties/' + propID;

// a call to the Fetch API using the URL created above to get the data for the property with the id sent from the property-detailed.html page
// the data is then converted into a usable javascript object and our propertyTemplate function is called with said property data as the argument
fetch(fetchURL)
    .then( res => res.json())
    .then( data => propertyTemplate(data));

/**
 * The function uses the property data to build out a template literal containing all of the dynamic html for the page.
 * This includes filling in the information about the property along with carrying over the data to the booking page modal pop-up.
 * @param property the javascript object containing all the information about the property being looked at
 */
function propertyTemplate(property){
    // variables holding the cost of a per night stay and the total cost of a stay with the fees added, to be used in the template
    const pricePer = property.price * 5;
    const totalCost = pricePer + 100 + 75 + 105;
    // building out a template literal for the dialogue box with all the information about the property and the cost of the stay
    document.getElementById("boxed").innerHTML = `
    <div class="box-top">
                <img src="../images/${property.main_photo}.jpg" alt="house pic" >
                <div class="top-text">
                    <header>
                        <p style="font-size: 16px;font-weight: 400;">${property.title} (${property.location})</p>
                        <p style="font-size: 12px;color: rgba(0,0,0,0.5);">${property.guests} Guests-${property.beds} Beds-${property.baths} Bath</p>
                    </header>

                </div>
            </div>
            <hr/>
            <h2>Cost Details</h2>
            <div class="box-body">
                <div class="box-body-left">
                        <p>$${property.price} x 5 nights </p>
                        <p>Cleaning Fee</p>
                        <p>Service Fee </p>
                        <p>Occupancy Fee </p>
                    </div>
                <div class="box-body-right">
                        <p>$${pricePer}</p>
                        <p>$100.00</p>
                        <p>$75.00 </p>
                        <p>$105.00 </p>
                    </div>
            </div>
            <hr/>
            <div style="display: flex;justify-content: space-between;">
                <p style="font-weight: 600;"> Total(USD)</p>
                <p>$${totalCost}</p>
            </div>
    `
    // building out the template literal for the modal pop-up with the email of the property owner included in the API call to our email service
    // the email service API takes the user's entered email and sends the user's message to the property owner's email
    document.getElementById("modal-body").innerHTML = `
        <label style="padding-left: 10px; display: block">Tell the property owner a little bit about yourself and coordinate payment.</label>

            <form action="https://formsubmit.co/${property.email}" method="POST">

                    <div class="modal-form modal-email">
                        <label>Email</label><br>
                        <input type="email" name="email" required>
                    </div>
                    <div class="modal-form modal-subject">
                        <label>Subject</label><br>
                        <input type="text" name="_subject">
                    </div>
                    <div class="modal-form modal-body">
                        <label>Body</label><br>
                        <input type="text" name="message">
                    </div>

                    <input type="hidden" name="_captcha" value="false">
                    <button type="submit">Send</button><br>

            </form>
    `
}

// the functions calls to open and close the modal and to active the modal overlay
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

// function call to open the modal when the user clicks on the "confirm and book" button
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

// function call to activate the overlay when the modal opens
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

// function call to close the modal when the user clicks outside of the modal or clicks the "X" button
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    } )
})

// opens the modal by adding the class 'active' to the modal div
function openModal(modal){
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

// closes the modal by removing the class 'active' to the modal div
function closeModal(modal){
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
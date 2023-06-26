const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const togglePassword = document.querySelector("#togglePassword")
const password = document.querySelector("#password")
const togglePassword2 = document.querySelector("#togglePassword2")
const password2 = document.querySelector("#password2")
const indicator = document.querySelector(".indicator");
const input = document.querySelector("#password");
const weak = document.querySelector(".weak");
const medium = document.querySelector(".medium");
const strong = document.querySelector(".strong");
const text = document.querySelector(".text");
const overlay = document.getElementById('overlay')


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})
overlay.addEventListener('click',() =>{
    const modals = document.querySelector('.modal.active')
        modals.forEach(modal =>{
            closeModal(modal)
        })
})
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}
function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}
//for password on modal
togglePassword.addEventListener("click",function () {
    //toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

   //toggle the icon
   this.classList.toggle("by-eye");
});

//for confirm password on modal
togglePassword2.addEventListener("click",function () {
    //toggle the type attribute
    const type = password2.getAttribute("type") === "password" ? "text" : "password";
    password2.setAttribute("type", type);

    //toggle the icon
    this.classList.toggle("by-eye");
});

    //no way of testing this, ill check later
   const form = document.querySelector("#form2");
   form.addEventListener('submit',function (e){
       e.preventDefault();
});
let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@#$%^&*?_~,-,()]/;
function trigger(){
    if(input.value != ""){
        indicator.style.display = "block";
        indicator.style.display = "flex";
        if(input.value.length <= 3 && (input.value.match(regExpWeak) || input.value.match(regExpMedium) || input.value.match(regExpStrong)))no=1;
        if(input.value.length >= 6 && ((input.value.match(regExpWeak) && input.value.match(regExpMedium)) || (input.value.match(regExpMedium) && input.value.match(regExpStrong)) || (input.value.match(regExpWeak) && input.value.match(regExpStrong))))no=2;
        if(input.value.length >= 6 && input.value.match(regExpWeak) && input.value.match(regExpMedium) && input.value.match(regExpStrong))no=3;
        if(no==1){
            weak.classList.add("active");
            text.style.display = "block";
            text.textContent = "Your password is weak";
            text.classList.add("weak");
        }
        if(no==2){
            medium.classList.add("active");
            text.textContent = "Your password is medium";
            text.classList.add("medium");
        }else{
            medium.classList.remove("active");
            text.classList.remove("medium");
        }
        if(no==3){
            weak.classList.add("active");
            medium.classList.add("active");
            strong.classList.add("active");
            text.textContent = "Your password is strong";
            text.classList.add("strong");
        }else{
            strong.classList.remove("active");
            text.classList.remove("strong");
        }


    }else{
        indicator.style.display = "none";
        text.style.display = "none";

    }
}
document.addEventListener("DOMContentLoaded", function() {
    const dateModel = document.getElementById("dateModel");
    const dateInput = document.getElementById("dateInput");
    const confirmDate = document.getElementById("confirmDate");
    const checkBtn = document.getElementById("checkBtn");
    const errorText = document.getElementById("errorText");


    checkBtn.addEventListener("click", function() {
        const today = new Date();
        const todayFormatted = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;


        const userInput = dateInput.value;


        if (userInput == todayFormatted) {
            errorText.textContent = "Correct! And today is also your birthday!!"
            errorText.style.color = "green";
            window.location.href = "slides.html";
        } else {
            errorText.textContent = "Please enter today's date in DD-MM-YYYY format (hyphen separated).";
            errorText.style.color = "red";
        }
       
    });
});

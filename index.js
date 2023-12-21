const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formContainer = document.querySelector(".form-container"),
formCloseBtn = document.querySelector(".mb-4"),
signUpBtn = document.querySelector("#signup"),
loginBtn = document.querySelector("#login");

function openBtn() {
    const i = document.getElementById("home");

    if (i.style.display === "block") {
        i.style.display="none";
    } else {
        i.style.display="block";
        loginBtn.addEventListener("click",(e) =>  {
            e.preventDefault();
            formContainer.classList.remove("active");
        });
        
        signUpBtn.addEventListener("click",(e) =>  {
            e.preventDefault();
            formContainer.classList.add("active");
        });
    }
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
    $("#image").att('src', profile.getImageUrl());
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        alert("You've been signed out successfully.");
        $(".g-signin2").css("display", "block");
        $(".data").css("display", "none");
    })
}
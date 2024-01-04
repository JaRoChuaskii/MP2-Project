document.addEventListener('DOMContentLoaded', function () {
  const formOpenBtn = document.querySelector("#form-open"),
  registerData = document.querySelector("#onRegister"),
  loginData = document.querySelector("#onLogin"),
  home = document.querySelector("#home"),
  formContainer = document.querySelector(".form-container"),
  signUpBtn = document.querySelector("#signup"),
  logoutBtn = document.querySelector("#logout"),
  openPanel = document.querySelector("#dropdownMenuButtonLight");
  loginBtn = document.querySelector("#login");

  var password=document.getElementById("floatingPwd");
  var confirmpwd=document.getElementById("floatingCPassword");

  var length = document.getElementById("length");
  var matchAlert = document.getElementById("matchAlert");
  var dupAlert = document.getElementById("dupAlert");

  var f = document.forms["regForm"].elements;

  // Check if user is already logged in
  const loginName = localStorage.getItem('fname');
  if (loginName) {
    showLoggedInState(loginName);
  }

  formOpenBtn.addEventListener('click', function () {

      if (home.style.display === "block") {
          home.style.display="none";
      } else {
          home.style.display="block";
          loginBtn.addEventListener("click",(e) =>  {
              e.preventDefault();
              formContainer.classList.remove("active");
          });
          
          signUpBtn.addEventListener("click",(e) =>  {
              e.preventDefault();
              formContainer.classList.add("active");
          });
      }
  });

  // When the user clicks on the password field, show the message box
  password.onfocus = function() {
      document.getElementById("message").style.display = "block";
  }

  // When the user clicks outside of the password field, hide the message box
  password.onblur = function() {
      document.getElementById("message").style.display = "none";
  }

  // When the user starts to type something inside the password field
  password.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(password.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
  }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(password.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if(password.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate length
    if(password.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }

  // When the user starts to type something inside the confirm password field
  confirmpwd.onkeyup = function() {
      matchAlert.style.display = "block";

      if (confirmpwd.value.match(password.value)) {
          matchAlert.innerHTML = "Password is matched";
          matchAlert.classList.remove("invalid");
          matchAlert.classList.add("valid");
          document.getElementById('onRegister').disabled = false;
      } else {
          matchAlert.innerHTML = "Password is not matched";
          matchAlert.classList.remove("valid");
          matchAlert.classList.add("invalid");
          for (var i = 0; i < f.length; i++) {
            if (f[i].value.length == 0) cansubmit = false;
            document.getElementById('onRegister').disabled = true;
        }
      }
  }
  
  registerData.addEventListener('click', function () {
      let fname, lname, num, email, pass;
      
      fname=document.getElementById("floatingFname").value;
      lname=document.getElementById("floatingLname").value;
      num=document.getElementById("floatingNumber").value;
      email=document.getElementById("floatingEmail").value;
      pass=document.getElementById("floatingPwd").value;

      let user_records = new Array();
      user_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
      if (user_records.some((v) => {
          return v.email==email
      })) {
          dupAlert.innerHTML = "Email already exist. Please login!";
          dupAlert.style.display = "block";
      }else {
          user_records.push({
              "fname":fname,
              "lname":lname,
              "num":num,
              "email":email,
              "pass":pass
          })
          localStorage.setItem("users", JSON.stringify(user_records)); 
      }
  });

  loginData.addEventListener('click', function () {
      let email, passwords;
      email=document.getElementById("userEmail").value;
      passwords=document.getElementById("userPassword").value;

      let login_records = new Array();
      login_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
      if (login_records.some((v) => {
          return v.email==email && v.pass==passwords
      })) {
        let current_user=login_records.filter((v) => {
          return v.email==email && v.pass==passwords
        })[0]
        const loginName=current_user.fname;
        localStorage.setItem("userName", current_user.fname);
        localStorage.setItem("email", current_user.email);
        showLoggedInState(loginName);
      }else {
        alert("you are not logged in!");
      }
  });

  // Helper functions
  function showLoggedInState(loginName) {
    formContainer.style.display = "none";
    formOpenBtn.style.display = "none";
    openPanel.style.display = "block";
    openPanel.innerHTML = "Hi " + loginName;
  }

  // Logout functions
  logoutBtn.addEventListener('click', function() {
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    location.reload();
  });
  
});

document.addEventListener('DOMContentLoaded', function () {
	const formOpenBtn = document.querySelector("#form-open"),
	registerData = document.querySelector("#onRegister"),
	loginData = document.querySelector("#onLogin"),
	formContainer = document.querySelector(".form-container"),
	signUpBtn = document.querySelector("#signup"),
	logoutBtn = document.querySelector("#logout"),
	openPanel = document.querySelector("#dropdownMenuButtonLight"),
	loginBtn = document.querySelector("#login");

	var password=document.getElementById("floatingPwd");
	var confirmpwd=document.getElementById("floatingCPassword");

	var length = document.getElementById("length");
	var matchAlert = document.getElementById("matchAlert");
	var dupAlert = document.getElementById("dupAlert");

	var f = document.forms["regForm"].elements;

	let loginName, current_user, formattedAddress;


	loginBtn.addEventListener("click",(e) =>  {
		formContainer.classList.remove("active");
	});

	signUpBtn.addEventListener("click",(e) =>  {
		formContainer.classList.add("active");
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

	registerData.addEventListener('click', function (event) {
		
		let fname, lname, num, email, pass, address;

		fname=document.getElementById("floatingFname").value;
		lname=document.getElementById("floatingLname").value;
		num=document.getElementById("floatingNumber").value;
		email=document.getElementById("floatingEmail").value;
		pass=document.getElementById("floatingPwd").value;
		address=null;

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
			"pass":pass,
			"address":address
		})
		localStorage.setItem("users", JSON.stringify(user_records));
		window.location.reload();
		}
	});

	loginData.addEventListener('click', function (event) {
		

		let email, passwords;
		email=document.getElementById("userEmail").value;
		passwords=document.getElementById("userPassword").value;

		let login_records = new Array();
		login_records = JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
		if (login_records.some((v) => {
			return v.email==email && v.pass==passwords
			})) {
			current_user=login_records.filter((v) => {
			return v.email==email && v.pass==passwords 
			})[0]
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(onSuccess, onError);
			}else{
				alert("Browser doesn't support Geolocation API.");
			}
		}else {
			alert("you are not logged in!");
		}
	});

	function onSuccess(position) {
	let {latitude, longitude} = position.coords;
	//https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY
		fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&key=AIzaSyCF-np2mc0J1ur6NCQTQ7_YMNlSyD7VZLU')
		.then(response => response.json()).then(result => {
		formattedAddress = result.results[0].formatted_address;
		loginName=current_user.fname;
		current_user.address = formattedAddress;
		let loginLoc = current_user.address;
		localStorage.setItem("loggedIn", JSON.stringify(current_user));
		showLoggedInState(loginName, loginLoc);
		});
	}

	function onError(error) {
		if(error.code==1){
			alert("Request Denied!");
		}else if(error.code==2){
			alert("Location is not available!");
		}else{
			alert("Something went wrong!");
		}
	}

	// Check if the user is already logged in
	let storedUsername = new Array();
	storedUsername = JSON.parse(localStorage.getItem("loggedIn"))?JSON.parse(localStorage.getItem("loggedIn")):[]
	if (storedUsername.fname){
		const loginName=storedUsername.fname;
		const loginLoc=storedUsername.address;
		showLoggedInState(loginName, loginLoc);
	}

	// Helper functions
	function showLoggedInState(loginName, loginLoc) {
		console.log(loginLoc);
		formContainer.style.display = "none";
		formOpenBtn.style.display = "none";
		openPanel.style.display = "block";
		openPanel.innerHTML = "Hi " + loginName;
	}

	// Logout functions
	logoutBtn.addEventListener('click', function() {
		localStorage.removeItem("loggedIn");
		window.location.reload();
	});

});

let map;

var locate = document.getElementById("addressInput");

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 7.088079785342349, lng: 125.61169773054502},
	zoom: 15
	});
}

locate.onkeyup = function() {

	const address = document.getElementById('addressInput').value;
	const geocoder = new google.maps.Geocoder();

	geocoder.geocode({'address': address}, function(results, status) {
		if (status === 'OK') {
			map.setCenter(results[0].geometry.location);

			const marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location,
			zoom: 15
			});

			// You can customize the info window content here
			const infowindow = new google.maps.InfoWindow({
			content: '<strong>' + results[0].formatted_address + '</strong>'
			});

			marker.addListener('click', function() {
			infowindow.open(map, marker);
			});
		} else {
		}
	});
}
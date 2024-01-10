document.addEventListener('DOMContentLoaded', function () {
	const formOpenBtn = document.querySelector("#form-open"),
	registerData = document.querySelector("#onRegister"),
	loginData = document.querySelector("#onLogin"),
	formContainer = document.querySelector(".form-container"),
	signUpBtn = document.querySelector("#signup"),
	logoutBtn = document.querySelector("#logout"),
	openPanel = document.querySelector("#dropdownMenuButtonLight"),
	openMapModal = document.querySelector("#openMapModal"),
	locUpdate = document.querySelector("#onLocUpdate"),
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
		openMapModal.style.display = "block";
		openMapModal.innerHTML = "Your current location: " + loginLoc;
		document.getElementById("addressInput").setAttribute("value",loginLoc);
	}

	// Logout functions
	logoutBtn.addEventListener('click', function() {
		localStorage.removeItem("loggedIn");
		window.location.href = "index.html";
	});
	
	locUpdate.addEventListener('click', function() {
		let newAddress;
		newAddress = document.getElementById("addressInput").value;
		
		let storedUser = new Array();
		storedUser = JSON.parse(localStorage.getItem("loggedIn"))?JSON.parse(localStorage.getItem("loggedIn")):[]
		if (storedUser.fname) {
			storedUser.address = newAddress;
			const loginName = storedUser.fname;
			showLoggedInState(loginName, newAddress);
		}
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

const coffee = [
		{ id: 1, image: 'img/robusta.jpg', title: 'Item 1', description: 'Description for Item 1', price: 200 },
		{ id: 2, image: 'img/arabica.jpg', title: 'Item 2', description: 'Description for Item 2', price: 200 },
		{ id: 3, image: 'img/pexels-erica-strolen-8700719.jpg', title: 'Item 3', description: 'Description for Item 3', price: 200 },
		{ id: 4, image: 'img/pexels-caleb-kwok-2559312.jpg', title: 'Item 4', description: 'Description for Item 4', price: 200 },
		{ id: 5, image: 'img/pexels-fallon-michael-3551717.jpg', title: 'Item 5', description: 'Description for Item 5', price: 200 },
		{ id: 6, image: 'img/pexels-esra-afşar-13716965.jpg', title: 'Item 6', description: 'Description for Item 6', price: 200 },
		{ id: 7, image: 'img/pexels-marta-dzedyshko-2251758.jpg', title: 'Item 7', description: 'Description for Item 7', price: 200 },
		{ id: 8, image: 'img/pexels-mushtaq-hussain-10983062.jpg', title: 'Item 8', description: 'Description for Item 8', price: 200 },
		{ id: 9, image: 'img/pexels-viktoria-alipatova-2668510.jpg', title: 'Item 9', description: 'Description for Item 9', price: 200 },
		{ id: 10, image: 'img/pexels-anna-tarazevich-4927150.jpg', title: 'Item 10', description: 'Description for Item 10', price: 200 },
		// Add more items as needed
    ];
    const categories1 = [...new Set(coffee.map((item)=>
        {return item}))]
         let v=0;
    document.getElementById('coffee').innerHTML = categories1.map((item)=>
    {
        var {image, title, description, price} = item;
        return(
              `<div class='card m-2'>
              <img class='card-img-top' src=${image} alt=${image}></img>
              <div class='card-body'>
              <h5>${title}</h5>
              <p>Php ${price}.00</p>`+
              "<button class='btn btn-primary' onclick='addtocart("+(v++)+")'>Add to cart</button>"+
              `</div>
              </div>`
        )
    }).join('')
	
const tea = [
		{ id: 1, image: '', title: 'tea 1', description: 'Description for Item 1', price: 200 },
		{ id: 2, image: '', title: 'tea 2', description: 'Description for Item 2', price: 200 },
		{ id: 3, image: '', title: 'tea 3', description: 'Description for Item 3', price: 200 },
		{ id: 4, image: '', title: 'tea 4', description: 'Description for Item 4', price: 200 },
		{ id: 5, image: '', title: 'tea 5', description: 'Description for Item 5', price: 200 },
		{ id: 6, image: '', title: 'tea 6', description: 'Description for Item 6', price: 200 },
		{ id: 7, image: '', title: 'tea 7', description: 'Description for Item 7', price: 200 },
		{ id: 8, image: '', title: 'tea 8', description: 'Description for Item 8', price: 200 },
		{ id: 9, image: '', title: 'tea 9', description: 'Description for Item 9', price: 200 },
		{ id: 10, image: '', title: 'tea 10', description: 'Description for Item 10', price: 200 },
		// Add more items as needed
    ];
    const categories2 = [...new Set(tea.map((item)=>
        {return item}))]
         let w=0;
    document.getElementById('tea').innerHTML = categories2.map((item)=>
    {
        var {image, title, description, price} = item;
        return(
              `<div class='card m-2'>
                    <img class='images' src=${image}></img>
              <div class='card-body'>
              <h5>${title}</h5>
              <p>Php ${price}.00</p>`+
              "<button class='btn btn-primary' onclick='addtocart("+(w++)+")'>Add to cart</button>"+
              `</div>
              </div>`
        )
    }).join('')
	
const desserts = [
		{ id: 1, image: '', title: 'desserts 1', description: 'Description for Item 1', price: 200 },
		{ id: 2, image: '', title: 'desserts 2', description: 'Description for Item 2', price: 200 },
		{ id: 3, image: '', title: 'desserts 3', description: 'Description for Item 3', price: 200 },
		{ id: 4, image: '', title: 'desserts 4', description: 'Description for Item 4', price: 200 },
		{ id: 5, image: '', title: 'desserts 5', description: 'Description for Item 5', price: 200 },
		{ id: 6, image: '', title: 'desserts 6', description: 'Description for Item 6', price: 200 },
		{ id: 7, image: '', title: 'desserts 7', description: 'Description for Item 7', price: 200 },
		{ id: 8, image: '', title: 'desserts 8', description: 'Description for Item 8', price: 200 },
		{ id: 9, image: '', title: 'desserts 9', description: 'Description for Item 9', price: 200 },
		{ id: 10, image: '', title: 'desserts 10', description: 'Description for Item 10', price: 200 },
		// Add more items as needed
    ];
    const categories3 = [...new Set(desserts.map((item)=>
        {return item}))]
         let x=0;
    document.getElementById('desserts').innerHTML = categories3.map((item)=>
    {
        var {image, title, description, price} = item;
        return(
              `<div class='card m-2'>
                    <img class='images' src=${image}></img>
              <div class='card-body'>
              <h5>${title}</h5>
              <p>Php ${price}.00</p>`+
              "<button class='btn btn-primary' onclick='addtocart("+(x++)+")'>Add to cart</button>"+
              `</div>
              </div>`
        )
    }).join('')
	
const sandwiches = [
		{ id: 1, image: '', title: 'sandwiches 1', description: 'Description for Item 1', price: 200 },
		{ id: 2, image: '', title: 'sandwiches 2', description: 'Description for Item 2', price: 200 },
		{ id: 3, image: '', title: 'sandwiches 3', description: 'Description for Item 3', price: 200 },
		{ id: 4, image: '', title: 'sandwiches 4', description: 'Description for Item 4', price: 200 },
		{ id: 5, image: '', title: 'sandwiches 5', description: 'Description for Item 5', price: 200 },
		{ id: 6, image: '', title: 'sandwiches 6', description: 'Description for Item 6', price: 200 },
		{ id: 7, image: '', title: 'sandwiches 7', description: 'Description for Item 7', price: 200 },
		{ id: 8, image: '', title: 'sandwiches 8', description: 'Description for Item 8', price: 200 },
		{ id: 9, image: '', title: 'sandwiches 9', description: 'Description for Item 9', price: 200 },
		{ id: 10, image: '', title: 'sandwiches 10', description: 'Description for Item 10', price: 200 },
		// Add more items as needed
    ];
    const categories4 = [...new Set(sandwiches.map((item)=>
        {return item}))]
         let y=0;
    document.getElementById('sandwiches').innerHTML = categories4.map((item)=>
    {
        var {image, title, description, price} = item;
        return(
              `<div class='card m-2'>
                    <img class='images' src=${image}></img>
              <div class='card-body'>
              <h5>${title}</h5>
              <p>Php ${price}.00</p>`+
              "<button class='btn btn-primary' onclick='addtocart("+(y++)+")'>Add to cart</button>"+
              `</div>
              </div>`
        )
    }).join('')
	
const pastas = [
		{ id: 1, image: '', title: 'pasta 1', description: 'Description for Item 1', price: 200 },
		{ id: 2, image: '', title: 'pasta 2', description: 'Description for Item 2', price: 200 },
		{ id: 3, image: '', title: 'pasta 3', description: 'Description for Item 3', price: 200 },
		{ id: 4, image: '', title: 'pasta 4', description: 'Description for Item 4', price: 200 },
		{ id: 5, image: '', title: 'pasta 5', description: 'Description for Item 5', price: 200 },
		{ id: 6, image: '', title: 'pasta 6', description: 'Description for Item 6', price: 200 },
		{ id: 7, image: '', title: 'pasta 7', description: 'Description for Item 7', price: 200 },
		{ id: 8, image: '', title: 'pasta 8', description: 'Description for Item 8', price: 200 },
		{ id: 9, image: '', title: 'pasta 9', description: 'Description for Item 9', price: 200 },
		{ id: 10, image: '', title: 'pasta 10', description: 'Description for Item 10', price: 200 },
		// Add more items as needed
    ];
    const categories5 = [...new Set(pastas.map((item)=>
        {return item}))]
         let z=0;
    document.getElementById('pastas').innerHTML = categories5.map((item)=>
    {
        var {image, title, description, price} = item;
        return(
              `<div class='card m-2'>
                    <img class='images' src=${image}></img>
              <div class='card-body'>
              <h5>${title}</h5>
              <p>Php ${price}.00</p>`+
              "<button class='btn btn-primary' onclick='addtocart("+(z++)+")'>Add to cart</button>"+
              `</div>
              </div>`
        )
    }).join('')

    var cart =[];

    function addtocart(a){
        cart.push({...categories1[a]});
        displaycart();
    }
    function delElement(a){
        cart.splice(a, 1);
        displaycart();
    }

    function displaycart(){
        let j = 0, total=0;
        document.getElementById("count").innerHTML=cart.length;
        if(cart.length==0){
            document.getElementById('cartItem').innerHTML = "Your cart is empty";
            document.getElementById("total").innerHTML = "$ "+0+".00";
        }
        else{
            document.getElementById("cartItem").innerHTML = cart.map((items)=>
            {
                var {image, title, price} = items;
                total=total+price;
                document.getElementById("total").innerHTML = "Php "+total+".00";
                return(
                    `<div class='cart-item'>
                    <div class='row-img'>
                        <!--<img class='rowimg' src=${image}>-->
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size: 15px;'>Php ${price}.00</h2>`+
                    "<span class='material-symbols-outlined' onclick='delElement("+ (j++) +")'>delete</span></div>"
                );
            }).join('');
        }
    }

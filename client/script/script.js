let CHF_EUR;

let CHF_USD;

let EUR_CHF;

let USD_CHF;

function loadJSON(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
      }
      else {
        error(xhr);
      }
    }
  };
  xhr.open('GET', path, true);
  xhr.send();
}

loadJSON("http://www.floatrates.com/daily/chf.json", currencyRate,'jsonp');

function currencyRate(Data)
{
  CHF_EUR = parseFloat(Data["eur"].rate);
  CHF_USD = parseFloat(Data["usd"].rate);
  EUR_CHF = parseFloat(Data["eur"].inverseRate);
  USD_CHF = parseFloat(Data["usd"].inverseRate);
}
//created object for input box
let locAm=document.getElementById("localAmount");

let forAm=document.getElementById("foreignAmount");

function convert(betrag, kurs) {
    return betrag * kurs;
}

function localToForeign() {
    var CHF = locAm.value;
    if (document.getElementById("foreignExchange").value =="eur") {
        var EUR = convert(CHF,CHF_EUR);
        forAm.value = EUR.toFixed(2);
      }
    else if (document.getElementById("foreignExchange").value =="usd") {
        var USD = convert(CHF,CHF_USD);
        forAm.value = USD.toFixed(2);
    }
    playAudio();
}

function foreignToLocal() {
    if (document.getElementById("foreignExchange").value =="eur") {
        var EUR = forAm.value;
        var CHF = convert(EUR,EUR_CHF);
        locAm.value = CHF.toFixed(2);
    }
    else if (document.getElementById("foreignExchange").value =="usd") {
        var USD = forAm.value;
        var CHF = convert(USD,USD_CHF);
        locAm.value = CHF.toFixed(2);
    }
    playAudio();
}

var x = document.getElementById("myAudio");

function playAudio() {
  x.play();
}

// get age
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.className = 'error-feedback visible';
    small.innerText = message;
}

// hide error message
function hideError(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.className = 'error-feedback';
}


function validateReset() {
  document.forms["myForm"]["inputFirstName"].setCustomValidity("");
  document.forms["myForm"]["inputLastName"].setCustomValidity("");
  document.forms["myForm"]["inputEmail"].setCustomValidity("");
  document.forms["myForm"]["inputBirthdate"].setCustomValidity("");
  document.forms["myForm"]["inputCheckbox"].setCustomValidity("");
  document.getElementById("checkboxText").style.color = "black";
  document.forms["myForm"]["inputRequest"].setCustomValidity("");
  document.getElementById("inputRequest").style.borderColor = "lightGrey";
}

function validateForm() {

  var valid = true;

  // first name check
    var input = document.forms["myForm"]["inputFirstName"];
    hideError(input);
    var firstname = input.value;
    if (!firstname) {
        input.setCustomValidity("Please fill in your name.");
        showError(input,"Please fill in your name.")
    } else if (firstname.length < 1 ) {
        input.setCustomValidity("Your name should be longer than 1 character.");
        showError(input,"Your name should be longer than 1 character.")
        valid = false;
    } else if (firstname.length > 20 ) {
        input.setCustomValidity("Your name is too long.");
        showError(input,"Your name is too long.")
        valid = false;
    }

    // lastname check
    var input = document.forms["myForm"]["inputLastName"];
    hideError(input);
    var lastname = input.value;
    if (!lastname) {
        input.setCustomValidity("Please fill in your last name.");
        showError(input,"Please fill in your last name.");
    } else if (lastname.length < 1 ) {
        input.setCustomValidity("Your last name should be longer than 1 character.");
        showError(input,"Your last name should be longer than 1 character.");
        valid = false;
    } else if (lastname.length > 40 ) {
        input.setCustomValidity("Your last name is too long.");
        showError(input,"Your last name is too long.");
        valid = false;
    }


  // age check
  var input = document.forms["myForm"]["inputBirthdate"];
  hideError(input);
  var age = getAge(input.value);
  if (isNaN(age)) {
      input.setCustomValidity("Please put in a date.");
      showError(input,"Please put in a date.");
      valid = false;
  } else if (age <= 16) {
      input.setCustomValidity("Invalid age. Too young.");
      showError(input,"Invalid age. Too young.");
      valid = false;
  } else if (age >= 150) {
      input.setCustomValidity("Invalid age. Too old.");
      showError(input,"Invalid age. Too old.");
      valid = false;
  }

    // email check
    var input = document.forms["myForm"]["inputEmail"];
    hideError(input);
    var email = input.value;
    var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email) {
        input.setCustomValidity("Please enter your email.");
        showError(input,"Please enter your email.");
        valid = false;
    } else if (!email_regex.test(email)) {
        input.setCustomValidity("Your email is invalid.");
        showError(input,"Your email is invalid.");
        valid = false;
    }

  //request check
    var input = document.forms["myForm"]["inputRequest"];
    hideError(input);
    var request = input.value;
    if (!request) {
        input.setCustomValidity("Please put in your request.");
        showError(input, "Please put in your request.");
        input.style.borderColor = "red";
        valid = false;
    } else if (request.length < 16 ) {
        input.setCustomValidity("Your request should be longer than 16 characters.");
        showError(input,"Your request should be longer than 16 character.");
        input.style.borderColor = "red";
        valid = false;
    } else if (request.length > 500 ) {
        input.setCustomValidity("Your request is too long. Please send an email at thebeautyofnature@gmail.com");
        showError(input,"Your request is too long. Please send an email at thebeautyofnature@gmail.com");
        input.style.borderColor = "red";
        valid = false;
    }

  // check check
  var input = document.forms["myForm"]["inputCheckbox"];
  var checkbox = input.checked;
  if (checkbox == false) {
    input.setCustomValidity("Please check the box.");
    document.getElementById("checkboxText").style.color = "red";
    valid = false;
  }

  if (valid == false) {
      return false;
  }
  window.open("confirmation.html");
 }

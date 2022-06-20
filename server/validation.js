const fs = require('fs');

// saving user data
function saveData(data) {
    fs.appendFile('data/user-data.json', data + ",\n", (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
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

function validateForm(req, res) {
    const {name, last_name, birthdate, email, request, checkbox} = req.body;
    const errors = {};

    // name check
    if (!name) {
        errors["name"] = "Name is invalid."
    } else if (name.length < 1 ) {
        errors["name"] = "Name is too short."
    } else if (name.length > 20 ) {
        errors["name"] = "Name is too long."
    }

    // last name check

    if (!last_name) {
        errors["last_name"] = "Last name is invalid."
    } else if (last_name.length < 1 ) {
        errors["last_name"] = "Last name is too short."
    } else if (last_name.length > 40 ) {
        errors["last_name"] = "Last name is too long."
    }

    // birthdate check
    let age = getAge(birthdate)
    if (isNaN(age)) {
        errors["birthdate"] = "Birthdate is invalid."
    } else if (age <= 16) {
        errors["birthdate"] = "User is too young."
    } else if (age >= 150) {
        errors["birthdate"] = "User is too old."
    }

    // email check
    let email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!email_regex.test(email)) {
        errors["email"] = "Email is invalid."
    }

    // request check
    if (!request) {
        errors["request"] = "Request is invalid."
    } else if (request.length < 16 ) {
        errors["request"] = "Request is too short."
    } else if (request.length > 500 ) {
        errors["request"] = "Request is too long."
    }

    // check check
    if (!checkbox) {
        errors["checkbox"] = "Checkbox is unchecked."
    }

    // printing errors
    if (Object.keys(errors).length == 0) {
        res.send("Everything is valid.");
        console.log("Everything is valid.");
        const user = {
            "name": name,
            "last_name": last_name,
            "birthdate": birthdate,
            "email": email,
            "request": request
        };
        const data = JSON.stringify(user, null, 4);
        saveData(data);

    } else if (Object.keys(errors).length == 1) {
        console.log("There is 1 mistake." + JSON.stringify(errors));
        res.send("There is 1 mistake." + JSON.stringify(errors));

    } else {
        console.log("There are " + Object.keys(errors).length + " mistakes." + JSON.stringify(errors));
        res.send("There are " + Object.keys(errors).length + " mistakes." + JSON.stringify(errors));
    }


}

module.exports = {
    validateForm
}






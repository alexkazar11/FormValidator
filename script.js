const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error message
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = "form-control error";
	const small = formControl.querySelector("small")
	small.innerText = message;
}

//Show success message
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = "form-control success";
}

function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Check required fields
function checkRequired(inputArray) {
	inputArray.forEach(function (input) {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
		} else {
			showSuccess(input);
		}
	});
}

// Check input length
function checkInputLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getFieldName(input)} must be at least ${min} characters`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} must be at most ${max} characters`);
	} else {
		showSuccess(input);
	}
}

// Validate email using regex
function checkEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value.trim().toLowerCase())) {
		showSuccess(email);
	} else {
		showError(email, "Email is not valid");
	}
}

// Check that passwords are matching
function checkPasswordsMatch(password1, password2) {
	if (password1.parentElement.className === "form-control error") {
		showError(password2, "Password doesn't follow the rules");
	} else if (password1.value !== password2.value) {
		showError(password2, "Passwords don't match");
	} else {
		showSuccess(password2);
	}
}

//Check the password is secure
function checkPassword(password) {
	const upperCaseLetters = /[A-Z]/g;
	const lowerCaseLetters = /[a-z]/g;
	const numbers = /[0-9]/g;

	if (password.value.length < 6) {
		showError(password, "Password must be at least 6 characters long");
	} else if (!password.value.match(upperCaseLetters)) {
		showError(password, "Password must contain at least one upper case letter");
	} else if (!password.value.match(lowerCaseLetters)) {
		showError(password, "Password must contain at least one lower case letter");
	} else if (!password.value.match(lowerCaseLetters)) {
		showError(password, "Password must contain at least one lower case letter");
	} else if (!password.value.match(numbers)) {
		showError(password, "Password must contain at least one digit");
	} else {
		showSuccess(password);
	}
}

// Form event listener
form.addEventListener("submit", function (e) {
	e.preventDefault();
	checkRequired([username, email, password, password2]);
	checkInputLength(username, 3, 15);
	checkPassword(password);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
});
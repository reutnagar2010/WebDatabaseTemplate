import { send } from "clientUtilities";
import { get } from "componentUtilities";

const usernameInput = get("input", "usernameInput");
const passwordInput = get("input", "passwordInput");
const confirmPasswordInput = get("input", "confirmPasswordInput");
const submitButton = get("button", "submitButton");
const errorDiv = get("div", "errorDiv");

var token = localStorage.getItem("token");

submitButton.onclick = async function () {

  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();
  var confirmPassword = confirmPasswordInput.value.trim();

  if (username == "") {
    errorDiv.innerText = "Please fill out the username fild!";
    usernameInput.focus();
  }
  else if (password == "") {
    errorDiv.innerText = "Please fill out the password fild!";
    passwordInput.focus();
  }
  else if (confirmPassword == "") {
    errorDiv.innerText = "Please fill out the confirm password fild!";
    confirmPasswordInput.focus();
  }
  else {
    if (password != confirmPassword) {
      errorDiv.innerText = "Passwords do not match.";
      passwordInput.focus();
      passwordInput.value = "";
      confirmPasswordInput.value = "";
    }
    else {
      var token = await send<string | null>("signUp", username, password);
      if (token == null) {
        errorDiv.innerText = "A user with this username already exists.";
      }
      else {
        localStorage.setItem("token", token);
        location.href = "index.html";
      }
    }
  }
};
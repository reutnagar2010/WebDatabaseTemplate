import { send } from "clientUtilities";
import { get } from "componentUtilities";

const usernameInput = get("input", "usernameInput");
const passwordInput = get("input", "passwordInput");
const submitButton = get("button", "submitButton");
const errorDiv = get("div", "errorDiv");

usernameInput.oninput = () => errorDiv.innerText = "";
passwordInput.oninput = () => errorDiv.innerText = "";

submitButton.onclick = async function () {

  var username = usernameInput.value.trim();
  var password = passwordInput.value.trim();

  if (username == "") {
    errorDiv.innerText = "Please fill out the username fild!";
    usernameInput.focus();
  }
  else if (password == "") {
    errorDiv.innerText = "Please fill out the password fild!";
    passwordInput.focus();
  }
  else {
    var stringOrNullToken = await send("logIn", username, password);
    if (stringOrNullToken == null) {
      errorDiv.innerText = "Invalid username or password.";
    }
    else {
      localStorage.setItem("token", stringOrNullToken);
      location.href = "index.html";
    }
  }
};
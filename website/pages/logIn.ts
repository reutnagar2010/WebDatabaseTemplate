import { send } from "clientUtilities";
import { get } from "componentUtilities";

var usernameInput = get("input", "usernameInput");
var passwordInput = get("input", "passwordInput");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");


var token = localStorage.getItem("token");

submitButton.onclick = async function () {
  errorDiv.innerText = "";

  var token = await send<string | null>(
    "logIn",
    usernameInput.value,
    passwordInput.value
  );

  if (!token) {
    errorDiv.innerText = "Invalid username or password";
    return;
  }

  localStorage.setItem("token", token);

  location.href = "index.html";
};
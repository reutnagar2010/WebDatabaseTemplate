import { send } from "clientUtilities";
import { get } from "componentUtilities";

var usernameInput = get("input", "usernameInput");
var passwordInput = get("input", "passwordInput");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");

submitButton.onclick = async function () {
  errorDiv.innerText = "";

  var token = await send<string | null>(
    "signUp",
    usernameInput.value,
    passwordInput.value
  );

  if (!token) {
    errorDiv.innerText = "Sign up failed";
    return;
  }

  localStorage.setItem("token", token);

  location.href = "index.html";
};
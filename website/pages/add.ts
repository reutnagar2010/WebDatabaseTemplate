import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { createBar } from "scripts/funcs";
import { Author, User } from "scripts/types";

var movieNameInput = get("input", "movieNameInput");
var durationInput = get("input", "durationInput");
var ageInput = get("input", "ageInput");
var imgUrlInput = get("input", "imgUrlInput");
var ticketPriceInput = get("input", "ticketPriceInput");
var descriptionTextarea = get("textarea", "descriptionTextarea");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");

var token = localStorage.getItem("token");
var user = await send<User | null>("getUser", token);


submitButton.onclick = async function () {
  var movieName = movieNameInput.value.trim();
  var duration = durationInput.value.trim();
  var imageUrl = imgUrlInput.value.trim();
  var age = ageInput.value.trim();
  var ticketPrice = ticketPriceInput.value.trim();
  var description = descriptionTextarea.value.trim();

  if (movieName == "" || duration == "" || imageUrl == "" || age == "" || ticketPrice == "" || description == "") {
    errorDiv.innerText = "All fields are required.";
    return;
  }

  errorDiv.innerText = "";

  await send("addMovie", movieName, duration, imageUrl, age, ticketPrice, description);
  location.href = "index.html";
}
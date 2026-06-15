import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie, User } from "types";

var movieNameInput = get("input", "movieNameInput");
var durationInput = get("input", "durationInput");
var ageInput = get("input", "ageInput");
var imgUrlInput = get("input", "imgUrlInput");
var ticketPriceInput = get("input", "ticketPriceInput");
var descriptionTextarea = get("textarea", "descriptionTextarea");
var submitButton = get("button", "submitButton");
var errorDiv = get("div", "errorDiv");
var yearInput = get("input", "yearInput");
var typeInput = get("select", "typeInput");

var token = localStorage.getItem("token");
var user = await send<User | null>("getUser", token);

submitButton.onclick = async function () {
  var movieName = movieNameInput.value.trim();
  var duration = durationInput.value.trim();
  var imageUrl = imgUrlInput.value.trim();
  var age = ageInput.value.trim();
  var ticketPrice = ticketPriceInput.value.trim();
  var description = descriptionTextarea.value.trim();
  var year = yearInput.value.trim();
  var type = typeInput.value;

  if (movieName == "" || imageUrl == "" || description == "" || type == "0" || duration == "" || age == "" || year == "" || ticketPrice == "") {
    errorDiv.innerText = "All fields are required. Please make sure to select a genre.";
    return;
  }
  errorDiv.innerText = "";

  await send("addMovie", String(movieName), imageUrl, description, parseInt(type), parseInt(duration), parseInt(age), parseInt(year), parseInt(ticketPrice));

  location.href = "index.html";
}
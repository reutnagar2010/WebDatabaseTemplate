import { send } from "clientUtilities";
import { get } from "componentUtilities";

const nameInput = get("input", "name-input");
const imageInput = get("input", "image-input");
const typeInput = get("select", "type-input");
const durationInput = get("input", "duration-input");
const ageInput = get("input", "age-input");
const yearInput = get("input", "year-input");
const priceInput = get("input", "price-input");
const descriptionInput = get("input", "description-input");
const submitButton = get("button", "submit-button");
const errorDiv = get("div", "errorDiv");

submitButton.onclick = async function () {

  var name = nameInput.value.trim();
  var image = imageInput.value.trim();
  var type = parseInt(typeInput.value);
  var duration = durationInput.value.trim();
  var age = ageInput.value.trim();
  var year = yearInput.value.trim();
  var price = priceInput.value.trim();
  var description = descriptionInput.value.trim();

  if (
    name !== '' &&
    image !== '' &&
    type !== -1 && !isNaN(type) &&
    duration !== '' &&
    age !== '' &&
    year !== '' &&
    price !== '' &&
    description !== ''
  ) {
    await send("addMovie", name, image, type.toString(), duration, age, year, price, description);
    location.href = "index.html";
  } 
  else {
    errorDiv.innerText = "One or more fields are empty or invalid.";
  }
}
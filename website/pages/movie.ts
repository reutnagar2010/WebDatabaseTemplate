import { getSearchParam, send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

let image = get("img", "backgroundImg");
let title = get("div", "title");
let description = get("div", "description")
let duration = get("span", "Duration");
let age = get("span", "Age")
let ticketPrice = get("div", "TicketPrice")
let ChairDiv = get("div", "ChairDiv")
let TotalPrice = get("div", "TotalPrice")
let SubmitButton = get("button", "SubmitButton")
let successModal = get("div", "successModal");
let failModal = get("div", "failModal");
let closeFailModal = get("button", "closeFailModal");
let closeModal = get("button", "closeModal");
let movieId = parseInt(getSearchParam("id")!);


let movie = await send<Movie | null>("getMovie", movieId);

if (movie == null) {
    location.href = "404.html";
}
else {
    image.src = movie.imageUrl;
    title.innerText = movie.name;
    description.innerText = movie.description
    duration.textContent = String(movie.duration) + " minutes ";
    age.textContent = String(movie.age) + "+ ";
    ticketPrice.textContent = String(movie.ticketPrice) + "₪";
    TotalPrice.textContent = 0 + "₪";

}

let chosenChairs: number[] = [];

let chairI = 0;
let totalPrice = 0;

for (let j = 0; j < 4; j++) {
    let rowDiv = create("div", { className: "rowDiv" });
    ChairDiv.append(rowDiv);
    for (let i = 0; i < 9 - j; i++) {
        const currentChairI = chairI;

        let Chair = create("button", { className: "ChairButton" });
        Chair.onclick = function () {
            const index = chosenChairs.indexOf(currentChairI);
            if (movie == null) {
            location.href = "404.html";
            }
            else if (index !== -1) { 
            Chair.classList.remove("chosenChair");
            chosenChairs.splice(index, 1);
            totalPrice -= movie.ticketPrice;
            }
            else{
            chosenChairs.push(currentChairI);
            Chair.classList.add("chosenChair");
            console.log(chosenChairs);
            totalPrice += movie.ticketPrice
            }
            TotalPrice.textContent = String(totalPrice)+ "₪";
           
            
        };
        rowDiv.append(Chair);

        chairI++;
    }
}

SubmitButton.onclick = function () {
    if (totalPrice == 0) {
        successModal.classList.remove("show");
        failModal.classList.add("show");
        return;
    }

    failModal.classList.remove("show");
    successModal.classList.add("show");

    // איפוס נתונים
    chosenChairs = [];
    totalPrice = 0;
    TotalPrice.textContent = "0₪";
};

closeModal.onclick = function () {
    successModal.classList.remove("show");
};

closeFailModal.onclick = function () {
    failModal.classList.remove("show");
};
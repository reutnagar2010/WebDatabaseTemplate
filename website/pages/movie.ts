import { getSearchParam, send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

let image = get("img", "backgroundImg");
let title = get("div", "title");
let description = get("div", "description")
let duration = get("div", "Duration");
let age = get("div", "Age")
let ticketPrice = get("div", "TicketPrice")
let ChairDiv = get("div", "ChairDiv")

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

}

let chosenChairs: number[] = [];

let chairI = 0;

for (let j = 0; j < 4; j++) {
    let rowDiv = create("div", { className: "rowDiv" });
    ChairDiv.append(rowDiv);
    for (let i = 0; i < 9 - j; i++) {
        const currentChairI = chairI;

        let Chair = create("button", { className: "ChairButton" });
        Chair.onclick = function () {
            const index = chosenChairs.indexOf(currentChairI);
            if (index !== -1) { 
            Chair.classList.remove("chosenChair");
            chosenChairs.splice(index, 1);
            }
            else{
            chosenChairs.push(currentChairI);
            Chair.classList.add("chosenChair");
            console.log(chosenChairs);
            }
        };
        rowDiv.append(Chair);

        chairI++;
    }
}


import { getSearchParam, send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

const image = get("img", "backgroundImg");
const title = get("span", "title");
const type = get("span", "type");
const duration = get("span", "duration");
const age = get("span", "age");
const year = get("span", "year");
const description = get("span", "description")
const chairDiv = get("div", "chairDiv")
const ticketPrice = get("span", "ticketPrice")
const totalPrice = get("span", "totalPrice")
const buyButton = get("button", "buyButton")
const modalBackground = get("div", "modalBackground")
const successModal = get("div", "successModal")
const failModal = get("div", "failModal")
const successCloseButton = get("div", "successCloseButton")
const failCloseButton = get("div", "failCloseButton")

const movieId = parseInt(getSearchParam("id")!);
const movie = await send<Movie | null>("getMovie", movieId);

if (movie == null) {
    location.href = "404.html";
}
else {
    image.src = movie.imageUrl;
    title.innerText = movie.name;
    type.innerText = String(typeToString(movie.type));
    duration.innerText = String(movie.duration) + " minutes";
    age.innerText = String(movie.age) + "+";
    year.innerText = String(movie.year);
    description.innerText = movie.description;
    ticketPrice.innerText = String("Ticket Price: " + movie.ticketPrice) + "₪";
    totalPrice.innerText = "Total Price: " + 0 + "₪";
}

let chosenChairs: number[] = [];
let chairIndex = 0;
let currentTotalPrice = 0;

for (let i = 0; i < 4; i++) {

    const rowDiv = create("div", { className: "rowDiv" , id: `rowDiv${String(i+1)}`});
    const rowNum = create("span", { className: "rowNum" });
    rowNum.innerText = "Row " + String(i + 1);
    rowDiv.append(rowNum);
    chairDiv.append(rowDiv);

    for (let j = 0; j < 9 - i; j++) {
        const currentChairIndex = chairIndex;
        var isTaken = checkChair(currentChairIndex);
        
        if (await isTaken == false) {
            const chair = create("button", { className: "chairButton", id: `chairButton${String(currentChairIndex+1)}` });
            
            chair.innerText = String(currentChairIndex + 1);

            chair.onclick = function () {
                const index = chosenChairs.indexOf(currentChairIndex);

                if (movie == null) {
                    location.href = "404.html";
                }
                else if (index !== -1) {
                    chair.classList.remove("chosenChair");
                    chosenChairs.splice(index, 1);
                    currentTotalPrice -= movie.ticketPrice;
                    console.log(chosenChairs)
                }
                else {
                    chosenChairs.push(currentChairIndex);
                    chair.classList.add("chosenChair");
                    currentTotalPrice += movie.ticketPrice
                    console.log(chosenChairs)
                }

                totalPrice.innerText = "Total Price: " + String(currentTotalPrice) + "₪";
            };

            rowDiv.append(chair);
            chairIndex++;
        }
        else {
            const chair = create("button", { className: "chairButton notAvaliable", id: `chairButton${String(currentChairIndex+1)}` });
            chair.innerText = String(currentChairIndex + 1);
            rowDiv.append(chair);
            chairIndex++;
        }
    }
}

buyButton.onclick = function () {
    modalBackground.style.display = 'block';
    if (currentTotalPrice == 0) {
        successModal.style.display = 'none';
        failModal.style.display = 'flex';
    }
    else {
        successModal.style.display = 'flex';
        failModal.style.display = 'none';
        totalPrice.innerText = "Total Price: 0₪";
        currentTotalPrice = 0;

        chosenChairs.forEach(chairNumber => {
            buyChair(chairNumber);
        });
    }
}

async function buyChair(chairNumber:number) {
    const chair = get("button", `chairButton${String(chairNumber+1)}`)
    chair.classList.add("notAvaliable");
    chair.onclick = null;
    chair.disabled = true;
    await send("buyChair",chairNumber, movieId);
}

async function checkChair(chairNumber:number) {
    return await send("checkChair",chairNumber, movieId);
}

successCloseButton.onclick = function () {
    modalBackground.style.display = 'none';
}
failCloseButton.onclick = function () {
    modalBackground.style.display = 'none';
}

// buyButton.onclick = function () {
//     if (totalPrice == 0) {
//         successModal.classList.remove("show");
//         failModal.classList.add("show");
//         return;
//     }

//     failModal.classList.remove("show");
//     successModal.classList.add("show");

//     totalPrice = 0;
//     TotalPrice.textContent = "0₪";
// };

// closeModal.onclick = function () {
//     successModal.classList.remove("show");
// };

// closeFailModal.onclick = function () {
//     failModal.classList.remove("show");
// };

function typeToString(value: number) {
    if (value === 1) {return '';}
    else if (value == 2) {return 'Action';}
    else if (value == 3) {return 'Comedy';}
    else if (value == 4) {return 'Fantasy';}
    else if (value == 5) {return 'Family';}
    else if (value == 6) {return 'Horror';}
}
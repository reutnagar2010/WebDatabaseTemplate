import { getSearchParam, send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

var image = get("img", "backgroundImg");
var title = get("div", "title");
var description = get("div", "description")
let duration = get("div", "Duration");
var age = get("div", "Age")
var ticketPrice = get("div", "TicketPrice")

var movieId = parseInt(getSearchParam("id")!);

var movie = await send<Movie | null>("getMovie", movieId);

if (movie == null) {
    location.href = "404.html";      
}
else {
    image.src = movie.imageUrl;
    title.innerText = movie.name;
    description.innerText = movie.description
    duration.textContent = String(movie.duration) + "+ "; 
    age.textContent = String(movie.age) + "+ ";
    ticketPrice.textContent = String(movie.ticketPrice) + "₪";

}


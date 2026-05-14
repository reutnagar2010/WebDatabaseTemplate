import { getSearchParam, send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

var title = get("div", "title");
var image = get("img", "backgroundImg");

var movieId = parseInt(getSearchParam("id")!);

var movie = await send<Movie | null>("getMovie", movieId);

if (movie == null) {
    title.innerText = "Movie was not found";
    
}
else {
    // title.innerText = movie.name;
    image.src = movie.imageUrl;
}




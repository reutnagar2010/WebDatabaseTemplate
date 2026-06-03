import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

var moviesDiv = get("div", "moviesDiv");

var movies = await send<Movie[]>("getMovies");

var someDiv = create("button", { innerText: "click me!", className: "someDiv"});

moviesDiv.append(someDiv);

for (var i = 0; i < movies.length; i++) {
  var movieImg = create("a", {href: `movie.html?id=${movies[i].id}`}, 
    create("img", {className: "movieImg", src: movies[i].imageUrl})
  );

  moviesDiv.append(movieImg);
}

console.log(movies);





import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";

const welcomeTitle = get("div", "welcome-title");
const hotNowMoviesDiv = get("div", "hot-now-movies-div");
const actionMoviesDiv = get("div", "action-movies-div");
const comedyMoviesDiv = get("div", "comedy-movies-div");
const fantasyMoviesDiv = get("div", "fantasy-movies-div");
const familyMoviesDiv = get("div", "family-movies-div");
const horrorMoviesDiv = get("div", "horror-movies-div");


// if(){

// }

var movies = await send<Movie[]>("getMovies");

for (var i = 0; i < movies.length; i++) {
  var movieImg = create("a", {href: `movie.html?id=${movies[i].id}`}, 
    create("img", {className: "movieImg", src: movies[i].imageUrl})
  );
  if(movies[i].type == 1){
    hotNowMoviesDiv.append(movieImg);
  }
  else if(movies[i].type == 2){
    actionMoviesDiv.append(movieImg);
  }
    else if(movies[i].type == 3){
    comedyMoviesDiv.append(movieImg);
  }
    else if(movies[i].type == 4){
    fantasyMoviesDiv.append(movieImg);
  } 
   else if(movies[i].type == 5){
    familyMoviesDiv.append(movieImg);
  }
   else if(movies[i].type == 6){
    horrorMoviesDiv.append(movieImg);
  }
}

console.log(movies);
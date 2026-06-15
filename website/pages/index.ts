import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { Movie } from "types";
import type { User } from "types";

const welcomeTitleContainer = get("div", "welcome-title-container");
const hotNowMoviesDiv = get("div", "hot-now-movies-div");
const actionMoviesDiv = get("div", "action-movies-div");
const comedyMoviesDiv = get("div", "comedy-movies-div");
const fantasyMoviesDiv = get("div", "fantasy-movies-div");
const familyMoviesDiv = get("div", "family-movies-div");
const horrorMoviesDiv = get("div", "horror-movies-div");
const signupButton = get("a", "signup-button");
const loginButton = get("a", "login-button");

async function login () {
  welcomeTitleContainer.innerHTML = "";
  var token = localStorage.getItem("token");
  var UserName =  await send<User | null>("getUser",token);
  console.log(UserName);

  if ((token != null || token != '') && UserName != null) {
    signupButton.style.display = "none";
    loginButton.style.display = "none";

    const welcomeTitle = create("span");
    welcomeTitle.innerText = `Welcome, ${UserName.username}`;
    welcomeTitleContainer.append(welcomeTitle);

    const logoutButton = create("button", {className: "button"});
    logoutButton.innerText = "Log Out";
    welcomeTitleContainer.append(logoutButton);
    logoutButton.onclick = function () {
      localStorage.setItem("token", '')
      login()
    };
  }
  else {
    signupButton.style.display = "block";
    loginButton.style.display = "block";

    const welcomeTitle = create("span");
    welcomeTitle.innerText = "guest";
    welcomeTitleContainer.append(welcomeTitle);
  }
}

login();

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
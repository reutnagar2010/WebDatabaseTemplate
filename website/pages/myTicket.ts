import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import type { Movie, Ticket } from "types";

const body = document.body;

function createTicket (movieId: string, imgUrl: string , name: string, chairNum: number, ticketId: string){
    const ticketDiv = create("div", {className: "ticket-card"});
    const imgDiv = create("a", {href: `movie.html?id=${movieId}`}, create("img", {className: "movieImg", src: imgUrl}));
    ticketDiv.append(imgDiv);

    const infoDiv = create("div", {className: "ticket-info"})

    const movieName = create("span" ,{className: "movie-name"}, name);
    infoDiv.append(movieName);

    const ticketChairNum = create("span", {className: "chair-num"}, "Chair number: " + String(30 - chairNum));
    infoDiv.append(ticketChairNum);

    const cancelButton = create("button", {className: "cancel-button", id: ticketId}, "Cancel")
    cancelButton.onclick = async function() {
      await send<Movie>("removeTicket", cancelButton.id);
      window.location.reload();
    }
    infoDiv.append(cancelButton);

    ticketDiv.append(infoDiv);

    const dots = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="tally-icon">
        <path d="M4 4v16"/>
      </svg>`;
    const dotsDiv = create("div", {className: "dots-div"});
    dotsDiv.innerHTML = dots;
    ticketDiv.append(dotsDiv);

    body.append(ticketDiv);
}

const token = localStorage.getItem("token");
const tickets = await send<Ticket[]>("getMyTickets", token);

if (tickets != null) {
  if (tickets.length > 0) {
    tickets.forEach( async (ticket) => {
      const movie = await send<Movie>("getMovie", ticket.movieId);
      createTicket(movie.id, movie.imageUrl, movie.name, ticket.chairNum, ticket.id);
    });
  }
  else {
    body.classList.add('empty')
  }
}
else {
  body.classList.add('empty')
}
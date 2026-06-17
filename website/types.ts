export type Movie = {
  id: string,
  name: string,
  imageUrl: string,
  description: string,
  type: number,
  duration: number,
  age: number,
  year: number,
  ticketPrice: number,
};

export type User = {
  id: string,
  username: string,
  password: string,
}

export type Ticket = {
  id: string,
  movieId: number,
  chairNum: number,
};

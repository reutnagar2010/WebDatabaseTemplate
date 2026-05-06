export type User = {
  id: number;
  username: string;
};

export type Book = {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  author: Author;
};

export type Author = {
  id: number;
  name: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
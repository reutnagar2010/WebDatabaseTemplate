import { create } from "componentUtilities";
import { Book, User } from "./types";

export function createBar(user: User | null) {
  const barRightDiv: HTMLDivElement = user
    ? create(
        "div",
        { className: "barRightDiv" },
        create("div", { innerText: `Welcome, ${user.username}!` }),
        create("button", { innerText: "Log Out", onclick: onLogOutClick })
      )
    : create(
        "div",
        { className: "barRightDiv" },
        create("a", { innerText: "Sign Up", href: "signup.html" }),
        create("a", { innerText: "Log In", href: "login.html" })
      );

  return create(
    "div",
    { className: "barDiv" },
    create("a", { className: "barLeftA", href: "index.html" }, "MyBookList"),
    barRightDiv
  );
}

function onLogOutClick() {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
  location.href = "login.html";
}

export function createPreview(book: Book) {
  return create(
    "a",
    { className: "previewA", href: `book.html?bookId=${book.id}` },
    create("img", { className: "previewImg", src: book.imageUrl }),
    book.title
  );
}

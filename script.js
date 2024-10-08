const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const wesiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// show modal, focus on input
function showModal() {
  modal.classList.add("show-modal");
  wesiteNameEl.focus();
}

// modal event listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});
window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : null;
});

// validate form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }
  // if (urlValue.match(regex)) {
  //   alert("match");
  // }
  if (!urlValue.match(regex)) {
    alert("Please provide a valid web address");
    return false;
  }

  // Valid
  return true;
}

// build bookmarks DOM
function buildBookmarks() {
  // remove all bookmarks elements
  bookmarksContainer.textContent = "";
  // build items
  bookmarks.forEach((bookMark) => {
    const { name, url } = bookMark;
    // item
    const item = document.createElement("div");
    item.classList.add("item");
    // close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-trash");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    // favicon / link container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    // favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://s2.googleusercontent.com/s2/favicons?domain=${url}`
    );
    favicon.setAttribute("alt", "Favicon");
    // link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    // append to bookmarks container
    linkInfo.append(favicon, link, closeIcon);
    item.append(linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

// fetch bookmarks
function fetchBookmarks() {
  // get bookmarks for localStorage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // create bookmarks array in localStorage
    bookmarks = [
      {
        name: "Google",
        url: "https://google.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

// delete a bookmark
function deleteBookmark(url) {
  bookmarks.forEach((item, i) => {
    if (item.url === url) {
      bookmarks.splice(i, 1);
    }
  });
  // update bookmarks array in localStorage, re-populate DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
}

// handle data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = wesiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };

  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  wesiteNameEl.focus();
}

// event listner
bookmarkForm.addEventListener("submit", storeBookmark);

// onload, fetch bookmarks
fetchBookmarks();

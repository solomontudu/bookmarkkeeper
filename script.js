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

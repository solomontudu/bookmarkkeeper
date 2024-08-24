const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const wesiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("wesite-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

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

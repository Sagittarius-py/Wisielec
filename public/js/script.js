// Walidacja wprowadzonej litery
const letterInput = document.querySelector("#letter-input");
letterInput.addEventListener("input", () => {
  letterInput.value = letterInput.value.toUpperCase();
});

// document.getElementById("form").addEventListener("submit", function (event) {
//   event.preventDefault();
// });

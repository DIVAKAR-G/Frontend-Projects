let btn = document.getElementById("head");
btn.style.color = "red";
btn.addEventListener("click", (event) => {
  btn.textContent = "Submitted";

  console.log("Clicked");
});

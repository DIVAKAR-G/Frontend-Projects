const searchInput = document.getElementById("search");
const searchButton = document.querySelector("button");

const resultTitle = document.createElement("h2");
resultTitle.style.textAlign = "center";
resultTitle.style.marginTop = "20px";
resultTitle.style.color = "#333";
document.body.appendChild(resultTitle);

const resultDiv = document.createElement("div");
resultDiv.style.marginTop = "10px";
resultDiv.style.textAlign = "center";
resultDiv.style.display = "grid";
resultDiv.style.gridTemplateColumns = "repeat(3, 1fr)";
resultDiv.style.gap = "20px";
resultDiv.style.padding = "20px";
document.body.appendChild(resultDiv);

searchButton.addEventListener("click", fetchRecipe);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    fetchRecipe();
  }
});

async function fetchRecipe() {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a recipe name!");
    return;
  }

  resultTitle.textContent = `Search results for "${query}"`;

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  if (!response.ok) {
    resultDiv.innerHTML = `<p style="color:red;">Network error while fetching recipe</p>`;
    return;
  }

  const data = await response.json();
  resultDiv.innerHTML = "";

  if (!data.meals) {
    resultDiv.innerHTML = `<p style="color:red;">No recipes found for "${query}"</p>`;
    return;
  }

  data.meals.forEach((meal) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.borderRadius = "10px";
    div.style.padding = "10px";
    div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    div.style.backgroundColor = "#fff";

    div.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" width="200" style="border-radius:10px; margin:10px 0;">
      <p>${meal.strInstructions.slice(0, 100)}...</p>
    `;
    resultDiv.appendChild(div);
  });
}

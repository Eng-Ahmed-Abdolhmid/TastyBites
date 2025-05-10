// نجيب الـ ID من الرابط
const params = new URLSearchParams(window.location.search);
const mealID = params.get("id");

// نجيب مكان العرض
const container = document.getElementById("recipeDetails");

// نجيب البيانات من API
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then((res) => res.json())
  .then((data) => {
    const meal = data.meals[0];
    container.innerHTML = `
      <h1 class="mb-4 text-center">${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" class="img-fluid mb-4 rounded" alt="${
      meal.strMeal
    }">
      <h3>المكونات:</h3>
      <ul>
        ${getIngredientsList(meal)
          .map((item) => `<li>${item}</li>`)
          .join("")}
      </ul>
      <h3 class="mt-4">طريقة التحضير:</h3>
      <p>${meal.strInstructions}</p>
      <a href="index.html" class="btn btn-secondary mt-3">🔙 رجوع</a>
    `;
  });

// استخراج المكونات من العنصر
function getIngredientsList(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${measure} ${ing}`);
    }
  }
  return ingredients;
}

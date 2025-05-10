// جوة createMealCard function:
cardBody.innerHTML = `
  <h5 class="card-title">${meal.strMeal}</h5>
  <p class="card-text">${meal.strCategory || ""}</p>
  <a href="recipe.html?id=${meal.idMeal}" class="btn btn-primary">تفاصيل</a>
`;

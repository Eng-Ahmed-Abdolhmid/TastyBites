const mealsContainer = document.getElementById("mealsContainer");
const searchInput = document.getElementById("searchInput");

// دالة لعرض الوصفات في الكروت
function displayMeals(meals) {
  mealsContainer.innerHTML = ""; // تفريغ الكروت القديمة
  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card h-100 shadow">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${
      meal.strMeal
    }">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strCategory || "Meal"}</p>
          <a href="https://www.themealdb.com/meal/${
            meal.idMeal
          }" class="btn btn-primary" target="_blank">تفاصيل</a>
        </div>
      </div>
    `;
    mealsContainer.appendChild(card);
  });
}

// دالة البحث عن وصفات
function searchMeals(query = "chicken") {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        displayMeals(data.meals);
      } else {
        mealsContainer.innerHTML = '<p class="text-center">لا توجد نتائج</p>';
      }
    })
    .catch((err) => console.error("حدث خطأ:", err));
}

// حدث على شريط البحث
searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim();
  searchMeals(value || "chicken");
});

// أول تحميل
searchMeals();

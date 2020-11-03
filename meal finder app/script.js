const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');


//search meal and fetch from API
function searchMeal(e) {
  e.preventDefault();

  //clear single meal
  single_mealEl.innerHTML = '';

  //get search term
  const term = search.value;

  // check for empty
  if(term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
       console.log(data);
       resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;

       if(data.meals == null) {
        resultHeading.innerHTML = '<p>There are not search results. Try again!</p>';
       } else {
        mealsEl.innerHTML = data.meals //have access to the meals now
        .map(
          meal => `
        <div class = "meal">
          <img src = "${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class = "meal-info" data-mealID="${meal.idMeal}"> 
            <h3>${meal.strMeal}</h3>
          </div>
        </div>

        `) //above manipulates the DOM to show the meals you searched up
          .join('');
       }
    });
    //clear search text
    search.value = '';
  } else {
    alert('please enter a search term');
  }
}

//fetch meal by ID

function getMealByID(mealID) { //making a fetch request and gets replaced with the input meal id
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then(res => res.json())
  .then(data =>{
    const meal = data.meals[0];
    
    addMealToDOM(meal);
  });
}

//fetch random meal
function getRandomMeal() {
  //clear meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      addMealToDOM(meal);
    });S
}

//add meal to DOM
function addMealToDOM(meal) {//the for loop only shows ingredients with less than 20 
  const ingredients = [];

  for(let i = 1; i <= 20; i++) {
    if(meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`); //if it is true then we want it to push all the ingredients and measurements to the page
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class = 'single-meal'>
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class = "single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class = "main">
      <p>${meal.strInstructions}</p>
      <h2>Ingredients</h2>
      <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
      </ul>
    </div>
  </div>
  `;
}



  //event listener
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

mealsEl.addEventListener('click', e=> { //finds out if meal info div is equal to the click
  const mealInfo = e.path.find(item =>{
    if(item.classList) { //checks to see if their is class
      return item.classList.contains('meal-info'); //then return back the meal info
    } else { 
      return false; //if false nothing happens
    }
  })

  if(mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid');
    getMealByID(mealID);
  }
});

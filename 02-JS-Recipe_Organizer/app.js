"use strict"
const recipesContainer = document.querySelector('.content__grid');
const getData = async() => {
  try{
    const response = await fetch('db.json');
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.log(`Error fetching data: ${error}`);
  }
}

const getElements = function(selection){
  const element = document.querySelector(selection);
  if(element) {
    return element
  }
  throw new Error(
    `Please check ${selection} selector`
  );
}

class Recipes{
  constructor(element) {
    this.recipe = element;
    this.title = element.querySelector('.content__item__text-title');
    this.img = element.querySelector('.content__item__img');

// Bind functions
    this.displayData = this.displayData.bind(this);
    this.enlargeRecipe = this.enlargeRecipe.bind(this);
    this.normalRecipe = this.normalRecipe.bind(this);
    this.removeEventListeners = this.removeEventListeners.bind(this);
// Events

    this.recipe.addEventListener('click', this.displayData);
    this.recipe.addEventListener('mouseover', this.enlargeRecipe);
    this.recipe.addEventListener('mouseout', this.normalRecipe);
  }

  displayData = function() {
    console.log(`Recipe : ${this.title.textContent}`);
  }

  enlargeRecipe = function() {
    this.recipe.style.transform = 'scale(1.05)';
    this.recipe.style.transition = 'transform 200ms';
  }

  normalRecipe = function() {
    this.recipe.style.transform = 'scale(1)';
    this.recipe.style.transition = 'transform 200ms'
  }

  removeEventListeners = function() {
    this.recipe.removeEventListeners('mouseover', this.enlargeRecipe);
    this.recipe.removeEventListeners('mouseout', this.normalRecipe);
  }
}

 const displayRecipes = function(data){
    let recipeItem = document.createElement('div');
    recipeItem.className = 'content__item';
    recipesContainer.appendChild(recipeItem);
    console.log(data.imgSrc);
    // Img
    let recipeImgBox = document.createElement('div');
    recipeImgBox.className = 'content__item__img-box';
    let recipeImg = document.createElement('img')
    recipeImg.className = 'content__item__img';
    recipeImg.src = data.imgSrc;
    recipeImgBox.appendChild(recipeImg);
    recipeItem.appendChild(recipeImgBox);
    
    // Time
    let recipeTimeContainer = document.createElement('div');
    recipeTimeContainer.className = 'content__item__img-time';

    let recipeTimeIcon = document.createElement('span');
    recipeTimeIcon.className = 'material-symbols-outlined';
    recipeTimeIcon.textContent = 'schedule';
    recipeTimeContainer.appendChild(recipeTimeIcon);

    let recipeTimeText = document.createElement('span');
    recipeTimeText.textContent = `${data.time} min`;
    recipeTimeContainer.appendChild(recipeTimeText);
    recipeImgBox.appendChild(recipeTimeContainer);
    
    // Content
    let content = document.createElement('div');
    content.className = 'content__item__text';
    let title = document.createElement('h3');
    title.className ='content__item__text-title';
    title.textContent = data.title;
    let desc = document.createElement('p');
    desc.className = 'content__item__text-desc';
    desc.textContent = data.description;
    let btn = document.createElement('button');
    btn.className = 'content__item__text-btn';
    btn.textContent = 'More';

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(btn);
    recipeItem.appendChild(content);

    new Recipes(recipeItem);
  }



getData()
.then((data) => {
  data.forEach((item) => {
    displayRecipes(item);
  })
})
.catch((err) => {
  console.log(`Rejected, ${err.message}`);
})

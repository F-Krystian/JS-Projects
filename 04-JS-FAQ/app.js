"use strict"
// DOM
const faqItems = [...document.querySelectorAll('.faq__item')];

// Functions
const expandAnswer = function onClickExpandAnswer(item, parent){
  let btn = item.parentElement;
  let answer = parent.querySelector('.faq__item-answer')
  console.log(btn, console.log(answer))

  answer.classList.toggle('expanded');
  btn.classList.toggle('expanded');
}




faqItems.forEach((item)=>{
  let itemBtn = item.querySelector('.faq__item-question-btn');

  itemBtn.addEventListener('click', function(e){
    expandAnswer(e.target, item); 
  });

});
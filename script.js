let containers;
function initDrawers() {
    // Получаем контейнер с контентом
    containers = document.querySelectorAll(".job");
    setHeights();
    wireUpTriggers();
    window.addEventListener("resize", setHeights);
}
initDrawers();
//window.addEventListener("load", initDrawers);

function setHeights() {
    containers.forEach(container => {
        // Получаем контент
        let content = container.querySelector(".job_content");
        content.removeAttribute("aria-hidden");
        // Высота контента, который нужно скрыть/показать
        let heightOfContent = content.getBoundingClientRect().height;
        // Задаем пользовательские свойства CSS с высотой контента
        container.style.setProperty("--containerHeight", `${heightOfContent}px`);
        // Когда высота считана и задана
        setTimeout(e => {
            container.classList.add("height-is-set");
            content.setAttribute("aria-hidden", "true");
        }, 0);
    });
}

function wireUpTriggers() {
    containers.forEach(container => {
        // Получаем все элементы-триггеры
        let btn = container.querySelector(".job_button");
        // Получаем контент
        let content = container.querySelector(".job_content");
        btn.addEventListener("click", () => {
            btn.setAttribute("aria-expanded", btn.getAttribute("aria-expanded") === "false" ? "true" : "false");
            container.setAttribute(
                "data-drawer-showing",
                container.getAttribute("data-drawer-showing") === "true" ? "false" : "true"
            );
            content.setAttribute(
                "aria-hidden",
                content.getAttribute("aria-hidden") === "true" ? "false" : "true"
            );
        });
    });
}

//Бургер меню
const burger = document.querySelector(".burger_menu_inner");
const burgerButton = document.querySelector(".burger");
const headerFixed = document.querySelector(".header_inner")
burgerButton.addEventListener('click', ()=>{
    burger.classList.toggle('burger_menu_inner--visible');
    headerFixed.classList.toggle('header_fixed');
    burgerButton.classList.toggle('burger--active')
})

//Слайдер 
class Slider {
    constructor(containerSelector, slideSelector, countSlidesShow,otherElementsWidth) {
      this.container = document.querySelector(containerSelector);
      this.slides = this.container.querySelectorAll(slideSelector);
      this.currentPosition = 0;
      this.countSlidesShow=countSlidesShow;
      this.sliderItemsWidth = this.slides[0].offsetWidth;
      this.slideMarginRight = parseInt(window.getComputedStyle(this.slides[0]).marginRight);
      this.slidesWidth = (this.sliderItemsWidth + this.slideMarginRight) * this.slides.length - this.slideMarginRight - otherElementsWidth;
      this.container.style.width = `${this.slidesWidth}px`;
    }
  
    moveSlide(direction) {
      if (direction === 'prev') {
        if (this.currentPosition > 0) {
            this.currentPosition--;
            this.container.style.transform = `translateX(-${(this.sliderItemsWidth + this.slideMarginRight) * this.currentPosition}px)`;
          } else {
            this.currentPosition = this.slides.length - this.countSlidesShow;
            this.container.style.transform = `translateX(-${(this.sliderItemsWidth + this.slideMarginRight) * this.currentPosition}px)`;
          }
      } else if (direction === 'next') {
        if (this.currentPosition < this.slides.length - this.countSlidesShow) {
            this.currentPosition++;
            this.container.style.transform = `translateX(-${(this.sliderItemsWidth + this.slideMarginRight) * this.currentPosition}px)`;
          } else {
            this.currentPosition = 0;
            this.container.style.transform = `translateX(0)`;
          }
      }
    }
  }
const slider = new Slider('.slides', '.slide', 4, 0);
const prevButton = document.querySelectorAll(".arrow_left");
const nextButton = document.querySelectorAll(".arrow_right");
prevButton[0].addEventListener('click', () => slider.moveSlide('prev'));
nextButton[0].addEventListener('click', () => slider.moveSlide('next'));




// слайдер в библиотеке
const buttonTopicWidth = document.querySelector('.topic_button').offsetWidth;
const sliderTopic = new Slider('.topics', '.topic_column',7,buttonTopicWidth);
prevButton[1].addEventListener('click', () => sliderTopic.moveSlide('prev'));
nextButton[1].addEventListener('click', () => sliderTopic.moveSlide('next'));

//Счетчик книг и статей
let booksBtn = document.querySelector('.books_btn');
let articlesBtn = document.querySelector('.articles_btn');
let countArt = document.querySelectorAll('.articles').length;
const books = document.querySelectorAll('.books');
let countBooks = books.length;

booksBtn.innerHTML = `Книги (${countBooks})`;
articlesBtn.innerHTML = `Статьи (${countArt})`;

//Фильтрация по темам
let unactiveBtn = () =>{
    topicsBtn.forEach(aciveBtn =>{aciveBtn.classList.remove('button--active');})
}
booksBtn.addEventListener('click', ()=>{
    articlesBtn.classList.remove('button--active')
    booksBtn.classList.add('button--active');
    document.querySelector('.library_cards').classList.remove('filter-hidden');
    books.forEach(book =>{book.classList.remove('filter-hidden')})
    unactiveBtn();
});

articlesBtn.addEventListener('click', ()=>{
    articlesBtn.classList.add('button--active');
    booksBtn.classList.remove('button--active');
    document.querySelector('.library_cards').classList.add('filter-hidden');

});

const topicsBtn = document.querySelectorAll('.lib-topic');
topicsBtn.forEach(btn=>{
    btn.addEventListener('click', raz,false);
})


function raz() {
    let countFilter=0;
    unactiveBtn();
    this.classList.add('button--active');
    for(let i = 0; i < countBooks; i++){
        let blockBookSubject=books[i].querySelectorAll('.books-subject');
      
        for(let j = 0; j<blockBookSubject[0].childNodes.length; j++){
            let check =blockBookSubject[0].childNodes[j].innerText;
            if (check !== undefined){
                if(blockBookSubject[0].childNodes[j].innerText.toUpperCase()==this.value.toUpperCase()){countFilter++;}
            }
            
        }
        if(countFilter==0 ){
            books[i].classList.add('filter-hidden');
        }
        else{
            books[i].classList.remove('filter-hidden');
        }
        countFilter=0;
        
    }
   
}
//   alert(this.value);  }



//Кнопка "читать больше"
function handleShowMoreClick() {
    bookItems += 8;
    const arrayBooks = Array.from(document.querySelector('.library_cards').children);
    const visibleBooks = arrayBooks.slice(bookItems - 8, bookItems);
    visibleBooks.forEach(el => el.classList.add('is-visible'));
  
    if (bookItems >= arrayBooks.length) {
      showMoreBtn.innerHTML = 'Свернуть';
      showMoreBtn.classList.add('rotate-arrow-down');
      showMoreBtn.removeEventListener('click', handleShowMoreClick);
      showMoreBtn.addEventListener('click', handleHideBooksClick);
    }
  }
  
  function handleHideBooksClick() {
    const arrayBooks = Array.from(document.querySelector('.library_cards').children);
    arrayBooks.slice(8).forEach(el => el.classList.remove('is-visible'));
    showMoreBtn.innerHTML = 'Читать больше';
    showMoreBtn.classList.remove('rotate-arrow-down');
    bookItems=8;
    showMoreBtn.removeEventListener('click', handleHideBooksClick);
    showMoreBtn.addEventListener('click', handleShowMoreClick);
  }
  
  const showMoreBtn = document.querySelector('.show_more');
  let bookItems = 8;
  
  showMoreBtn.addEventListener('click', handleShowMoreClick);
  

const quoteDiv = document.querySelector('.content__quote')
const authorDiv = document.querySelector('.content__author')
const btn = document.querySelector('.content__btn')
const enUrl = 'https://favqs.com/api/qotd'
const ruUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/file-storage/random-jokes/quotes.json'
const image = document.querySelector('.content__img img')
const langBtn = document.querySelector('.header__lang')
const btnHtml = document.querySelector('.content__button')
let isEng = true
// Getting elements to change theme
const body = document.querySelector('body')
const headerLogo = document.querySelector('.header__logo')
const headerControl = document.querySelector('.header__control')
const contentImage = document.querySelector('.content__img')
const contentButton = document.querySelector('.content__button')
const contentQuote = document.querySelector('.content__quote')
const contentAuthor = document.querySelector('.content__author')
// 
const themeBtn = document.querySelector('.header__theme')
getQuote('https://favqs.com/api/qotd')
randomImage()

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function themeChanger() {
    body.classList.toggle('body-light')
    headerLogo.classList.toggle('header__logo-light')
    headerControl.classList.toggle('header__control-light')
    contentImage.classList.toggle('content__img-light')
    contentButton.classList.toggle('content__button-light')
    contentQuote.classList.toggle('content__quote-light')
    contentAuthor.classList.toggle('content__author-light')
}

let dataLength, randomQuote
function getQuote(requestUrl){
fetch(requestUrl)
    .then( res => res.json())
    .then((data) => {
        if(isEng) {
            quoteDiv.innerHTML = data.quote.body
            authorDiv.innerHTML = data.quote.author    
        } else {
            dataLength = data.length
            randomQuote = data[randomInteger(0, dataLength)]
            quoteDiv.innerHTML = randomQuote.text
            authorDiv.innerHTML = randomQuote.author
        }
});
}

function resetQuote() {
    if(isEng) {
        getQuote(enUrl)
    } else {
        getQuote(ruUrl)
    }
    randomImage()
}
function langChange() {
    if(isEng) {
        btnHtml.innerHTML = 'Нажмите, чтобы обновить цитату'
        isEng = !isEng
    } else {
        btnHtml.innerHTML = 'Click to get random quote'
        isEng = !isEng
    }
    resetQuote()
}

btn.addEventListener('click', resetQuote)
themeBtn.addEventListener('click', themeChanger)
langBtn.addEventListener('click', langChange)
function randomImage() {
    fetch('https://api.thecatapi.com/v1/images/search')
    .then( res => res.json())
    .then((data) => {
        image.src = data[0].url
    })
}


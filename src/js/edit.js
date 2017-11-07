const baseURL = 'http://localhost:3000'
const container = document.querySelector('#get-all-container')
const posterContainer = document.querySelector('#moviePoster')

document.addEventListener("DOMContentLoaded", () => {
  let movieId = getId().replace(/['"]+/g, '')
  axios.get(`${baseURL}/${movieId}`)
    .then(result => {
        loadContent(result)
    })
})

function getId () {
    let url = window.location.href
    var regex = new RegExp("[?&]" + 'movieId' + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadContent(content){
    const posterUrl = JSON.stringify(content.data.data.movieUrl)
    posterContainer.innerHTML = `
        <img src=${posterUrl} alt='movie poster'>
    `

    const id = JSON.stringify(content.data.data.id).replace(/['"]+/g, '')
    const title = JSON.stringify(content.data.data.title).replace(/['"]+/g, '')
    const director = JSON.stringify(content.data.data.director).replace(/['"]+/g, '')
    const year = JSON.stringify(content.data.data.year).replace(/['"]+/g, '')
    const rating = JSON.stringify(content.data.data.rating).replace(/['"]+/g, '')
    const movieUrl = JSON.stringify(content.data.data.movieUrl).replace(/['"]+/g, '')
    container.innerHTML += `
        <hr>
        <div class= 'row post' id='${id}'>
            <div class='col-2 title'>
                <input type='text' value='${title}' id='title'>
            </div>
            <div class='col-2 director'>
                <input type='text' value='${director}' id='director'>
            </div>
            <div class='col-2 year'>
                <input type='number' min=1900 value='${year}' id='year'>
            </div>
            <div class='col-2 rating'>
                <input type='number' min=1 max=5 value='${rating}' id='rating'>
            </div>
            <div class='col-2'>
                <input type='url' value='${movieUrl}' id='movieUrl'>
            </div>
            <div class='col-2'>
                <button class='delete' data-iddel='${id}' onClick='deleteClick(this)'>Delete</button>
            </div>
        </div>
        <div class='row'>
            <button data-iddel='${id}' onClick='finishEdit(this)' id='submitButton'>Submit Changes</button>
        </div>
      `
}

function finishEdit (content) {
    const container = document.querySelector('#status-container')
    const movieId = content.getAttribute('data-iddel')
    const titleInput = document.querySelector('#title').value
    const directorInput = document.querySelector('#director').value
    const yearInput = document.querySelector('#year').value
    const ratingInput = document.querySelector('#rating').value
    const movieUrlInput = document.querySelector('#movieUrl').value

    axios.put(`${baseURL}/${movieId}`, { title: titleInput, director: directorInput, year: yearInput, rating: ratingInput, movieUrl: movieUrlInput })
    .then(result => {
        container.innerHTML = `
            <p>${result.data.data.title} successfully edited!</p>
          `
    })
}
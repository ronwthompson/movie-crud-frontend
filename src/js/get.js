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
    const link = `location.href='./edit.html?movieId=${id}'`
    container.innerHTML += `
        <hr>
        <div class= 'row post' id='${id}'>
            <div class='col-2 title'>
                <p>${title}</p>
            </div>
            <div class='col-2 director'>
                <p>${director}</p>
            </div>
            <div class='col-2 year'>
                <p>${year}</p>
            </div>
            <div class='col-2 rating'>
                <p>${rating}</p>
            </div>
            <div class='col-2'>
                <button class='edit' onClick=${link}>Edit</button>
            </div>
            <div class='col-2'>
                <button class='delete' data-iddel='${id}' onClick='deleteClick(this)'>Delete</button>
            </div>
        </div>
      `
}
const baseURL = 'http://localhost:3000'
const container = document.querySelector('#get-all-container')

document.addEventListener("DOMContentLoaded", () => {
  axios.get(`${baseURL}/`)
    .then(result => {
        loadContent(result)
    })
})

function loadContent(content){
    for (let i = content.data.data.length-1; i >= 0; i--){
        const id = JSON.stringify(content.data.data[i].id).replace(/['"]+/g, '')
        const title = JSON.stringify(content.data.data[i].title).replace(/['"]+/g, '')
        const director = JSON.stringify(content.data.data[i].director).replace(/['"]+/g, '')
        const year = JSON.stringify(content.data.data[i].year).replace(/['"]+/g, '')
        const rating = JSON.stringify(content.data.data[i].rating).replace(/['"]+/g, '')
        const link = `location.href='./edit.html?movieId=${id}'`
        container.innerHTML += `
            <hr>
            <div class= 'row post' id='${id}'>
                <div class='col-2 title'>
                    <p><a href='./get.html?movieId=${id}'>${title}</a></p>
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
}
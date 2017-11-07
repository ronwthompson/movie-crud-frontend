const baseURL = 'http://localhost:3000'

document.querySelector('#submitContent').addEventListener("click", () => {
  const container = document.querySelector('#status-container')
  const titleInput = document.querySelector('#title').value
  const directorInput = document.querySelector('#director').value
  const yearInput = document.querySelector('#year').value
  const ratingInput = document.querySelector('#rating').value
  const movieUrlInput = document.querySelector('#movieUrl').value

  axios.post(`${baseURL}/`, { title: titleInput, director: directorInput, year: yearInput, rating: ratingInput, movieUrl: movieUrlInput })
    .then(result => {
        container.innerHTML = `
            <p>${result.data.data.title} successfully added to the database!</p>
          `
    })
})
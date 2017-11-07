function deleteClick(id){
    let data = id.getAttribute('data-iddel')
    console.log(id)
    axios.delete(`${baseURL}/${data}`)
      .then(result => {
        axios.get(`${baseURL}/`)
        .then(result => {
            container.innerHTML = `
            <div class='row'>
                <div class='col-2'>
                    <h2>Title</h2>
                </div>
                <div class='col-2'>
                    <h2>Director</h2>
                </div>
                <div class='col-2'>
                    <h2>Year</h2>
                </div>
                <div class='col-2'>
                    <h2>My Rating</h2>
                </div>
                <div class='col-2'>
                </div>
                <div class='col-2'>
                </div>
            </div>
            `
            loadContent(result)
        })
      })
}
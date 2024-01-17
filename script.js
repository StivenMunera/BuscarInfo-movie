document.getElementById('searchButton').addEventListener('click', searchMovies)
document.getElementById('searchInput').addEventListener('keypress', function (event) {
    // Verifica si la tecla presionada es "Enter" (código 13)
    if (event.key === 'Enter') {
        // Llama a la función de búsqueda
        searchMovies();
    }
});
let api_key = 'cbe7459e00075aac45f21122e1d6ffcb'
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'
//--url 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=cbe7459e00075aac45f21122e1d6ffcb'


function searchMovies(){
    let searchInput = document.getElementById('searchInput').value
    fetch (`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then(response => response.json())
    .then(response => displayMovies(response))
}

function displayMovies(movies) {
    let resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    if (!movies.results || !Array.isArray(movies.results) || movies.results.length === 0) {
        resultContainer.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        return;
    }
    movies.results.forEach(movie =>{
        let movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        let title = document.createElement('h2')
        title.textContent = movie.title

        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date

        let overview = document.createElement('p')
        overview.textContent = movie.overview

        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath

        movieDiv.appendChild(poster)
        movieDiv.appendChild(title)
        movieDiv.appendChild(releaseDate)
        movieDiv.appendChild(overview)

        resultContainer.appendChild(movieDiv)
    })
}
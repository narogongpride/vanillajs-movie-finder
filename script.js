// Show modal when Details button has been clicked (Bootstrap v4)
const myModal = document.getElementById('movieDetailModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})

// Movie cards element
const showCards = movie => {
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                        <a href="#" 
                            class="btn btn-primary modal-detail-button" 
                            data-toggle="modal" 
                            data-target="#movieDetailModal"
                            data-imdbid="${movie.imdbID}">Details</a>
                    </div>
                </div>
            </div>`;
};

// Movie detail element (when Details button has been clicked, this stuff will be shown)
const showMovieDetail = dataMD => {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3 my-3">
                        <img src=${dataMD.Poster} class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${dataMD.Title} (${dataMD.Year})</h4>
                            </li>
                            <li class="list-group-item">
                                <strong>Director: </strong>${dataMD.Director}
                            </li>
                            <li class="list-group-item">
                                <strong>Actors: </strong>${dataMD.Actors}
                            </li>
                            <li class="list-group-item">
                                <strong>Writer: </strong>${dataMD.Writer}
                            </li>
                            <li class="list-group-item">
                                <strong>Plot: </strong>
                                <br>${dataMD.Plot}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
};

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function () {
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await fetchMovies(inputKeyword.value);
        updateMovies(movies);
    } catch (error) {
        console.log(error);
    }
});

// Fetching keyword result
const fetchMovies = keyword => {
    return fetch(`http://www.omdbapi.com/?apikey=9433029a&s=${keyword}`)
        .then(response => {
            if (response.ok === false) {
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .then(response => {
            if (response.Response === "False") {
                throw new Error(response.Error);
            }

            return response.Search;
        });
};

const updateMovies = movies => {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = cards;
};


// Binding function
document.addEventListener('click', async function (el) {
    try {
        if (el.target.classList.contains('modal-detail-button')) {
            const imdbid = el.target.dataset.imdbid;
            const movieDetail = await fetchMovieDetail(imdbid);
            updateMovieDetail(movieDetail);
        }
    } catch (err) {
        alert('Details will not found, better luck next time.');
    }

});

const fetchMovieDetail = imdbid => {
    return fetch(`http://www.omdbapi.com/?apikey=9433029a&i=${imdbid}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json();
        })
        .then(dataMD => {
            if (dataMD.Response === "False") {
                throw new Error(dataMD.Error)
            }

            return dataMD;
        });
};

const updateMovieDetail = dataMD => {
    const movieDetail = showMovieDetail(dataMD);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
};



// fetch('http://api.aladhan.com/v1/timingsByAddress?address=surabaya')
//     .then(response => response.json())
//     .then(response => console.log(response))

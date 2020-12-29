// Tampilkan modal ketika tombol Details diklik (Bootstrap v4)
const myModal = document.getElementById('movieDetailModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})

// element movie cards
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

// element movie detail yang mengisi modal
const showMovieDetail = movdet => {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src=${movdet.Poster} class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${movdet.Title} (${movdet.Year})</h4>
                            </li>
                            <li class="list-group-item">
                                <strong>Director: </strong>${movdet.Director}
                            </li>
                            <li class="list-group-item">
                                <strong>Actors: </strong>${movdet.Actors}
                            </li>
                            <li class="list-group-item">
                                <strong>Writer: </strong>${movdet.Writer}
                            </li>
                            <li class="list-group-item">
                                <strong>Plot: </strong>
                                <br>${movdet.Plot}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`;
};

const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', function () {
    const searchKeyword = document.querySelector('.input-keyword');

    fetch(`http://www.omdbapi.com/?apikey=9433029a&s=${searchKeyword.value}`)
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            const movies = response.Search;
            let cards = '';
            movies.forEach(movie => cards += showCards(movie));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

            // Detail button clicked
            const modalDetailButton = document.querySelectorAll('.modal-detail-button');
            modalDetailButton.forEach(btn => {
                btn.addEventListener('.click', function () {
                    fetch(`http://www.omdbapi.com/?apikey=9433029a&i=${imdbid}`)
                        .then(res => res.json())
                        .then(movdet => {
                            const movieDetail = showMovieDetail(movdet);
                            const modalBody = document.querySelector('.modal-body');
                            modalBody.innerHTML = movieDetail;
                        });
                });
            })
        });
});




// fetch pake ajax jquery
$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
})

$('.search-button').on('click', function () {
    $.ajax({
        url: "http://www.omdbapi.com/?apikey=9433029a&s=" + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(movie => {
                cards += showCards(movie);
            });
            $('.movie-container').html(cards);

            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: "http://www.omdbapi.com/?apikey=9433029a&i=" + $(this).data('imdbid'),
                    success: movdet => {
                        const movieDetail = showMovieDetail(movdet);
                        $('.modal-body').html(movieDetail)
                    },
                    error: err => {
                        console.log(err);
                    }
                });
                console.log($(this).data('imdbid'))
            });
        },
        error: err => {
            console.log(err);
        }
    });
});

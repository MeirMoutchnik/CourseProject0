let movies = [];
let index = 0;
let pendingDeleteRow = null;


const deleteMovieModal = document.getElementById("delete-movie-modal");
const deleteMovieConfirm = document.getElementById("delete-movie-confirm");
const deleteMovieCancel = document.getElementById("delete-movie-cancel");

function addMovie(e) {
    e.preventDefault();
    const genre = document.getElementById("genre").value;
    const filmName = document.getElementById("film-name").value;
    const director = document.getElementById("director").value;
    const duration = document.getElementById("duration").value;
    const price = document.getElementById("price").value;
    const poster = document.getElementById("poster").value;
    const date = document.getElementById("date").value;
    let movie = {
        genre: genre,
        filmName: filmName,
        director: director,
        duration: duration,
        price: price,
        poster: poster,
        date: date
    };
    movies.push(movie);
    console.log(movies);
    let row = document.createElement("tr");
    row.id = `row-${index}`;
    row.innerHTML = `
        <td>${genre}</td>
        <td>${filmName}</td>
        <td>${director}</td>
        <td>${duration}</td>
        <td>${price}</td>
        <td>${poster}</td>
        <td>${date}</td>
        <td><button class="delete-btn"  onclick="deleteMovie(${index})"> ${index}   מחק</button></td>
    `;
   document.getElementById("cinema-table-body").appendChild(row);
   document.getElementById("cinema-form").reset();
   index++;
}

function deleteMovie(index) { 
    let ok = confirm("האם אתה בטוח שברצונך למחוק את הסרט?");
    if (ok) {
        movies.splice(index, 1);
        console.log(movies);
        let row = document.getElementById(`row-${index}`);
        row.remove();
    }
    else {
        alert("הסרט לא נמחק");
    }
}
function confirmDeleteMovie() {
    if (!pendingDeleteRow) return;
    const row = pendingDeleteRow;
    const tbody = row.parentElement;
    const index = Array.prototype.indexOf.call(tbody.children, row);
    if (index !== -1) {
        movies.splice(index, 1);
    }
    row.remove();
    closeDeleteMovieModal();
    console.log(movies);
}

if (deleteMovieConfirm) {
    deleteMovieConfirm.addEventListener("click", confirmDeleteMovie);
}
if (deleteMovieCancel) {
    deleteMovieCancel.addEventListener("click", closeDeleteMovieModal);
}

function saveMovies() {
    localStorage.setItem("movies", JSON.stringify(movies));
}

function getMovies() {
    let movies = localStorage.getItem("movies");
    if (movies) {
        movies = JSON.parse(movies);
    }
    return movies;
}

document.getElementById("cinema-form").addEventListener("submit", addMovie);
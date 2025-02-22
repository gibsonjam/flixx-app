const global = {
  currentPage: window.location.pathname,
};

// Display 20 most popular movies
async function displayPopularMovies() {
  const { results } = await fetchApiData('movie/popular');

  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
            : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    </div>;`;

    document.getElementById('popular-movies').appendChild(div);
  });
}

// Display 20 most high rated tv shows
async function displayRatedShows() {
  const { results } = await fetchApiData('tv/top_rated');

  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500/${show.poster_path}" class="card-img-top" alt="${show.title}" />`
            : `<img src="images/no-image.jpg" class="card-img-top" alt="${show.name}" />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Air Date: ${show.first_air_date}</small>
        </p>
      </div>
    </div>;`;

    document.getElementById('popular-shows').appendChild(div);
  });
}

// Display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchApiData(`movie/${movieId}`);
  console.log(movie);

  const divTop = document.createElement('div');
  const divBottom = document.createElement('div');

  divTop.classList.add('details-top');
  divBottom.classList.add('details-bottom');

  divTop.innerHTML = `
          <div>
          ${
            movie.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
              : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)}
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>`;

  divBottom.innerHTML = `
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> ${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span> ${
              movie.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            }</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map(company => `<span>${company.name}</span>`)
            .join(', ')}
        </div>`;

  document.querySelector('#movie-details').appendChild(divTop);
  document.querySelector('#movie-details').appendChild(divBottom);
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
  const API_KEY = '083d5692de280873c184435311901117';
  const apiUrl = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${apiUrl}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');

  if (global.currentPage === '/') {
    links[0].classList.add('active');
  } else {
    links[1].classList.add('active');
  }
}

// Init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      displayRatedShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('tv details');
      break;
    case 'search.html':
      console.log('search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);

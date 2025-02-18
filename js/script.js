const global = {
  currentPage: window.location.pathname,
};

async function displayPopularMovies() {
  console.log(fetchApiData('movie/popular'));
}

// Fetch data from TMDB API
async function fetchApiData(endpoint) {
  const API_KEY = '083d5692de280873c184435311901117';
  const apiUrl = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${apiUrl}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();

  return data;
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
      console.log('home');
      break;
    case '/shows.html':
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('movie details');
      break;
    case '/tv-details.html':
      console.log('tv details');
      break;
    case 'search.html':
      console.log('search');
      break;
  }

  highlightActiveLink();
  displayPopularMovies();
}

document.addEventListener('DOMContentLoaded', init);

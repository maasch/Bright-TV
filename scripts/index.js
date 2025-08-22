const moviePapularGrid = document.querySelector('.movie-popular-grid');
const tvPapularGrid = document.querySelector('.tv-popular-grid');
const ApiKey ='77ba7f3c49c3599245a4bd12128a1695' ;
const urlMovie =`https://api.themoviedb.org/3/trending/movie/day?api_key=${ApiKey}&language=en-US&page=1`; 
const urlTv =`https://api.themoviedb.org/3/trending/tv/day?api_key=${ApiKey}&language=en-US&page=1`; 

// Fetch popular movies from TMDB API
  fetch(urlMovie)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(item => {
        const papularItem = document.createElement('div');
        papularItem.classList.add('popular-item');

        const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/no-image.png';
        papularItem.innerHTML = `
          <img src="${imageUrl}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3> 
        `;
        
        moviePapularGrid.appendChild(papularItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));  

// Fetch popular Tv show from TMDB API
  fetch(urlTv)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(item => {
        const papularItem = document.createElement('div');
        papularItem.classList.add('popular-item');

        const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'images/no-image.png';
        papularItem.innerHTML = `
          <img src="${imageUrl}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3>
        `;
        
        tvPapularGrid.appendChild(papularItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error)); 

    
// Scroll buttons functionality for both grids
      function setupScrollControlsFor(container) {
        if (!container) return;
        const parent = container.parentElement;
        if (!parent) return;
        const leftBtn = parent.querySelector('.scroll-left');
        const rightBtn = parent.querySelector('.scroll-right');
        if (!leftBtn || !rightBtn) return;

        function updateButtons() {
          if (container.scrollLeft > 0) {
            leftBtn.style.display = 'flex';
          } else {
            leftBtn.style.display = 'none';
          }
          if (container.scrollLeft + container.clientWidth < container.scrollWidth - 5) {
            rightBtn.style.display = 'flex';
          } else {
            rightBtn.style.display = 'none';
          }
        }

        container.addEventListener('scroll', updateButtons);
        leftBtn.addEventListener('click', () => {
          container.scrollBy({ left: -200, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', () => {
          container.scrollBy({ left: 200, behavior: 'smooth' });
        });

        updateButtons();
        window.addEventListener('resize', updateButtons);
      }

      setupScrollControlsFor(moviePapularGrid);
      setupScrollControlsFor(tvPapularGrid);
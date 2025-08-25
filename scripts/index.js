const moviePapularGrid = document.querySelector('.movie-popular-grid');
const tvPapularGrid = document.querySelector('.tv-popular-grid');
const recentlyViewedContainer = document.querySelector('.recently-viewed-grid');
const ApiKey ='77ba7f3c49c3599245a4bd12128a1695' ;
const urlMovie =`https://api.themoviedb.org/3/trending/movie/day?api_key=${ApiKey}&language=en-US&page=1`; 
const urlTv =`https://api.themoviedb.org/3/trending/tv/day?api_key=${ApiKey}&language=en-US&page=1`; 
let recentlyViewedArry = JSON.parse(localStorage.getItem('recentlyViewed'))||[];
const noImage ='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';

 // Clear duplicates in recently viewed array based on 'id' property
 function updateRecentlyViewed(item){
   // Add the clicked item to the recently viewed array
    if (!recentlyViewedArry.some(viewedItem => viewedItem.id === item.id)) {
      recentlyViewedArry.unshift(item); // Add to the beginning of the array
      // Limit to 10 recently viewed items
      if (recentlyViewedArry.length > 10) {
        recentlyViewedArry = recentlyViewedArry.slice(0,10); // keep the array size fixed at 10
      }
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewedArry));
    }
 }
// Fetch popular movies from TMDB API
  fetch(urlMovie)
    .then(response => response.json())
    .then(data => {
      data.results.forEach( item => {
        const papularItem = document.createElement('a');
        papularItem.classList.add('popular-item');
        papularItem.href =`details.html?id=${item.id}&catagory=${item.media_type}`;
        const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w780${item.poster_path}` : noImage;
        papularItem.innerHTML = `
          <img src="${imageUrl}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3> 
        `;
        papularItem.addEventListener('click', () => {
         updateRecentlyViewed(item);
        })
        moviePapularGrid.appendChild(papularItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));  

// Fetch popular Tv show from TMDB API
  fetch(urlTv)
    .then(response => response.json())
    .then(data => {
      data.results.forEach( item => {
        const papularItem = document.createElement('a');
        papularItem.classList.add('popular-item');
        papularItem.href = `details.html?id=${item.id}&catagory=${item.media_type}`;

        const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w780${item.poster_path}` : noImage;
        papularItem.innerHTML = `
          <img src="${imageUrl}" alt="${item.title || item.name}">
          <h3>${item.title || item.name}</h3>
        `;
        papularItem.addEventListener('click', () => {
          updateRecentlyViewed(item)
        })
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
  setupScrollControlsFor(recentlyViewedContainer);



// Display recently viewed items
function displayRecentlyViewed(){
  // Clear existing items first
  recentlyViewedContainer.innerHTML = '';
  
  if (recentlyViewedArry.length > 0) {
    recentlyViewedContainer.parentElement.style.display = 'block';
    recentlyViewedArry.forEach(item => {
      const papularItem = document.createElement('a');
      papularItem.classList.add('popular-item');
      papularItem.href = `details.html?id=${item.id}&catagory=${item.media_type}`;
      papularItem.innerHTML =
      `
        <img src="${item.poster_path ? `https://image.tmdb.org/t/p/w780${item.poster_path}` : noImage}" alt="${item.title || item.name}">
        <h3>${item.title || item.name}</h3>
      `;   
      recentlyViewedContainer.appendChild(papularItem);
    });
  } else {
    // Hide the container when there are no items
    recentlyViewedContainer.parentElement.style.display = 'none';
  }
}
displayRecentlyViewed()

// Clear all button
if(recentlyViewedContainer.parentElement){
  const clearAllBtn = document.querySelector('.clear-all');
  clearAllBtn.addEventListener('click' , ()=>{
    recentlyViewedArry = [];
    localStorage.removeItem('recentlyViewed');    
    displayRecentlyViewed()
  })
}


// Search functionality using OMDB API
   const searchBtn = document.getElementById('search-button');
    searchBtn.addEventListener('click', () => {
      const searchInput = document.getElementById('search-input');
      const searchKey = searchInput.value.trim();
      if(!searchKey) return;
      searchdisplay(searchKey);
    })


    async function  searchdisplay(key){  
      const movieUrl =`https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&query=${encodeURIComponent(key)}`; 
      const tvUrl =`https://api.themoviedb.org/3/search/tv?api_key=${ApiKey}&query=${encodeURIComponent(key)}`;

      const tvResults = await fetch(tvUrl)
        .then(response =>response.json())
        .then(data =>{
          return data.results; 
      }).catch(err =>{
        console.error(`Something went wrong ,Try again : error ${err}`)
        throw `Something went wrong ,Try again : error ${err}`
      })

      const movieResults = await fetch(movieUrl)
        .then(response =>response.json())
        .then(data =>{
          return data.results; 
      }).catch(err =>{
        console.error(`Something went wrong ,Try again : error ${err}`)
        throw `Something went wrong ,Try again : error ${err}`
      })
      


      function searchItems(array , containerClass){
          array.forEach(item =>{
            const searchContainer = document.querySelector(`.${containerClass}`)
            const searchItem = document.createElement('a');
            searchItem.classList.add('search-item');
            searchItem.href = `details.html?id=${item.id}&catagory=${item.media_type || containerClass.includes('movie') ? 'movie' : 'tv'}`;
            searchItem.innerHTML = `
              <img src="${item.poster_path? `https://image.tmdb.org/t/p/w780${item.poster_path}` : noImage }" alt="${item.title}">
              <h3>${item.title || item.name}</h3>
            `

            searchItem.addEventListener('click', () => {
              item.media_type = containerClass.includes('movie') ? 'movie' : 'tv';
              updateRecentlyViewed(item);
            })
            searchContainer.appendChild(searchItem)
          })
      } 
      let html = `
        <section class="movie-search" style="display: ${movieResults.length > 0 ? 'block' : 'none'}">
          <h2>Movie</h2>
          <div class="movie-search-grid scroll-btns">
            <button class="scroll-right"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAwdjI0SDBWMHpNMTIuNTkzIDIzLjI1OGwtLjAxMS4wMDJsLS4wNzEuMDM1bC0uMDIuMDA0bC0uMDE0LS4wMDRsLS4wNzEtLjAzNXEtLjAxNi0uMDA1LS4wMjQuMDA1bC0uMDA0LjAxbC0uMDE3LjQyOGwuMDA1LjAybC4wMS4wMTNsLjEwNC4wNzRsLjAxNS4wMDRsLjAxMi0uMDA0bC4xMDQtLjA3NGwuMDEyLS4wMTZsLjAwNC0uMDE3bC0uMDE3LS40MjdxLS4wMDQtLjAxNi0uMDE3LS4wMThtLjI2NS0uMTEzbC0uMDEzLjAwMmwtLjE4NS4wOTNsLS4wMS4wMWwtLjAwMy4wMTFsLjAxOC40M2wuMDA1LjAxMmwuMDA4LjAwN2wuMjAxLjA5M3EuMDE5LjAwNS4wMjktLjAwOGwuMDA0LS4wMTRsLS4wMzQtLjYxNHEtLjAwNS0uMDE5LS4wMi0uMDIybS0uNzE1LjAwMmEuMDIuMDIgMCAwIDAtLjAyNy4wMDZsLS4wMDYuMDE0bC0uMDM0LjYxNHEuMDAxLjAxOC4wMTcuMDI0bC4wMTUtLjAwMmwuMjAxLS4wOTNsLjAxLS4wMDhsLjAwNC0uMDExbC4wMTctLjQzbC0uMDAzLS4wMTJsLS4wMS0uMDF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE1LjcwNyAxMS4yOTNhMSAxIDAgMCAxIDAgMS40MTRsLTUuNjU3IDUuNjU3YTEgMSAwIDEgMS0xLjQxNC0xLjQxNGw0Ljk1LTQuOTVsLTQuOTUtNC45NWExIDEgMCAwIDEgMS40MTQtMS40MTR6Ii8+PC9nPjwvc3ZnPg=="></button>
            <button class="scroll-left"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAwdjI0SDBWMHpNMTIuNTkzIDIzLjI1OGwtLjAxMS4wMDJsLS4wNzEuMDM1bC0uMDIuMDA0bC0uMDE0LS4wMDRsLS4wNzEtLjAzNXEtLjAxNi0uMDA1LS4wMjQuMDA1bC0uMDA0LjAxbC0uMDE3LjQyOGwuMDA1LjAybC4wMS4wMTNsLjEwNC4wNzRsLjAxNS4wMDRsLjAxMi0uMDA0bC4xMDQtLjA3NGwuMDEyLS4wMTZsLjAwNC0uMDE3bC0uMDE3LS40MjdxLS4wMDQtLjAxNi0uMDE3LS4wMThtLjI2NS0uMTEzbC0uMDEzLjAwMmwtLjE4NS4wOTNsLS4wMS4wMWwtLjAwMy4wMTFsLjAxOC40M2wuMDA1LjAxMmwuMDA4LjAwN2wuMjAxLjA5M3EuMDE5LjAwNS4wMjktLjAwOGwuMDA0LS4wMTRsLS4wMzQtLjYxNHEtLjAwNS0uMDE5LS4wMi0uMDIybS0uNzE1LjAwMmEuMDIuMDIgMCAwIDAtLjAyNy4wMDZsLS4wMDYuMDE0bC0uMDM0LjYxNHEuMDAxLjAxOC4wMTcuMDI0bC4wMTUtLjAwMmwuMjAxLS4wOTNsLjAxLS4wMDhsLjAwNC0uMDExbC4wMTctLjQzbC0uMDAzLS4wMTJsLS4wMS0uMDF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcuOTQgMTMuMDZhMS41IDEuNSAwIDAgMSAwLTIuMTJsNS42NTYtNS42NThhMS41IDEuNSAwIDEgMSAyLjEyMSAyLjEyMkwxMS4xMjIgMTJsNC41OTYgNC41OTZhMS41IDEuNSAwIDEgMS0yLjEyIDIuMTIybC01LjY2LTUuNjU4WiIvPjwvZz48L3N2Zz4="></button>
          </div>
        </section>
 
        <section class="tv-search" style="display: ${tvResults.length > 0 ? 'block' : 'none'}">
          <h2>Tv show</h2>
          <div class="tv-search-grid scroll-btns">
            <button class="scroll-right"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAwdjI0SDBWMHpNMTIuNTkzIDIzLjI1OGwtLjAxMS4wMDJsLS4wNzEuMDM1bC0uMDIuMDA0bC0uMDE0LS4wMDRsLS4wNzEtLjAzNXEtLjAxNi0uMDA1LS4wMjQuMDA1bC0uMDA0LjAxbC0uMDE3LjQyOGwuMDA1LjAybC4wMS4wMTNsLjEwNC4wNzRsLjAxNS4wMDRsLjAxMi0uMDA0bC4xMDQtLjA3NGwuMDEyLS4wMTZsLjAwNC0uMDE3bC0uMDE3LS40MjdxLS4wMDQtLjAxNi0uMDE3LS4wMThtLjI2NS0uMTEzbC0uMDEzLjAwMmwtLjE4NS4wOTNsLS4wMS4wMWwtLjAwMy4wMTFsLjAxOC40M2wuMDA1LjAxMmwuMDA4LjAwN2wuMjAxLjA5M3EuMDE5LjAwNS4wMjktLjAwOGwuMDA0LS4wMTRsLS4wMzQtLjYxNHEtLjAwNS0uMDE5LS4wMi0uMDIybS0uNzE1LjAwMmEuMDIuMDIgMCAwIDAtLjAyNy4wMDZsLS4wMDYuMDE0bC0uMDM0LjYxNHEuMDAxLjAxOC4wMTcuMDI0bC4wMTUtLjAwMmwuMjAxLS4wOTNsLjAxLS4wMDhsLjAwNC0uMDExbC4wMTctLjQzbC0uMDAzLS4wMTJsLS4wMS0uMDF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE1LjcwNyAxMS4yOTNhMSAxIDAgMCAxIDAgMS40MTRsLTUuNjU3IDUuNjU3YTEgMSAwIDEgMS0xLjQxNC0xLjQxNGw0Ljk1LTQuOTVsLTQuOTUtNC45NWExIDEgMCAwIDEgMS40MTQtMS40MTR6Ii8+PC9nPjwvc3ZnPg=="></button>
            <button class="scroll-left"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNCAwdjI0SDBWMHpNMTIuNTkzIDIzLjI1OGwtLjAxMS4wMDJsLS4wNzEuMDM1bC0uMDIuMDA0bC0uMDE0LS4wMDRsLS4wNzEtLjAzNXEtLjAxNi0uMDA1LS4wMjQuMDA1bC0uMDA0LjAxbC0uMDE3LjQyOGwuMDA1LjAybC4wMS4wMTNsLjEwNC4wNzRsLjAxNS4wMDRsLjAxMi0uMDA0bC4xMDQtLjA3NGwuMDEyLS4wMTZsLjAwNC0uMDE3bC0uMDE3LS40MjdxLS4wMDQtLjAxNi0uMDE3LS4wMThtLjI2NS0uMTEzbC0uMDEzLjAwMmwtLjE4NS4wOTNsLS4wMS4wMWwtLjAwMy4wMTFsLjAxOC40M2wuMDA1LjAxMmwuMDA4LjAwN2wuMjAxLjA5M3EuMDE5LjAwNS4wMjktLjAwOGwuMDA0LS4wMTRsLS4wMzQtLjYxNHEtLjAwNS0uMDE5LS4wMi0uMDIybS0uNzE1LjAwMmEuMDIuMDIgMCAwIDAtLjAyNy4wMDZsLS4wMDYuMDE0bC0uMDM0LjYxNHEuMDAxLjAxOC4wMTcuMDI0bC4wMTUtLjAwMmwuMjAxLS4wOTNsLjAxLS4wMDhsLjAwNC0uMDExbC4wMTctLjQzbC0uMDAzLS4wMTJsLS4wMS0uMDF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTcuOTQgMTMuMDZhMS41IDEuNSAwIDAgMSAwLTIuMTJsNS42NTYtNS42NThhMS41IDEuNSAwIDEgMSAyLjEyMSAyLjEyMkwxMS4xMjIgMTJsNC41OTYgNC41OTZhMS41IDEuNSAwIDEgMS0yLjEyIDIuMTIybC01LjY2LTUuNjU4WiIvPjwvZz48L3N2Zz4="></button>
          </div>
        </section>

      `
      document.querySelector('main').innerHTML = html;
      searchItems(movieResults , 'movie-search-grid');
      searchItems(tvResults , 'tv-search-grid');

      const movieSearchGrid = document.querySelector('.movie-search-grid');
      const tvSearchGrid = document.querySelector('.tv-search-grid');

      setupScrollControlsFor(movieSearchGrid);
      setupScrollControlsFor(tvSearchGrid)
      

    }
    

import { libraryItems, updateLibraryItems } from "./library.js";
const searchParams = new URLSearchParams(window.location.search);
const category = searchParams.get('catagory');
const id = searchParams.get('id');
const apiKey = '77ba7f3c49c3599245a4bd12128a1695';
const noImage = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';

document.addEventListener('DOMContentLoaded', () => {
  if (category && id) {
    fetchDetails(category, id);
  } else {
    document.body.innerHTML = '<h2 class="invalid" >Invalid details page. Please go back and try again.</h2>';
  }
}); 


async function fetchDetails(category, id) {
  let url = '';
  if (category === 'movie') {
    url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
  } else if (category === 'tv') {
    url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;
  } else {
    document.body.innerHTML = '<h2 class="invalid" >Invalid category. Please go back and try again.</h2>';
    return;
  }

  const data = await fetch(url)
    .then(response => response.json())
    .then(data => {
      return data   
    }).catch(error =>{
      console.error('Error fetching details:', error);
      document.body.innerHTML = '<h2 class="invalid" >Error fetching details. Please try again later.</h2>';
    })
  

    try{
      let url;
      const apiKey ='e8961e48' ;
      if(data.imdb_id){
        url =`http://www.omdbapi.com?apikey=${apiKey}&i=${data.imdb_id}`;
      }else{
        url =`http://www.omdbapi.com?apikey=${apiKey}&t=${data.original_title || data.original_name}`;
      }


      const extraData = await fetch(url)
      .then(respone => respone.json())
      .then(data => {
        return {
           actors : data.Actors.split(',').map((actor ,index) =>({
             id: index + 1,
             name: actor.trim()
           })),
           director : data.Director ,
           writer : data.Writer , 
           runtimeOmd :data.Runtime,
           imdbRating : data.imdbRating,
           year :data.Year
          }
      })

      let firstDate;
      let lastDate;

      if(data.first_air_date){
        firstDate = new Date(data.first_air_date).getFullYear()
      } else{
        firstDate = ''
      }
      if(data.last_air_date_air_date){
        lastDate = new Date(data.first_air_date).getFullYear()
      } else{
        lastDate = ''
      }

      Object.assign(data , {
        actors : extraData.actors,
        director : extraData.director ,
        writer : extraData.writer , 
        runstimeOmd :extraData.runtimeOmd,
        imdbRating : extraData.imdbRating,
        yearOmdb :extraData.year,
        yearTmdb : firstDate +'-'+ lastDate
      })
      
    }catch(error){
      console.error('Error fetching details:', error);
    }
  displayDetails(data);

  

  if(document.body.querySelector('main')){
    const addTolibrary = document.querySelector('.add-to-library');
    const addBtnText = document.querySelector('.text-add');
    
    // Update button text based on current library state
    const updateButtonText = () => {
      try {
        if (libraryItems.some(item => item && item.id === data.id)) {
          addBtnText.innerText = "Remove from library";
        } else {
          addBtnText.innerText = "Add to library";
        }
      } catch (error) {
        console.error('Error updating button text:', error);
        addBtnText.innerText = "Add to library";
      }
    };
    
    // Set initial button text
    updateButtonText();
    
    addTolibrary.addEventListener('click', ()=>{
      if(addBtnText.innerText==="Add to library"){
        addBtnText.innerText="Remove from library"
        const newLibraryItems = [data, ...libraryItems];
        updateLibraryItems(newLibraryItems);
      }else{
        addBtnText.innerText="Add to library";
        const newLibraryItems = libraryItems.filter(item => item.id !== data.id);
        updateLibraryItems(newLibraryItems);
      }
      
    })
  }

    

}


function displayDetails(data){
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get('catagory');
  
  if(category === 'tv'){
    data.runtime = data.episode_run_time
  }

  document.body.style = `background-image : linear-gradient(to right, 
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.6) 20%,
      rgba(0, 0, 0, 0.3) 40%,
      rgba(0, 0, 0, 0) 70%
    ) , url(${'https://image.tmdb.org/t/p/original' +data.backdrop_path})`;

  document.body.innerHTML = `
    <header>
      <a href="index.html" class="back-button">&#8592; Back to home</a>
    </header>

    <main>
      <div class="title">${data.title || data.name}</div>

      <div class="main-info" >
        <div class="runtime" style="display:${data.runstimeOmd ==='N/A'?
          'none'
          : !data.runtime || !data.runstimeOmd ? 'none' :'block'
        };">${data.runtime.length > 0 ? data.runtime +' '+ 'min' : data.runstimeOmd }</div>
        <div class="rating">
          <img class="star" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy
          53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0i
          MCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjRkZENzAwIiBkPSJNOS4xNTMgNS40MDhDMT
          AuNDIgMy4xMzYgMTEuMDUzIDIgMTIgMnMxLjU4IDEuMTM2IDIuODQ3IDMuNDA4bC4z
          MjguNTg4Yy4zNi42NDYuNTQuOTY5LjgyIDEuMTgycy42My4yOTIgMS4zMy40NWwuNj
          M2LjE0NGMyLjQ2LjU1NyAzLjY4OS44MzUgMy45ODIgMS43NzZjLjI5Mi45NC0uNTQ2
          IDEuOTIxLTIuMjIzIDMuODgybC0uNDM0LjUwN2MtLjQ3Ni41NTctLjcxNS44MzYtLj
          gyMiAxLjE4Yy0uMTA3LjM0NS0uMDcxLjcxNy4wMDEgMS40NmwuMDY2LjY3N2MuMjUz
          IDIuNjE3LjM4IDMuOTI1LS4zODYgNC41MDZzLTEuOTE4LjA1MS00LjIyLTEuMDA5bC
          0uNTk3LS4yNzRjLS42NTQtLjMwMi0uOTgxLS40NTItMS4zMjgtLjQ1MnMtLjY3NC4x
          NS0xLjMyOC40NTJsLS41OTYuMjc0Yy0yLjMwMyAxLjA2LTMuNDU1IDEuNTktNC4yMi
          AxLjAxYy0uNzY3LS41ODItLjY0LTEuODktLjM4Ny00LjUwN2wuMDY2LS42NzZjLjA3
          Mi0uNzQ0LjEwOC0xLjExNiAwLTEuNDZjLS4xMDYtLjM0NS0uMzQ1LS42MjQtLjgyMS
          0xLjE4bC0uNDM0LS41MDhjLTEuNjc3LTEuOTYtMi41MTUtMi45NDEtMi4yMjMtMy44
          ODJTMy41OCA4LjMyOCA2LjA0IDcuNzcybC42MzYtLjE0NGMuNjk5LS4xNTggMS4wND
          gtLjIzNyAxLjMyOS0uNDVzLjQ2LS41MzYuODItMS4xODJ6Ii8+PC9zdmc+" >
          <div class="rating-number">
            <span>${data.imdbRating === 'N/A'?
              data.vote_average  ? data.vote_average.toFixed(1) : data.imdbRating
              : data.imdbRating  ? data.imdbRating  : data.vote_average.toFixed(1) }</span> 
            /10 
            ${data.imdbRating === 'N/A'?
              data.vote_average  ? '<img class="tmdb-logo" src="images/tmdb.svg">' : ''
              : data.imdbRating  ? `
                <svg class="imdb-logo" xmlns="http://www.w3.org/2000/svg" width="60" height="30" viewBox="0 0 64 32" version="1.1">
                  <g fill="#F5C518">
                    <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                  </g>
                  <g transform="translate(8.000000, 7.000000)" fill="#000000" fill-rule="nonzero">
                    <polygon points="0 18 5 18 5 0 0 0"></polygon>
                    <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path><path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path><path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                    </g>
                </svg>
              `  : '<img class="tmdb-logo" src="images/tmdb.svg">' }
          </div>
        </div>
        <div class="year">${data.yearOmdb ? 
          data.yearOmdb 
        :
        data.yearTmdb ==="-" ?'':data.yearTmdb
       }</div>
      </div>

      <div class="genres-s-e">
        <div class="genres-container" style="display :${data.genres ? 'block' :'none'};"> 
          <h3>Genres</h3>
          <div class="genres">
            ${data.genres.map( genre => { return `<div class="genre">${genre.name}</div>` }).join('')}
          </div>
           
        </div>

        <div class="seasons-eps" style="display :${category==='movie' ? 'none' :'flex'};">
          <div class="seasons">
            ${data.number_of_seasons > 1? data.number_of_seasons+' ' + 'Seasons' : data.number_of_seasons+' ' + 'Season'}
          </div>

          <div class="eps">
            ${data.number_of_episodes}  Episodes
          </div>
        </div>
      </div>

      <div class="cast" style="display :${data.actors ?
        data.actors === 'N/A' ? 'none' : 'block' 
        :
         'none'};">
          <h3>Cast</h3>
          <div class="actors">${data.actors.map(actor =>{return `<div class="actor">${actor.name}</div>`}).join('')}</div>
      </div>

      <div class="director" style="display :${data.director ? 'block' :'none'};">
          ${data.director ?
           data.director.includes(',') ? "Directors : "+ `<span>${data.director}</span>` : "Director : "+ `<span>${data.director}</span>`
            : '' }  
      </div>

      <div class="writer" style="display :${data.writer ? 'block' :'none'};">
          ${data.writer ?
           data.writer.includes(',') ? "Writers : "+ `<span>${data.writer}</span>` : "Writer : "+ `<span>${data.writer}</span>`
            : '' }     
      </div>

      <div class="summary" style="display :${data.overview ? 'block' :'none'};">
        <h3>Summary</h3>
        <div>${data.overview}</div>
      </div>

      <button class="add-to-library">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMS41Ij48cGF0aCBkPSJNMTkuNTYyIDdhMi4xMzIgMi4xMzIgMCAwIDAtMi4xLTIuNUg2LjUzOGEyLjEzMiAyLjEzMiAwIDAgMC0yLjEgMi41TTE3LjUgNC41Yy4wMjgtLjI2LjA0My0uMzg5LjA0My0uNDk2YTIgMiAwIDAgMC0xLjc4Ny0xLjk5M0MxNS42NSAyIDE1LjUyIDIgMTUuMjYgMkg4Ljc0Yy0uMjYgMC0uMzkxIDAtLjQ5Ny4wMTFhMiAyIDAgMCAwLTEuNzg3IDEuOTkzYzAgLjEwNy4wMTQuMjM3LjA0My40OTYiLz48cGF0aCBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xNSAxOEg5Ii8+PHBhdGggZD0iTTIuMzg0IDEzLjc5M2MtLjQ0Ny0zLjE2NC0uNjctNC43NDUuMjc4LTUuNzdDMy42MSA3IDUuMjk4IDcgOC42NzIgN2g2LjY1NmMzLjM3NCAwIDUuMDYyIDAgNi4wMSAxLjAyNHMuNzI0IDIuNjA1LjI3OCA1Ljc2OWwtLjQyMiAzYy0uMzUgMi40OC0uNTI1IDMuNzIxLTEuNDIyIDQuNDY0cy0yLjIyLjc0My00Ljg2Ny43NDNoLTUuODFjLTIuNjQ2IDAtMy45NyAwLTQuODY3LS43NDNzLTEuMDcyLTEuOTgzLTEuNDIyLTQuNDY0eiIvPjwvZz48L3N2Zz4="> 
        <div class="text-add">${(() => {
          try {
            return libraryItems.some(item => item && item.id === data.id) ? 'Remove from library' : 'Add to library';
          } catch (error) {
            console.error('Error checking library items:', error);
            return 'Add to library';
          }
        })()}</div>
      </button>
    </main>
  `;

}
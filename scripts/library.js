export let libraryItems = (() => {
  try {
    const stored = localStorage.getItem('libraryItems');
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed || [];
  } catch (error) {
    console.error('Error parsing libraryItems from localStorage:', error);
    return [];
  }
})();

// Function to update libraryItems and localStorage
export function updateLibraryItems(newItems) {
  libraryItems = newItems;
  localStorage.setItem('libraryItems', JSON.stringify(newItems));
}

const noImage ='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png';

function displayLibrary(){
  // Check if we're on the library page by looking for required elements
  if (!document.querySelector('.library-title') || !document.querySelector('.library-grid')) {
    return; // Exit if not on library page
  }
  
  // Check if library is empty first
  if(!libraryItems[0]){
    const main = document.querySelector('main');
    main.innerHTML =`<h3 class="error" >No item has been added yet !</h3>`
    return; // Exit early if no items
  }
  
  libraryItems.forEach(item => {
    const libraryItem= document.createElement('a');
    libraryItem.classList.add('library-item');
    libraryItem.href = `details.html?id=${item.id}&catagory=${item.first_air_date? "tv" : "movie"}`;
    const imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w780${item.poster_path}` : noImage;
    libraryItem.innerHTML = `
      <img src="${imageUrl}" alt="${item.title || item.name}">
      <h3>${item.title || item.name}</h3>
      <button class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ff0000" d="M7.616 20q-.672 0-1.144-.472T6 18.385V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.23 0 .423-.192t.192-.424zM9.808 17h1V8h-1zm3.384 0h1V8h-1zM7 6v13z"/></svg>
      </button>
    `;
    
    const libraryGrid = document.querySelector('.library-grid');
    libraryGrid.appendChild(libraryItem);
    
    // Add click event to delete button
    const deleteBtn = libraryItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default button behavior
      e.stopPropagation(); // Stop event from bubbling up to parent <a>
      
      // Remove the item from library
      const updatedItems = libraryItems.filter(libItem => libItem.id !== item.id);
      updateLibraryItems(updatedItems);
      
      // Remove the DOM element
      libraryItem.remove();
      
      // Check if library is now empty
      if (updatedItems.length === 0) {
        const main = document.querySelector('main');
        main.innerHTML = `<h3 class="error">No item has been added yet !</h3>`;
      }
    });
  });
}

displayLibrary()



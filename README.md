# Bright TV

![Bright TV logo](/images/logoblack.png)

A modern, responsive web application for browsing and discovering movies and TV shows. Bright TV provides an intuitive interface to explore popular content, search for titles, view detailed information, and manage your personal library.

## Features

- 🎬 **Browse Popular Content**: Discover trending movies and TV shows on the homepage
- 🔍 **Advanced Search**: Search for movies and TV shows by title with real-time results
- 📺 **Detailed Information**: View comprehensive details including:
  - Ratings (IMDB and TMDB)
  - Cast and crew information
  - Genres
  - Runtime and release dates
  - Synopsis
  - Seasons and episodes (for TV shows)
- 📚 **Personal Library**: Save your favorite movies and TV shows to your library
- 📜 **Recently Viewed**: Automatically tracks your recently viewed items (up to 10 items)
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🎨 **Modern UI**: Clean, dark-themed interface with smooth scrolling

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and animations
- **JavaScript (ES6+)**: Vanilla JavaScript with modules
- **APIs**:
  - [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api): For movie and TV show data
  - [OMDB API](https://www.omdbapi.com/): For additional details like actors, directors, and IMDB ratings
- **Google Fonts**: Roboto and Ubuntu font families
- **LocalStorage**: For persistent storage of library and recently viewed items

## Project Structure

```
Bright TV/
│
├── index.html          # Homepage with popular movies and TV shows
├── details.html        # Dynamic details page for individual titles
├── library.html        # User's personal library page
│
├── scripts/
│   ├── index.js        # Main page functionality (browsing, search)
│   ├── details.js      # Details page logic
│   └── library.js      # Library management functionality
│
├── styles/
│   ├── all.css         # Global styles and CSS variables
│   ├── header.css      # Header component styles
│   ├── main.css        # Main content area styles
│   ├── details.css     # Details page styles
│   └── library.css     # Library page styles
│
└── images/
    ├── icon.png        # Favicon
    ├── logoblack.png   # Desktop logo
    ├── logoblackmobile.png  # Mobile logo
    └── tmdb.svg        # TMDB logo
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- An internet connection (for API calls and loading images)
- No build tools or package managers required

### Setup

1. Clone or download this repository
2. Open `index.html` in your web browser, or
3. Serve the files using a local web server:

   **Using Python:**

   ```bash
   python -m http.server 8000
   ```

   Then navigate to `http://localhost:8000`

   **Using Node.js (http-server):**

   ```bash
   npx http-server
   ```

   **Using PHP:**

   ```bash
   php -S localhost:8000
   ```

## Usage

### Browsing Content

- The homepage displays trending movies and TV shows
- Use the horizontal scroll buttons to navigate through content
- Click on any movie or TV show card to view detailed information

### Searching

1. Enter a search term in the search bar at the top
2. Click the search button or press Enter
3. Browse results organized by Movies and TV Shows
4. Click on any result to view details

### Viewing Details

- Click on any title to open its detail page
- View comprehensive information including:
  - Ratings and reviews
  - Cast members
  - Directors and writers
  - Genres
  - Synopsis
  - Runtime and release information

### Managing Library

- **Add to Library**: Click the "Add to library" button on any details page
- **View Library**: Click the "Library" button in the header
- **Remove from Library**:
  - Click the delete button on any item in your library, or
  - Use the "Remove from library" button on the details page

### Recently Viewed

- Recently viewed items are automatically tracked when you view details
- Up to 10 items are saved
- Clear all recently viewed items using the "Clear all" button

## Data Storage

The application uses browser `localStorage` to persist:

- **Library items**: Your saved movies and TV shows
- **Recently viewed**: Your viewing history

Note: This data is stored locally in your browser and will be cleared if you clear your browser's cache or localStorage.

## API Keys

**Important**: The project currently includes API keys directly in the code. For production use, consider:

1. Moving API keys to environment variables
2. Using a backend proxy to handle API requests
3. Implementing proper API key security practices

### Current API Keys Used:

- **TMDB API Key**: Used for movie and TV show data
- **OMDB API Key**: Used for additional metadata

To use your own API keys:

1. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Get a free API key from [OMDB](http://www.omdbapi.com/apikey.aspx)
3. Replace the API keys in:
   - `scripts/index.js` (TMDB API key)
   - `scripts/details.js` (TMDB and OMDB API keys)

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Features in Detail

### Search Functionality

- Searches both movies and TV shows simultaneously
- Results are displayed in separate sections
- Supports partial matches and common misspellings
- Real-time API calls for instant results

### Scroll Navigation

- Horizontal scrolling for content grids
- Smooth scroll animations
- Auto-hiding scroll buttons based on scroll position
- Responsive button visibility

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized images for different devices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available for educational purposes.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing comprehensive movie and TV show data
- [OMDB API](http://www.omdbapi.com/) for additional metadata
- Google Fonts for typography

## Future Enhancements

Potential features for future development:

- User authentication and cloud-based library sync
- Watchlist functionality
- Rating and review system
- Recommendations based on viewing history
- Filtering and sorting options
- Multi-language support
- Dark/light theme toggle

---

© 2024 Bright TV

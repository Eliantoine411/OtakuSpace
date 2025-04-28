import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BrowseAnime() {
  const [anime, setAnime] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);

  useEffect(() => {
    async function fetchAnime() {
      const response = await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity');
      const data = await response.json();
      setAnime(data.top);
    }

    fetchAnime();
  }, []);

  // Function to handle selecting an anime
  function handleSelectAnime(animeId) {
    const selected = anime.find(item => item.mal_id === animeId);
    setSelectedAnime(selected);
  }

  return (
    <div className="container">
      <h1>Browse Popular Anime</h1>
      <div className="anime-list">
        {anime.map(item => (
          <div key={item.mal_id} className="anime-card" onClick={() => handleSelectAnime(item.mal_id)}>
            <img src={item.image_url} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {selectedAnime && (
        <div className="anime-details">
          <h2>{selectedAnime.title}</h2>
          <img src={selectedAnime.image_url} alt={selectedAnime.title} />
          <p>{selectedAnime.synopsis}</p>
          <p>Genres: {selectedAnime.genres.map(genre => genre.name).join(', ')}</p>
          <p>Rating: {selectedAnime.score}</p>
          <a href={selectedAnime.url} target="_blank" rel="noopener noreferrer">View on MyAnimeList</a>
        </div>
      )}
    </div>
  );
}

export default BrowseAnime;

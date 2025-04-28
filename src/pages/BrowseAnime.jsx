import { useState, useEffect } from 'react';

function BrowseAnime() {
  const [anime, setAnime] = useState([]);

  useEffect(() => {
    async function fetchAnime() {
      const response = await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity');
      const data = await response.json();
      setAnime(data.top);
    }

    fetchAnime();
  }, []);

  return (
    <div className="container">
      <h1>Browse Popular Anime</h1>
      <div className="anime-list">
        {anime.map(item => (
          <div key={item.mal_id} className="anime-card">
            <img src={item.image_url} alt={item.title} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrowseAnime;

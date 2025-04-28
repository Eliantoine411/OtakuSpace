import { useEffect, useState } from 'react';

function AnimeBrowser() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetch('https://api.jikan.moe/v4/top/anime')
      .then(res => res.json())
      .then(data => setAnimeList(data.data));
  }, []);

  return (
    <div>
      <h1>Top Anime</h1>
      <div className="anime-grid">
        {animeList.map(anime => (
          <div key={anime.mal_id} className="anime-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <h2>{anime.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeBrowser;

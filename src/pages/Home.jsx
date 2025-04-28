import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });

    setPosts(data);
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>Anime Forum</h1>
        <p>Share your passion for Anime!</p>
      </header>

      <nav>
        <Link to="/create" className="button">+ Create Post</Link>
        <Link to="/browse" className="button">🎴 Browse Anime</Link>
      </nav>

      <div>
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Newest</option>
          <option value="upvotes">Top Voted</option>
        </select>
      </div>

      {filteredPosts.length ? (
        filteredPosts.map(post => <PostCard key={post.id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}

export default Home;

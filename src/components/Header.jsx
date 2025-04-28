import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">AnimeForum</Link>
        <nav className="nav-links">
          <Link to="/" className="button button-outline">Home</Link>
          <Link to="/browse" className="button button-outline">Browse Anime</Link>
          <Link to="/create" className="button">Create Post</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
        <h2>{post.title}</h2>
        <p>{formatDistanceToNow(new Date(post.created_at))} ago</p>
        <p>👍 {post.upvotes}</p>
        {post.image_url && <img src={post.image_url} alt={post.title} />}
      </Link>
    </div>
  );
}

export default PostCard;

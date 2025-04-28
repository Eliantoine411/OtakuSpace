import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CommentSection from '../components/CommentSection';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  async function fetchPost() {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single();
    setPost(data);
  }

  async function handleUpvote() {
    await supabase.from('posts').update({ upvotes: post.upvotes + 1 }).eq('id', id);
    fetchPost();
  }

  async function handleDelete() {
    await supabase.from('posts').delete().eq('id', id);
    navigate('/');
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      {post.image_url && <img src={post.image_url} alt={post.title} />}
      <p>{post.content}</p>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={handleUpvote}>👍 {post.upvotes} Upvote</button>
        <Link to={`/edit/${id}`} className="button">Edit</Link>
        <button onClick={handleDelete} className="button-delete">Delete</button>
      </div>

      <CommentSection postId={id} />
    </div>
  );
}

export default PostPage;

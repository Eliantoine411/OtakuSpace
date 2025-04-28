import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { supabase } from '../supabaseClient';

function EditPost() {
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

  async function handleSubmit(updatedPost) {
    await supabase.from('posts').update(updatedPost).eq('id', id);
    navigate(`/post/${id}`);
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm onSubmit={handleSubmit} initialData={post} />
    </div>
  );
}

export default EditPost;

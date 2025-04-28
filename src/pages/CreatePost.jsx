import PostForm from '../components/PostForm';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const navigate = useNavigate();

  async function handleSubmit(post) {
    await supabase.from('posts').insert([post]);
    navigate('/');
  }

  return (
    <div className="container">
      <h1>Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreatePost;

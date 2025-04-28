import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  async function fetchComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    setComments(data);
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    await supabase.from('comments').insert([{ content: newComment, post_id: postId }]);
    setNewComment('');
    fetchComments();
  }

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Post</button>
      </form>
      {comments.map(c => (
        <div key={c.id} className="comment">
          <p>{c.content}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;

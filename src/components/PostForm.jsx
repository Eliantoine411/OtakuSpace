import { useState } from 'react';

function PostForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [imageUrl, setImageUrl] = useState(initialData.image_url || '');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, content, image_url: imageUrl });
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write something..."
      />
      <input
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Image URL"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;

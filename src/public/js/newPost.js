

document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.getElementById('new-post-form');
  
    if (newPostForm) {
      newPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const title = document.getElementById('title').value.trim();
        const content = document.getElementById('content').value.trim();
        console.log(title);
        console.log(content);
        if (title && content) {
          const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.replace('/');
          } else {
            alert('Failed to add blog post.');
          }
        }
      });
    }
  });

 
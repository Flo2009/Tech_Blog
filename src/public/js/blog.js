const updateButtons = document.querySelectorAll('.update-post-button');
const deleteButtons = document.querySelectorAll('.delete-post-button');

document.addEventListener('DOMContentLoaded', (event) => {
    const addCommentButton = document.getElementById('add-comment-button');
    const newCommentForm = document.getElementById('new-comment-form');
    // const deleteButtons = document.getElementById('delete-post-button');
    if (addCommentButton) {
        // console.log("hello");
      addCommentButton.addEventListener('click', () => {
        newCommentForm.style.display = 'block';
        addCommentButton.style.display = 'none';
      });
    }
  
    if (newCommentForm) {
      newCommentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const content = document.getElementById('comment-content').value.trim();
        const post_id = window.location.pathname.split('/').pop();
        console.log(post_id);
        // console.log(content);
        if (content) {
          const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
            document.location.reload();
          } else {
            alert('Failed to add comment.');
          }
        }
      });
    }
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const id = event.target.getAttribute('data-id');
    //   const post_id = window.location.pathname.split('/').pop();
      console.log(id);
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post/you can only delete your own posts');
      }
    });
  });

  updateButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
    //   const post_id = window.location.pathname.split('/').pop();
      document.location.replace(`/${id}/edit`);
    });
  });




  
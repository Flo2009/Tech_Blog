const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const text = document.querySelector('#post-text').value.trim();
  // const comment = document.querySelector('#comment').value.trim();

  if (title && text) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log("Hello World")
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete the post');
    }
  }
};
//update the blog post 
const updateButtonHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-name').value.trim();
  const text = document.querySelector('#post-text').value.trim();

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, text }),
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update the post');
    }
  }
};



// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

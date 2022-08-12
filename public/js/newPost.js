const postFormHandler = async (event) => {
  event.preventDefault();

  const postTitle = document.querySelector('.new-post-title').value.trim();
  const postBody = document.querySelector('.new-post-body').value.trim();

  if (postTitle && postBody) {
    const response = await fetch ('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postBody
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard')
    } else {
      alert(response.statusText);
    }

  } else {
    console.log('Error in postBtnHandler')
  }
};


document.querySelector('.new-post-form').addEventListener('submit', postFormHandler)
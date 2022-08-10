const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentBody = document.querySelector('.comment-area').value.trim();
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length -1]

  if (commentBody && post_id !== null) {

    const response = await fetch ('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        commentBody,
        post_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
    
  } else {
    console.log('Error in commentFormHandler')
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler)


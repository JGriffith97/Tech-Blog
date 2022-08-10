const commentFormHandler = async (event) => {
  event.preventDefault();

  let commentText = document.querySelector('.comment-area').value

  if (commentText !== null) {
    commentText.trim()

    const dataObj = {
      commentBody: commentText,
    };

    const response = await fetch ('/api/comments', {
      method: 'POST',
      body: JSON.stringify(dataObj)
    });

    console.log(response)

    console.log(commentText)
  } else {
    console.log('Error in commentFormHandler')
  }
}

document.querySelector('.comment-btn').addEventListener('submit', commentFormHandler)
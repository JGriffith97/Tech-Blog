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

// ------------------------------------------------------------------------------------------------------------

// Potentially some future work here, the idea being to allow comments to be edited
// if the user that posted it's id matches the session.user_id via data-value;
// issue is, req.session.user_id isn't recognized outside of the router files;
// or otherwise import express.

// const commentSpan = document.getElementsByTagName('span');

// function getDataValue(event) {
//   let dataValue = event.target.getAttribute("data-value")
//   console.log(dataValue);

//   if (dataValue === req.session.user_id) {
//     commentSpan.setAttribute('contentEditable', 'true')
//   }
// };

// for (let i = 0; i < commentSpan.length; i++) {
//   commentSpan[i].addEventListener('click', getDataValue);
// };
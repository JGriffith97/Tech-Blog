const deleteBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete comment.')
    }
  }
};

const editBtnHandler = async (event) => {
  let newCommentBody = document.querySelector('.comment-body').textContent;

  const dataObj = {
    commentBody: newCommentBody,
  };

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch (`/api/comments/${id}`, {
      method: 'PUT',
      headers: {
                  'Content-Type':'application/json'
               },
      body: JSON.stringify(dataObj)
    })
  }
}


const editButtons = document.querySelectorAll('.edit-com-btn');
for (let i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', editBtnHandler);
}

const delButtons = document.querySelectorAll('.dlt-com-btn');
for (let i = 0; i < delButtons.length; i++) {
  delButtons[i].addEventListener('click', deleteBtnHandler)
}
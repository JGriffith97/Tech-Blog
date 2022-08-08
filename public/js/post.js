const deleteBtnHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

const editBtnHandler = (event) => {
  let newTitle = document.querySelector('.post-title').textContent;
  let newBody = document.querySelector('.post-body').textContent;
  const dataObj = {
    postTitle: newTitle,
    postBody: newBody,
  };

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
                  'Content-Type':'application/json'
               },
      body: JSON.stringify(dataObj)
    })

    console.log(response)

    // console.log(newBody)
    // console.log(newTitle)
  } else {
    console.log('Error in editBtnHandler')
  }
}

document.querySelector('.delete-btn').addEventListener('click', deleteBtnHandler)
document.querySelector('.edit-btn').addEventListener('click', editBtnHandler)
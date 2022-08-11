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


const buttons = document.querySelectorAll('.dlt-com-btn');

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', deleteBtnHandler)
}
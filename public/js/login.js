const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const userName = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (userName && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  
  let userName = document.querySelector('#username-signup').value
  let email = document.querySelector('#email-signup').value
  let password = document.querySelector('#password-signup').value

  if (userName && email && password !== null) {
    userName.trim();
    email.trim();
    password.trim();

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ userName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('All areas must have content!')
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

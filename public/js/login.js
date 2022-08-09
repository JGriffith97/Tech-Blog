const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  let userName = document.querySelector('#username-login').value
  let password = document.querySelector('#password-login').value

  if (userName && password !== null) {
    userName.trim();
    password.trim();

    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('All login areas must have content!')
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
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  } else {
    alert('All signup areas must have content!')
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

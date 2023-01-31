import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const API_URL = 'https://my.api.mockaroo.com/api/v1/getuserdetails?key=3f001a10';

async function authenticateUser(email, password) {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) throw new Error('Email or Password is incorrect!');
    return user;
  } catch (error) {
    throw error;
  }
}

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // sessionStorage.removeItem('user');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and Password are required!');
    } else {
      authenticateUser(email, password)
        .then((user) => {
          sessionStorage.setItem('user', JSON.stringify(user));
          history.push('/');
        })
        .catch((error) => {
          setErrorMessage('Invalid email or password!\n' + error);
        });
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <p>{errorMessage}</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

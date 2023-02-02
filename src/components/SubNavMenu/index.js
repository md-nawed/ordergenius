import React from 'react';

const SubNavMenu = (props) => {
  let user;
  let firstName;
  console.log('user', sessionStorage.getItem('user'));
  if (sessionStorage.getItem('user')) {
    user = JSON.parse(sessionStorage.getItem('user'));
    firstName = user?.firstName;
  }
  return <div className="container">{firstName && <p>Welcome, {firstName}</p>}</div>;
};

export default SubNavMenu;

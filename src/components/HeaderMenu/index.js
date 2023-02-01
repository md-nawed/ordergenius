import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderMenu = (props) => {
  return (
    <nav className="my-2 my-md-0 mr-md-3">
      {props.fields.list &&
        props.fields.list.map((item, index) => (
          <NavLink
            key={index}
            to={{ pathname: item.url }}
            className="p-2 text-dark"
            target="_blank"
          >
            {item.text}
          </NavLink>
        ))}
    </nav>
  );
};

export default HeaderMenu;

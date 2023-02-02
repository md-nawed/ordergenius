import React from 'react';

const Breadcrumb = (props) => {
  return (
    <div className="nav">
      <nav>
        <a href={props.fields.data.contextItem.url.path}>
          {props.fields.data.contextItem.url.path}
        </a>
      </nav>
    </div>
  );
};

export default Breadcrumb;

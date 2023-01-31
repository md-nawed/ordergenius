import React from 'react';
import { Text, RichText } from '@sitecore-jss/sitecore-jss-react';

/**
 * A simple Content Block component, with a heading and rich text block.
 * This is the most basic building block of a content site, and the most basic
 * JSS component that's useful.
 */
const ContentBlock = ({ fields }) => {
  let user;
  let firstName;
  console.log('user', sessionStorage.getItem('user'));
  if (sessionStorage.getItem('user')) {
    user = JSON.parse(sessionStorage.getItem('user'));
    firstName = user?.firstName;
  }

  return (
    <div className="contentBlock">
      <div>
        <h1>Homepage</h1>
        {firstName && <p>Welcome, {firstName}</p>}
      </div>

      <Text tag="h2" className="contentTitle" field={fields.heading} />
      <RichText className="contentDescription" field={fields.content} />
    </div>
  );
};

export default ContentBlock;

import React from 'react';
import gql from 'graphql-tag';
import GraphQLData from '../../lib/GraphQLData';
import { NavLink } from 'react-router-dom';

const SIDEMENU_QUERY = gql`
  query {
    sideMenuQuery: search(
      where: { name: "_templates", value: "{0C758183-0733-48B5-BD82-284286F1D9C1}" }
      first: 10
    ) {
      total
      results {
        title: field(name: "Title") {
          ... on TextField {
            value
          }
        }
        url {
          path
        }
      }
    }
  }
`;

const SideMenu = ({ sidemenuQ: { sideMenuQuery } }) => {
  return (
    <div className="nav">
      {sideMenuQuery?.results.map((item, index) => (
        <NavLink
          to={item.url.path}
          key={index}
          activeStyle={{ color: 'red' }}
          style={{ padding: 10 }}
        >
          {item.title.value}
        </NavLink>
      ))}
    </div>
  );
};

export default GraphQLData(SIDEMENU_QUERY, {
  name: 'sidemenuQ',
  options: {
    variables: {},
  },
})(SideMenu);

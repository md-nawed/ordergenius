import React from 'react';
import gql from 'graphql-tag';
import GraphQLData from '../../lib/GraphQLData';

const FOOTER_QUERY = gql`
  query {
    footerQuery: search(
      where: { name: "_templates", value: "{618D6737-638D-4925-9CBE-6DDFFFB68482}" }
      first: 10
    ) {
      total
      pageInfo {
        endCursor
        hasNext
      }
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

const Footer = ({ footerQ: { footerQuery } }) => {
  return (
    <div>
      {footerQuery &&
        footerQuery.results.map((item, index) => (
          <div key={index}>
            <a href={item.url.path}>{item.title.value}</a>
            <br />
          </div>
        ))}
    </div>
  );
};

export default GraphQLData(FOOTER_QUERY, {
  name: 'footerQ',
  options: {
    variables: {},
  },
})(Footer);

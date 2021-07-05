import 'antd/dist/antd.css';
import 'sanitize.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { globalCss } from 'styles/global';

import App from './App';

const subgraphUri = 'http://localhost:8000/subgraphs/name/scaffold-eth/your-contract';

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache(),
});

export const global = globalCss;

ReactDOM.render(
  <ApolloProvider client={client}>
    <App subgraphUri={subgraphUri} />
  </ApolloProvider>,
  document.getElementById('root')
);

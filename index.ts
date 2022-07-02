import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled, gql
} from 'apollo-server-core';

import express from 'express';
import { createServer } from 'http';

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book!]!
  }
`;

const resolvers = {
  Query: {
    books: () => [],
  },
};

(async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),],
  });

  await server.start();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 4000;
  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
})(typeDefs, resolvers);

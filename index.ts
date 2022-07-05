import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled, gql
} from 'apollo-server-core';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';

import StarWarsAPI from "./src/datasources/Swapi";
const resolvers = require('./src/resolvers/index');
const typeDefs = require('./src/typeDefs/index');

export type Context = {
  startWarsAPI: StarWarsAPI;
};

(async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  app.use(cors());
  const httpServer = createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      startWarsAPI: new StarWarsAPI(),
    }),
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

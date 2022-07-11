import pkg from "apollo-server-koa";
const { ApolloServer, gql } = pkg;
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import Koa from "koa";
import http from "http";
import typeDefs from "./lib/schema.js";
import resolvers from "./lib/resolvers.js";
import { applyMiddleware } from "graphql-middleware";
import jwt from "koa-jwt";
import { secret } from "./lib/config.js";
import permissions from "./permissions.js";
import Jwt from "jsonwebtoken";
async function startApolloServer(typeDefs, resolvers) {
  const httpServer = http.createServer();

  const server = new ApolloServer({
    schema: applyMiddleware(
      makeExecutableSchema({ typeDefs, resolvers: resolvers })
    ),

    context: ({ ctx }) => {
      let { request } = ctx;

      const token = request.headers.authorization || "";
      const tokenParts = token.split(" ");
      const user = Jwt.decode(tokenParts[1], secret);

      return { user };
    },
    tracing: true,
    cache: "bounded",
    // plugins:[ApolloServerPluginLandingPageGraphQLPlayground()], // in order to use old GraphQL playground
    playground: true,
  });

  await server.start();
  const app = new Koa();
  /* koa middleware
    app.use(jwt({
        secret: secret,
        algorithms: ["HS256"], 
        credentialsRequired: false
  })) */ //koa middleware
  app.use(
    jwt({ secret, algorithms: ["HS256"] }).unless({ path: [/^\/graphql/] })
  );
  server.applyMiddleware({ app, path: "/graphql" });
  httpServer.on("request", app.callback());
  await new Promise((resolve) => httpServer.listen({ port: 3000 }, resolve));
  console.log(`Server ready at http://localhost:3000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer(typeDefs, resolvers);

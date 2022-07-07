import pkg from 'apollo-server-koa';
const { ApolloServer, gql} = pkg;
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import {makeExecutableSchema} from '@graphql-tools/schema'
import Koa from 'koa'
import http from 'http'
import typeDefs from './lib/schema.js'
import resolvers from './lib/resolvers.js'
import {applyMiddleware} from 'graphql-middleware';


async function startApolloServer(typeDefs, resolvers) {
    const httpServer = http.createServer()
    const server = new ApolloServer({
        schema:applyMiddleware(
            makeExecutableSchema({ typeDefs, resolvers: resolvers }),
        ),
     
        tracing:true,
        cache: 'bounded',
      //  plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
      playground:true,
    })

    await server.start()
    const app = new Koa()
    server.applyMiddleware({ app , path: '/graphql'})
    httpServer.on('request', app.callback())
    await new Promise(resolve => httpServer.listen({ port: 3000 }, resolve));
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
    return { server, app}
}

startApolloServer(typeDefs, resolvers)



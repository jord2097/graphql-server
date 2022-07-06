import { ApolloServer } from 'apollo-server-koa'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import Koa from 'koa'
import http from 'http'
import typeDefs from './lib/schema.js'
import resolvers from './lib/resolver.js'

async function startApolloServer(typeDefs, resolvers) {
    const httpServer = http.createServer()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
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



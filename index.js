import pkg from 'apollo-server-koa';
const { ApolloServer, gql} = pkg;
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import {makeExecutableSchema} from '@graphql-tools/schema'
import Koa from 'koa'
import http from 'http'
import typeDefs from './lib/schema.js'
import resolvers from './lib/resolvers.js'
import {applyMiddleware} from 'graphql-middleware';
import jwt from 'koa-jwt';
import {secret} from './lib/config.js'
import shield from './permissions.js'
import {ApolloGateway,RemoteGraphQLDataSource} from '@apollo/gateway'

// build a gateway for the remote services
const gateway = new ApolloGateway({
    serviceList: [{ name: "accounts", url: "http://localhost:3000" }],
buildService({ name, url }) { 

    return new RemoteGraphQLDataSource({
        url,
        willSendRequest({request,context}) {
            request.http.headers.set('user',  context.user? JSON.stringify(context.user):null)
        }
    })
} 
   


})

async function startApolloServer(typeDefs, resolvers) {
    const httpServer = http.createServer()
    const server = new ApolloServer({
        schema:applyMiddleware(
            makeExecutableSchema({ typeDefs, resolvers: resolvers }),
           

        ),    
        context: ({req}) => {
         
         const user = req.headers.user? JSON.parse(req.headers.user):null
        
         return {user};


        }, 
        tracing: true,
        cache: 'bounded',
        plugins:[ApolloServerPluginLandingPageGraphQLPlayground()],
      playground:true,
    })

    await server.start()
    const app = new Koa()
/* koa middleware
    app.use(jwt({
        secret: secret,
        algorithms: ["HS256"], 
        credentialsRequired: false
  })) *///koa middleware
  app.use(jwt({ secret,algorithms:["HS256"] }).unless({ path: [/^\/graphql/] }))
    server.applyMiddleware({ app , path: '/graphql'})
    httpServer.on('request', app.callback())
    await new Promise(resolve => httpServer.listen({ port: 3000 }, resolve));
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`)
    return { server, app}
}

startApolloServer(typeDefs, resolvers)



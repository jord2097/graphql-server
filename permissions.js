import pkg from 'graphql-shield'
let { shield,rule } = pkg

const isAuthenticated = rule()( async (parent, args, {token}) => {
console.log(token)
 return token!==null

 } ) 



export default shield( { 
    
    Mutation: {
        scheduleFlight:isAuthenticated,
        bookFlight:isAuthenticated,
    }
    
})
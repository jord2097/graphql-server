# Instructions for running the GraphQL server from scratch

## Prerequisites
- Node 14 onwards due to use of ES6 modules
- Postgresql installed on local machine (instead of Docker due to time constraints)

## Set up package
- run ```npm install --legacy-peer-deps``` (as graphql version is higher than some of the libraries expect)
- also do ```npm install knex -g```  to ensure it can be used in CLI

## Set up DB
- Create a postgres db, the details of which go into the db/knexfile.js file for knex to access the database (comments included in the file to aid this process)
- cd into the db folder, run the following command first for database migration
```knex migrate:latest``` 
- This command seeds the database with the sample data (again from db folder)
```knex seed:run```

## Start up Server
- from the project root run ```npm start``` or ```node index.js``` to start the server
- access it at ```http://localhost:3000/graphql```
- the queries and mutations are secured by a token, so you must use the "login" mutation first with an email as argument
e.g. ```login(email: "jordan@example.com)```
- this will return the token, which is used in the standard format
```"Authorization": "Bearer token_goes_here"```
- from this point you can now use queries and mutations with the token in the header
- to run tests use: ```npm test```

## Features
-[x] Created server with koa
-[x] Used apollo-server to create graphql endpoint at localhost:3000/graphql
-[x] added a simple auth token that secures queries and mutations
-[x] used jest for testing sample queries and mutations
-[x] used knex for query building, seeding and migrations
-[x] created all required types, queries and mutations
-[] Docker TBA


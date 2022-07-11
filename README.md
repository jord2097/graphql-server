# Instructions for running the GraphQL server from scratch

## Set up DB
- Create a postgres db, the details of which go into the db/knexfile.js file for knex to access the database (comments included in the file to aid this process)
- From the db folder, run the following command for database migration
knex migrate:latest 
- This command seeds the database with the sample data (again from db folder)
knex seed:run

## Start up Server
- from the project root run npm start or node index.js to start the server
- the queries and migrations are secured by a token, so you must use the "login" migration first with an email as argument
e.g. login(email: "jordan@example.com)
- this will return the token, which is used in the standard format
"Authorization": "Bearer token_goes_here"
- from this point you can now use queries and migrations




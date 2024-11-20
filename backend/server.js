// Importing necessary libraries and modules.
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const resolvers = require('./resolvers/resolvers');

// Initializing the Express application
const app = express();

// Enabling CORS to allow requests from different origins.
app.use(cors());
 
// Loading all GraphQL schema files from the schema folder.
const typesArray = loadFilesSync(path.join(__dirname, './schema'), {
  extensions: ['graphql'],
});
const typeDefs = mergeTypeDefs(typesArray); 
 
// Function to start the server.
async function startServer() {

  // Set up Apollo Server with type definitions and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
// Starting the Apollo Server
await server.start();
server.applyMiddleware({ app });


// Setting the port for the server
const PORT = process.env.PORT || 3001;
 
// MongoDB URI
const URI =
  "mongodb+srv://sarthakgupta1433:S4rthak2002@semester3-fullstack.sdble.mongodb.net/";
     
  
// Connecting to MongoDB and starting the server.
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB is connected and server is running on http://localhost:${PORT}${server.graphqlPath}`);
    });
  })
  // Logging any connection errors
  .catch((err) => console.log(err));
 
}
 
// Starting the server.
startServer();
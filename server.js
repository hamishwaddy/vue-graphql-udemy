/* eslint-disable no-console */
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers.gql');

// Import environment variables Mongoose models
require('dotenv').config({ path: 'variables.env' });
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB Atlas DB
mongoose
  .connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  )
  .then(() => console.log('🗄  DB connected'))
  .catch((err) => console.error(err));

  // Create Apollo/GrpahQL server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post,
  },
});

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 Server listening on ${url}`);
  });

const sequelize = require("./util/database");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const { ApolloServer } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// The `listen` method launches a web server.
sequelize
  .sync()
  .then((data) => {
    //app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

/**
 query ExampleQuery {
  users {
    id
    name
    username
    email
    address{
      street
      suite
      zipcode
      city
      geo{
        lat
        lng
      }
    }
    phone
    website
    company {
        name
        catchPhrase
        bs
      }
    }
  }

}

 */

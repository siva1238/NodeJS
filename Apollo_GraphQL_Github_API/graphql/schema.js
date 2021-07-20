const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type User {
    id: ID!
    name: String!
    email: String!
    username: String
    phone: String!
    website: String!
    address: Address!
    company: Company!
  }
  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo!
  }
  type Geo {
    lat: String!
    lng: String!
  }
  type Company {
    name: String
    catchPhrase: String
    bs: String
  }

  input UserInputData {
    id: ID!
    email: String!
    name: String!
    password: String!
    phone: Int!
    website: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(userInput: UserInputData): User!
  }
`;

module.exports = typeDefs;

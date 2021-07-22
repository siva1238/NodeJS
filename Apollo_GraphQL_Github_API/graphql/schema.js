const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Book {
    id: ID!
    title: String!
    author: String!
    price: Int!
    branch: String!
  }

  type BookData {
    books: [Book!]!
    totalPrice: Int!
  }

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
    name: String!
    catchPhrase: String!
    bs: String!
  }
  input GeoInputData {
    lat: String!
    lng: String!
  }
  input AddressInputData {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: GeoInputData!
  }
  input CompanyInputData {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  input UserInputData {
    id: ID!
    name: String!
    username: String!
    email: String!
    phone: String!
    website: String!
    address: AddressInputData!
    company: CompanyInputData!
  }
  input bookFilter {
    ids: [ID!]!
  }

  type Query {
    users: [User]!
    user(id: ID!): User!
    books(input: bookFilter): [BookData]!
  }

  type Mutation {
    createUser(input: UserInputData): User!
    updateUser(id: ID!, input: UserInputData): User!
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

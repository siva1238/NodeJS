const { gql } = require("apollo-server");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    libraries: [Library]
    books: [Book]
    authors: [Author]
    users: [User]
    user(name: String!): User!
    posts: [Post]
  }
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }
  type User {
    id: ID!
    login: String
    avatar_url: String
  }
  # A library has a branch and books
  type Library {
    branch: String!
    books: [Book!]
  }

  type Post {
    id: ID!
    title: String!
    description: String!
  }

  type Mutation {
    createPost(id: ID!, title: String!, description: String!): Post
    deletePost(id: ID!): Boolean
  }
`;
module.exports = typeDefs;

/**
 query GetData($userName: String!) {
  books {
    title
    author {
        name
    }
  }
  users {
    id
    login
    avatar_url
  }
  user(name: $userName) {
    id
    login
    avatar_url
  }
  posts {
    id
    title
    description
  }
}
mutation createMyPost {
  createPost(id: 1, title: "New_post_1", description: "This is some description"){
    id
    title
    description
  }
}
mutation Mutation($deletePostId: ID!) {
  deletePost(id: $deletePostId)
}
 */

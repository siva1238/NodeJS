const axios = require("axios");
const { findIndex } = require("lodash");

const libraries = [
  {
    branch: "downtown",
  },
  {
    branch: "riverside",
  },
];

const books = [
  {
    id: 1,
    title: "The Awakening",
    author: "Kate Chopin",
    branch: "riverside",
  },
  {
    id: 2,
    title: "City of Glass",
    author: "Paul Auster",
    branch: "downtown",
  },
];

const authors = [
  {
    name: "Kate Chopin",
  },
  {
    name: "Paul Auster",
  },
];

const posts = [];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    libraries() {
      // Return our hardcoded array of libraries
      return libraries;
    },
    books: () => books,
    authors: () => authors,
    users: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (error) {
        throw error;
      }
    },
    user: async (_, args) => {
      try {
        const user = await axios.get(
          `https://api.github.com/users/${args.name}`
        );
        return {
          id: user.data.id,
          login: user.data.login,
          avatar_url: user.data.avatar_url,
        };
      } catch (error) {
        throw error;
      }
    },
    posts: () => posts,
  },
  Library: {
    books(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return books.filter((book) => book.branch === parent.branch);
    },
  },

  Book: {
    // The parent resolver (Library.books) returns an object with the
    // author's name in the "author" field. Return a JSON object containing
    // the name, because this field expects an object.
    author(parent) {
      console.log(parent);
      return {
        name: parent.author,
      };
    },
  },

  Mutation: {
    createPost: (_, args) => {
      console.log(args);
      posts.push(args);
      return args;
    },

    deletePost: (_, args) => {
      console.log(args);
      const postIndex = findIndex(posts, ["id", args.id]);

      if (postIndex > -1) {
        posts.splice(postIndex, 1);
        return true;
      }
    },
  },
};

module.exports = resolvers;

const axios = require("axios");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        return users.data.map(
          ({
            id,
            name,
            username,
            email,
            address,
            phone,
            website,
            company,
          }) => ({
            id,
            name,
            username,
            email,
            address,
            phone,
            website,
            company,
          })
        );
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createUser: (_, args) => {
      console.log(args);
      users.push(args);
      return args;
    },
  },
};
module.exports = resolvers;

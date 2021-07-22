const axios = require("axios");
const User = require("../models/user");
const Address = require("../models/Address");
const Geo = require("../models/Geo");
const Company = require("../models/Company");

var books = [
  {
    id: "1",
    title: "The Awakening",
    author: "Kate Chopin",
    branch: "riverside",
    price: "780",
  },
  {
    id: "2",
    title: "City of Glass",
    author: "Paul Auster",
    branch: "downtown",
    price: "900",
  },
  {
    id: "3",
    title: "Javascript Bible",
    author: "DnnyGdmn",
    branch: "downtown",
    price: "550",
  },
  {
    id: "4",
    title: "Dynamic Html",
    author: "AlxNkmvsky",
    branch: "downtown",
    price: "700",
  },
];

const resolvers = {
  Query: {
    books: async (_, args) => {
      //display books by ids and total price
      var total = 0;
      if (args.input.ids) {
        return [
          {
            books: books.filter((book, idx) => {
              let check = args.input.ids[idx] == book.id;
              if (check) {
                total += parseInt(book.price);
              }
              return check;
            }),
            totalPrice: total,
          },
        ];
      }
    },
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
    user: async (_, args) => {
      try {
        const user = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${args.id}`
        );
        return {
          id: user.data.id,
          name: user.data.name,
          username: user.data.username,
          email: user.data.email,
          phone: user.data.phone,
          website: user.data.website,
          address: user.data.address,
          company: user.data.company,
        };
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    createUser: (_, args) => {
      // users.push(args.input);
      console.log(args.input);
      new User({
        id: args.input.id,
        name: args.input.name,
        username: args.input.username,
        email: args.input.email,
        phone: args.input.phone,
        website: args.input.website,
        address: args.input.id,
        company: args.input.company,
      })
        .save()
        .then((result) => {
          console.log("Created User", result);
          new Address({
            id: args.input.id,
            street: args.input.address.street,
            suite: args.input.address.suite,
            city: args.input.address.suite,
            zipcode: args.input.address.zipcode,
            userId: result.id,
          })
            .save()
            .then((data) => {
              console.log("Created Address", data);
              new Geo({
                id: args.input.id,
                lat: args.input.address.geo.lat,
                lng: args.input.address.geo.lng,
                addressId: data.id,
              })
                .save()
                .then((result) => {
                  console.log("Created Geo", result);
                  new Company({
                    id: args.input.id,
                    name: args.input.company.name,
                    catchPhrase: args.input.company.catchPhrase,
                    bs: args.input.company.bs,
                    userId: args.input.id,
                  })
                    .save()
                    .then((data) => {
                      console.log("Created Geo", result);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      return args.input;
    },
    updateUser: (_, args) => {
      User.findByPk(args.id)
        .then((user) => {
          user.name = args.input.name;
          user.username = args.input.username;
          user.email = args.input.email;
          user.phone = args.input.phone;
          user.website = args.input.website;
          return user.save();
        })
        .then((result) => {
          console.log("Updated User", result);
          // Address.findByPk()
        })
        .catch((err) => {
          console.log(err);
        });
      return args.input;
    },
    deleteUser: (_, args) => {
      User.findByPk(args.id)
        .then((user) => {
          return user.destroy();
        })
        .then((result) => {
          console.log("Deleted User", result);
        })
        .catch((err) => {
          console.log(err);
        });
      return true;
    },
  },
};
module.exports = resolvers;

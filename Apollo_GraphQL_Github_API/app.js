const sequelize = require("./util/database");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const { ApolloServer } = require("apollo-server");
const Geo = require("./models/Geo");
const Address = require("./models/Address");
const Company = require("./models/Company");
const User = require("./models/user");

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
User.hasOne(Address);
User.hasOne(Company);
Address.hasOne(Geo);
Geo.belongsTo(Address, { Constraints: true, onDelete: "CASCADE" });
Address.belongsTo(User, { Constraints: true, onDelete: "CASCADE" });
Company.belongsTo(User, { Constraints: true, onDelete: "CASCADE" });

// The `listen` method launches a web server.
sequelize
  //.sync({ force: true }) //will not override tables if set force:true but not use for prod
  .sync()
  .then((user) => {
    // console.log(user);
    return user;
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * get Users:-
 ==========
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
/**
 create User:-
 ===========
mutation CreateUserMutation($createUserInput: UserInputData) {
  createUser(input: $createUserInput) {
      id
    name
    username
    email
    phone
    website
    address {
      street
      suite
      city
      zipcode
      geo {
        lat
        lng
      }
    }
    company {
      name
      catchPhrase
      bs
    } 

    
  }
}
variables:

 { "createUserInput": {
 "id":"1",
    "name": "Siva Parvathi",
    "username": "Siva",
    "email": "sivaraparla@gmail.com",
    "address": {
      "street": "Vivek nagar",
      "suite": "Apt. 556",
      "city": "Hyderabad",
      "zipcode": "500072",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "gamil.com",
    "company": {
      "name": "Cognizant",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
	}
}
  
 */

/**
 
get User by ID:
query Query($userId: ID!) {
  user(id: $userId) {
    name
    username
    email
    phone
    website
    address {
      city
      street
      suite
      zipcode
      geo {
        lat
        lng
      }
    }
    company {
      bs
      catchPhrase
      name
    }
  }
}

variables:
{
  "userId": "3"
}

 */
/**
 

Update User :-
============

Mutation:-
--------

mutation UpdateUserMutation($updateUserId: ID!, $updateUserInput: UserInputData) {
  updateUser(id: $updateUserId, input: $updateUserInput) {
    name
    username
    email
    phone
    website
address {
  city
  street
  suite
  zipcode
  geo {
    lat
    lng
  }
}
company {
  bs
  catchPhrase
  name
}    
  }
}


Variables:-
{
  "updateUserId": "1",
  "updateUserInput": {
    "id": "1",
    "name":"NagaParvathi",
    "username": "Nag",
    "email": "nag@gmail.com",
    "phone": "9182672131",
    "website": "cts.com",
    "address": {
      "street": "vivek",
      "suite": "777",
      "city": "HYD",
      "zipcode": "78903",
      "geo": {
        "lat": "777",
        "lng": "888",
      }
    },
    "company": {
      "bs": "78",
      "name": "paypal",
      "catchPhrase": "sdsdsds"
    }
  }
}

 */
/**
 
Delete User:
========

mutation DeleteUserMutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}

variable:-

{
  "deleteUserId": "1"
}

*/

/** display books by Id's and total price of books
 
query Query($booksInput: bookFilter) {
  books(input: $booksInput) {
    totalPrice
    books {
      author
      price
      id
      branch
      title
      
    }
  }
}

variables:-
{
  "booksInput":{
    "ids": ["1","2","3","4"]
  }
}


 */

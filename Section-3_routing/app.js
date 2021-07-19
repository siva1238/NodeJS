const http = require('http');

//const express = require("express");

//const app = express();

const routes = require('./routes');

console.log(routes.someText);

console.log("hi fef");

const server = http.createServer(routes.handler);

server.listen(3000);
const { gql } = require("apollo-server-express");
const chatType = require("./chat")
const messagesType = require("./messages")
const user = require("./user");

const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, chatType, messagesType, user];
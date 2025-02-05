
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    messages(toId:Int): [Message]
  }

  type Query {
    history(myId:Int,chatId:Int): [Message]
  }

  type Message {
    id: ID
    content: String
    fromId: Int
    toId: Int
    chatId: Int
    message: String
    sent: Boolean
    name: String
  }
    
  enum SortOrder {
    ASC
    DESC
  }

`;
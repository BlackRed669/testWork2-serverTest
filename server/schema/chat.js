const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    chats(myId:Int): [Chat]
  }

  type Chat {
    id: ID
    hostUser: Int
    connectUser: Int
    lastContent: String
    connectName: String
    icon: String
  }
    
  enum SortOrder {
    ASC
    DESC
  }

`;
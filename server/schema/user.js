const { gql } = require("apollo-server-express");


module.exports = gql`
  type Query {
    users(myId:Int): [User]
  }

  type Query {
    getAllUsers(myId:String):[User]
  }

  type Query{
    getUser(myId:Int,chatId:Int):User
  }

  type User {
    id: ID
    name: String
    clerkId: String
    socketId: String
    icon: String
    chatId:Int
    message:String
    connectUserId:Int
  }
    
  enum SortOrder {
    ASC
    DESC
  }

`;
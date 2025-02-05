const chatResolver = require("./chatResolver");
const messagesResolvers = require("./messagesResolvers");
const UserResolvers = require("./userResolver");

module.exports = [chatResolver, messagesResolvers,UserResolvers];

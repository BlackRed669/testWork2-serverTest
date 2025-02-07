const Chat = require("../models/chat.js");
const Messages = require("../models/message.js");
const User = require("../models/user.js");

module.exports = {
  Query: {
    messages: async (_, { toId }) => {

      return Messages.findAll({
        where: {
          toId: toId,
        },
        order: [["createdAt", "DESC"]],
      });
    },

    history: async (_, { myId, chatId }) => {

      const messages = await Messages.findAll({
        where: {
          chatId: chatId,
        },
        order: [["createdAt", "asc"]],
      });

      let user = await User.findByPk(myId);

      let chat = await Chat.findByPk(chatId);

      let connectUserId = chat.hostUser === user.id ? chat.connectUser : chat.hostUser;

      let connectUser = await User.findByPk(connectUserId);

      return Promise.all(messages.map(async (c) => {
        let messageAttr = c.fromId === user.id ? { sent: true, name: "" } : { sent: false, name: "" };
        const result = {
          message: c.content,
          sent: messageAttr.sent,
          name: messageAttr.name,
          id: c.id
        };
        return result;
      }));

    },
  },
};
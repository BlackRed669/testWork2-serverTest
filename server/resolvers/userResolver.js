const User = require("../models/user.js");
const Chat = require("../models/chat.js");
const Messages = require("../models/message.js");
const { Op } = require("sequelize");

module.exports = {
  Query: {

    getUser: async (_, { myId, chatId }) => {
      if (myId && chatId) {
        console.log("kwehfiewfh");
        let user = await User.findByPk(myId);
        let chat = await Chat.findByPk(chatId);
        let connectUserId = chat.hostUser === user.id ? chat.connectUser : chat.hostUser;
        let connectUser = await User.findByPk(connectUserId);
        
        return connectUser;
      }
    },



    getAllUsers: async (_, { myId }) => {

      if (myId) {
        let myUser = await User.findOne({
          where: { clerkId: myId },
        });

        let users = await User.findAll({
          where: {
            id: { [Op.ne]: myUser.id },
          },
          order: [["updatedAt", "DESC"]],
        });

        return Promise.all(
          users.map(async (u) => {

            let chats = await Messages.findOne({
              where: {
                [Op.or]: [{ fromId: myUser.id, toId: u.id }, { toId: myUser.id, fromId: u.id }],
              },
              order: [["createdAt", "DESC"]],
            });

            const result = {

              chatId: chats?.chatId ?? 0,
              message: chats?.content ?? "",
              icon: u.icon,
              name: u.name,
              id: myUser.id,
              connectUserId: u.id
            };
            return result;
          })
        );
      }

    },
  },

};
const User = require("../models/user.js");
const Messages = require("../models/message.js");
const { Op } = require("sequelize");

module.exports = {
  Query: {
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
              connectUserId:u.id
            };
            return result;
          })
        );
      }

    },
  },

};
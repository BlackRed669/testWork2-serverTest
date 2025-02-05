const Chat = require("../models/chat.js");
const Messages = require("../models/message.js");
const User = require("../models/user.js");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    chats: async (_, { myId }) => {

      try {
        const chats = await Chat.findAll({
          where: {
            [Op.or]: [{ hostUser: myId }, { connectUser: myId }],
          },
          order: [["createdAt", "DESC"]],
        }); // Получаем все чаты

        return Promise.all(
          chats.map(async (c) => {
            // Получаем последнее сообщение для текущего чата
            const lastMessage = await Messages.findOne({
              where: { chatId: c.id },
              order: [["createdAt", "DESC"]],
            });

            let secondUser = c.hostUser === myId ? c.connectUser : c.hostUser;

            const user = await User.findByPk(secondUser);

            const result = {
              id: c.id,
              connectName: user.name,
              lastContent: lastMessage ? lastMessage.content : null,
              connectUser: secondUser,
              icon: user.icon,
            };

            return result;
          })
        );
      } catch (error) {
        console.error("Ошибка при получении чатов:", error);
        throw new Error("Не удалось получить чаты");
      }
    }
  },
};

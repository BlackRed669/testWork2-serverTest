const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { ApolloServer } = require("apollo-server");
//GraphQL
const typeDefs = require("./schema/index.js");
const resolvers = require("./resolvers/index.js");
//Модели
const User = require("./models/user.js");
const Messages = require("./models/message.js");
const Chat = require("./models/chat.js");
const { Op } = require("sequelize");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     methods: ["GET", "POST"]
//   }
// });

// // Обработка подключения сокетов
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Пример отправки сообщения клиенту
//   socket.emit("welcome", { message: "Welcome to the server!" });

//   // Обработка события от клиента
//   socket.on("sendSMS", async (data) => {

//     let chatId = data.chatId;
//     let content = data.content;

//     let fromUser = await User.findOne({ //От кого смс
//       where: { socketId: socket.id },
//     });
//     const fromId = fromUser.id;

//     let chat = await Chat.findByPk(chatId);
//     let toId = chat.hostUser === fromId ? chat.connectUser : chat.hostUser; //Кому смс

//     let result = await Messages.create({ toId, content, fromId, chatId });

//     const connectUser = await User.findByPk(toId);

//     // Отправка ответа
//     io.to(connectUser.socketId).emit("getSMS", { message: content, sent: false, name: "", id: result.id });
//     io.to(fromUser.socketId).emit("getSMS", { message: content, sent: true, name: "", id: result.id });
//   });


//   //TODO: Вынести функции сокетов в подобие сервисов


//   socket.on("appendUser", async (data) => {
//     let upsert1 = "";
//     let users = JSON.parse(data.userValue1);
//     if (users) {
//       const [user, created] = await User.upsert({
//         socketId: socket.id,
//         name: users.fullName,
//         clerkId: users.id,
//         icon: users.imageUrl,
//       },
//         {
//           clerkId: users.id,
//         }
//         , {
//           returning: true,
//         }
//       );

//       io.to(socket.id).emit("getUserId", user.id);
//     }
//   });


//   socket.on("findChat", async (data) => {

//     let user = await User.findByPk(data.connectUser);

//     let findChat = await Chat.findOne({
//       where: {
//         [Op.or]: [{
//           hostUser: data.hostUser,
//           connectUser: data.connectUser
//         }, {
//           hostUser: data.connectUser,
//           connectUser: data.hostUser
//         }],
//       },
//     });

//     if (findChat)
//     {
//       io.to(socket.id).emit("createChat", findChat);
//       io.to(user.socketId).emit("createChat", findChat);
//       return;
//     }

//     let hostUser = data.hostUser;
//     let connectUser = data.connectUser;

//     let result = await Chat.create({ hostUser, connectUser });
//     if (result)
//     {
//       io.to(socket.id).emit("createChat", result);
//       io.to(user.socketId).emit("createChat", result);
      
//     }
//   });

//   // Обработка отключения клиента
//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// // Запуск сервера
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server webSocket is running on http://localhost:${PORT}`);
// });

const serverApollo = new ApolloServer({ typeDefs, resolvers });

serverApollo.listen().then(({ url }) => {
  console.log(`Server http is running on ${url}`);
});
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Chat = sequelize.define("chats", {
    hostUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    connectUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

}, {
    timestamps: true,
});

module.exports = Chat;
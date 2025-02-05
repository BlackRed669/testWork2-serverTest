const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clerkId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: true,
});

module.exports = User;
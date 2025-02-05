const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Messages = sequelize.define("messages", {
  toId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fromId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chatId: 
  {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  
},{
  timestamps: true,
});

module.exports = Messages;
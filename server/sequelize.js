const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://pavlishin:9FyWRIUtbYnD2haqRZ9TEEjMIeWSmz6t@dpg-cuh5guhu0jms73fuubf0-a/chatv2_tq1s'); // Замените на ваши данные

module.exports = sequelize;
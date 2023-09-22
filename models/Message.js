const sequelize = require('../DB');

const { DataTypes } = require('sequelize');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    timestamps: true,

})

module.exports = Message;
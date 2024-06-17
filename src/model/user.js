'use strict';
const { Model } = require('sequelize');
const {dbConnect} = require('../config/db')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
       
        }
      }
  User.init({
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement:true,
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.NUMBER
    },
}, {
    sequelize: dbConnect(),
    tableName: 'User',
    timestamps: false
});
  return User;
};

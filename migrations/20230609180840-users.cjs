'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'email', {
      type: DataTypes.STRING
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('users', 'email')
  }
};

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:

    */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "John Doe",
          password: "123456",
          username: "fake1",
        },
        {
          email: "John kute",
          password: "123456",
          username: "fake2",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

'use strict';

const fs = require("fs").promises

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = JSON.parse(await fs.readFile("./data/users.json", "utf-8")).map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Users", users)

    let profiles = JSON.parse(await fs.readFile("./data/profiles.json", "utf-8")).map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Profiles", profiles)

    let categories = JSON.parse(await fs.readFile("./data/categories.json", "utf-8")).map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Categories", categories)

    let products = JSON.parse(await fs.readFile("./data/products.json", "utf-8")).map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Products", products)

    let carts = JSON.parse(await fs.readFile("./data/carts.json", "utf-8")).map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert("Carts", carts)

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null)
    await queryInterface.bulkDelete("Profiles", null)
    await queryInterface.bulkDelete("Categories", null)
    await queryInterface.bulkDelete("Products", null)
    await queryInterface.bulkDelete("Carts", null)
  }
};

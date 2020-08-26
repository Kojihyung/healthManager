const Sequelize = require("sequelize");

const { sequelize } = require("../util/database");

const Body = sequelize.define("bodyinfo", {
  id: { // 자동 생성 id
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  memberId: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

module.exports = Body;
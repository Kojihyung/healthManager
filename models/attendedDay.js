const Sequelize = require("sequelize");

const { sequelize } = require("../util/database");

const AttendedDay = sequelize.define("attendedDay", {
  id: { // 자동 생성 id
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  days: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  memID: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
});

sequelize.sync();

module.exports = AttendedDay;
const Sequelize = require("sequelize");

const { sequelize } = require("../util/database");

const Attendance = sequelize.define("attendance", {
  memberID: { // 자동 생성 id
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  forUpdate: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Attendance;
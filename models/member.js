const Sequelize = require("sequelize");

const { sequelize } = require("../util/database");

const Member = sequelize.define("member", {
  id: { // 자동 생성 id
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { // 이름(중복 가능)
    type: Sequelize.STRING,
    allowNull: false,
  },
  duedate_box: { // 이름(중복 가능)
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  phoneNumber: { // 전화번호(중복 불가)
    type: Sequelize.STRING,
    allowNull: false,
  },
  startdate: { // 시작 날짜
    type: Sequelize.DATE,
    allowNull: true,
  },
  enddate: { // 종료 날짜
    type: Sequelize.DATE,
    allowNull: true,
  }
});

module.exports = Member;
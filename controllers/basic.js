const Member = require("../models/member");
const Attendance = require("../models/attendance");

exports.getHome = async (req, res, next) => {
    let page = req.query.page || 0;
    const number_of_posts = 10;
    const { count, rows } = await Member.findAndCountAll({
      limit: number_of_posts,
      offset: page * number_of_posts,
      raw: true
    });

    const attendee = await Attendance.findOne({
      where: { forUpdate: 1 }
  })

  const existed = await Member.findOne({
        where: { id: attendee.memberID }
    })


    res.render("home", {
        members: rows,
        member: existed,
        restdate: cal(existed.enddate)
    })
  };

  function cal(enddate) {
    var rest =
        parseInt((parseDate(enddate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) + 1;
    return rest;
}

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

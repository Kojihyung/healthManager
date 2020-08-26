const Member = require("../models/member");

function cal(enddate){
    var rest = 
    parseInt((parseDate(enddate).getTime() - new Date().getTime())/1000/60/60/24)+1;
    return rest;
}

exports.getMemberInfo = async (req, res, next) => {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId);
    res.render("memberInfo/memberInfo", {
        member,
        restdate : cal(member.enddate)
    });
  };
  
function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

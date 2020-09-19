const Member = require("../models/member");
const AttendedDay = require("../models/attendedDay");

function cal(enddate){
    var rest = 
    parseInt((parseDate(enddate).getTime() - new Date().getTime())/1000/60/60/24)+1;
    return rest;
}

exports.addBoxDuedate = async (req) => {
  const user = await Member.findOne({ where: { id: req.params.memberId } });
  Member.update({ duedate_box: parseInt(user.duedate_box) + parseInt(req.body.date) }, { where: { id: req.params.memberId } });
  window.location.reload();
}

exports.addDate = async (req) => {
  const user = await Member.findOne({ where: { id: req.params.memberId } });
  Member.update({ enddate: user.enddate.setDate(user.enddate.getDate() + req.body.date) }, { where: { id: req.params.memberId } });
  window.location.reload();
}

exports.deleteAll = async () => {
  await Member.destroy();
}

exports.deleteMember = async (req, res, next) => {
  await Member.destroy({ where: { id: req.params.memberId } });
}

exports.getMemberInfo = async (req, res, next) => {

    const id_ = await req.params.memberId;
    
    const days = await AttendedDay.findAll({
      where: {memID : req.params.memberId}
    });

    const member = await Member.findAll({
      where: {id : id_}
    });

    const attends = await AttendedDay.findAll({
      where: {memID : id_}
    });
    var arr = new Array();

    await attends.forEach(function(item, index, arr2){
        arr.push({title: item.days.slice(10), start: item.days.slice(0,10)});
    });

    res.render("memberInfo/memberInfo", {
        member : member[0],
        restdate : cal(member[0].enddate),
        days,
        eventList: JSON.stringify(arr)
    });
  };

  
function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

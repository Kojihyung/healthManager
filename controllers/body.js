const Body = require("../models/bodyinfo");
const Member = require("../models/member");

function cal(enddate){
    var rest = 
    parseInt((parseDate(enddate).getTime() - new Date().getTime())/1000/60/60/24)+1;
    return rest;
}


exports.getAddBody = async (req, res, next) => {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId);
    res.render("post/addBodyInfo", {
        member,
        restdate : cal(member.enddate)
    });

  };

  exports.addBody = async (req, res, next) => {
    const { memberId } = req.params;

    const member = await Member.findByPk(memberId);

    const existed = await Body.findOne({
        where: { memberID: req.params.memberId}
    })
    if(existed !== null){
        await Body.update({
            weight: req.body.weight,
            memberID: req.params.memberId,
         },{
             where: {memberID: req.params.memberId}
         });
    }
    else{
        await Body.create({
            weight: req.body.weight,
            memberID: req.params.memberId,
         });
    }
  };

  
function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
  }

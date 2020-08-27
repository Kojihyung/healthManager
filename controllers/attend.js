const Member = require("../models/member");
const Attendance = require("../models/attendance");
const { sequelize } = require("../util/database");
const AttendedDay = require("../models/attendedDay");

function cal(enddate) {
    var rest =
        parseInt((parseDate(enddate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24) + 1;
    return rest;
}

exports.attendCheck = async (req, res, next) => {
    res.render("guest/attendance");
};

exports.attendInfo = async (req, res, next) => {
    sequelize.sync();
    const existed = await Member.findOne({
        where: { id: req.body.memberID }
    })
    if (existed === null) {
        console.log("없는 회원입니다.");
        res.render("guest/attendance");
    }
    else {
        const member = await Member.findByPk(req.body.memberID);

        const attend = await Attendance.findOne({
            where: { forUpdate: 1 }
        })

        if(attend === null){
            await Attendance.create({
                memberID: req.body.memberID,
                forUpdate: 1,
             })
        }
        else{
            await Attendance.update({
                memberID: req.body.memberID,
                forUpdate: 1,
             },{
                 where: {forUpdate: 1}
             });
        }
        
         await AttendedDay.create({
            days: new Date(),
            memID: req.body.memberID,
        });

        res.render("memberInfo/guestInfo", {
            member,
            restdate : cal(member.enddate)
        });
    }

};

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1] - 1, parts[2]); // months are 0-based
}

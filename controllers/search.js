const Member = require("../models/member");

function cal(enddate){
    var rest = 
    parseInt((parseDate(enddate).getTime() - new Date().getTime())/1000/60/60/24)+1;
    return rest;
}

exports.searchMember = async (req, res, next) => {
    let page = req.query.page || 0;
    const number_of_posts = 10;
    const { count, rows } = await Member.findAndCountAll({
      limit: number_of_posts,
      offset: page * number_of_posts,
      raw: true
    });
    res.render("search/memberSearch", {
        members: rows,
    });
  };

  exports.getAddSearch = async (req, res, next) => {
    //const { memberId } = req.body.search;
    // 윗 줄은 왜 안될까.. await가 잘 안 먹는다ㅠ
    const member = await Member.findByPk(req.body.search);

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

const Member = require("../models/member");

exports.getAddMember = async (req, res, next) => {
    const existed = await Member.findOne({
        where: { phoneNumber: req.body.phoneNumber}
    })
    if(existed !== null){
        // 화면에 alert되게 바꾸든지 혹은 ejs 자체에서 바로 확인할 수 있는 방법?
        console.log("이미 존재하는 전화번호입니다. 다시 입력해주십시오.");
        res.render("post/addMember");
    }
    else{
        await Member.create({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
        });
    
          const newMember = await Member.findOne({
            where: { phoneNumber: req.body.phoneNumber}
        });
    
        res.render("alert", {
            id: newMember.id,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
        });
    }
};

exports.getMemberInfos = async(req, res, next) => {
    let page = req.query.page || 0;
    const number_of_posts = 10;
    const { count, rows } = await Member.findAndCountAll({
      limit: number_of_posts,
      offset: page * number_of_posts,
      raw: true
    });

    res.render("printInfos", {
        members: rows
    });
}

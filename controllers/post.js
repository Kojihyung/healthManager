const Member = require("../models/member");

exports.getAddMember = async (req, res, next) => {
    await Member.create({
        title: req.body.title,
        content: req.body.content,
      });
    
    console.log(req.body);
    res.render("alert", {
        title: req.body.title,
        content: req.body.content,
    });
};

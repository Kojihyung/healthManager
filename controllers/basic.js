const Member = require("../models/member");

exports.getHome = async (req, res, next) => {
    let page = req.query.page || 0;
    const number_of_posts = 10;
    const { count, rows } = await Member.findAndCountAll({
      limit: number_of_posts,
      offset: page * number_of_posts,
      raw: true
    });

    res.render("home", {
        members: rows,
    })
  };
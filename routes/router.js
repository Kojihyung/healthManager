const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.js");
const basicController = require("../controllers/basic.js");
const memberController = require("../controllers/member.js");
const searchController = require("../controllers/search.js");
const bodyController = require("../controllers/body.js");

//대충 구조가 예상되기 시작
//저 주소로 들어오면 get 실행, 저 주소에서 뭔가 post method를 실행하면 router.post 가 실행되는거
//res.render()요 안의 파일은 뷰에서 뽑아서 실행
//res.render(" ", {}) 저기 대괄호 안은 그 뷰에다가 보내주는 값들
router.get("/add-member", function (req, res) {
    res.render("post/addMember.ejs");
});
router.post("/add-member", postController.getAddMember);

router.get("/member/:memberId", memberController.getMemberInfo);

router.get("/", basicController.getHome);

router.get("/search", searchController.searchMember);
router.post("/search", searchController.getAddSearch);

router.get("/add-bodyinfo/:memberId", bodyController.getAddBody);
router.post("/add-bodyinfo/:memberId", bodyController.addBody);

router.get("/infos", postController.getMemberInfos);

module.exports = router;

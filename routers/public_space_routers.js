const { Router } = require("express");
const publicSpaceController = require("../controller/public_space_controller");

const router = Router();

router.get(["/", "/home"], publicSpaceController.home_get);
router.get("/signup", publicSpaceController.signup_get);
router.get("/login", publicSpaceController.login_get);
router.get("/admin/login", publicSpaceController.admin_login_get);

module.exports = router;

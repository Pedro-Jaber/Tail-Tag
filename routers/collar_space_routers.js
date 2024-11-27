const { Router } = require("express");
const collarSpaceController = require("../controller/collar_space_controller");

const router = Router();

router.post("/collar", collarSpaceController.collar_post);

module.exports = router;

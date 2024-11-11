const { Router } = require("express");
const userSpaceController = require("../controller/user_space_controller");

const router = Router();

router.get("/my-panel", userSpaceController.my_panel_get);
router.get("/pet/:id", userSpaceController.my_pet_get);
router.get("/pet/:id/edit", userSpaceController.my_pet_edit_get);
router.post("/pet/:id/edit", userSpaceController.my_pet_edit_post);

router.post("/add-pet", userSpaceController.add_pet_post);
router.get("/get-a-pet/:id", userSpaceController.get_a_pet_get);

module.exports = router;

const { Router } = require("express");
const userSpaceController = require("../controller/user_space_controller");

const router = Router();

// User
router.get("/my-panel", userSpaceController.my_panel_get);
router.get("/profile", userSpaceController.profile_get);
router.put("/profile", userSpaceController.profile_put);

// Pet
router.get("/pet/:id", userSpaceController.my_pet_get);

router.get("/get-a-pet/:id", userSpaceController.get_a_pet_get);

router.get("/add-pet", userSpaceController.add_pet_get);
router.post("/add-pet", userSpaceController.add_pet_post);

router.get("/pet/:id/edit", userSpaceController.edit_pet_get);
router.put("/pet/:id/edit", userSpaceController.edit_pet_post);

router.delete("/pet/:id/delete", userSpaceController.delete_pet_delete);

module.exports = router;

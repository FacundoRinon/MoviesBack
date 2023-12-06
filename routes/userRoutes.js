const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.index);
// router.get("/profile", userController.show);
// router.post("/create", userController.create);
// router.post("/", userController.store);
// router.update("/../", userController.edit);
// router.patch("/", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;

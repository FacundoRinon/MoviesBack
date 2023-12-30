const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

const { expressjwt: checkJwt } = require("express-jwt");
router.use(checkJwt({ secret: process.env.SESSION_SECRET, algorithms: ["HS256"] }));

router.get("/", movieController.show);
// router.post("/create", movieController.create);
// router.update("/../", movieController.edit);
router.patch("/", movieController.update);
// router.delete("/:id", movieController.destroy);

module.exports = router;

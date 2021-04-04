const express = require("express");
const router = express();
const wg = require("../controllers/wg.controller");
const checkAuth = require("../middleware/check-auth.js");

//Get all
// router.get("/", wg.findAll);

// Get one
router.get("/:wgId", checkAuth, wg.findOne);

//Delete one
// router.delete("/:wgId", wg.delete);

//Create one
router.post("/", wg.create);

//Update one
router.patch("/:wgId", wg.update);

module.exports = router;
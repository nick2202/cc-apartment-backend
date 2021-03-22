const express = require("express");
const router = express();
const wg = require("../controllers/wg.controller");

//Get all
// router.get("/", wg.findAll);

// Get one
router.get("/:wgId", wg.findOne);

//Delete one
// router.delete("/:wgId", wg.delete);

//Create one
router.post("/", wg.create);

//Update one
router.patch("/:wgId", wg.update);

module.exports = router;
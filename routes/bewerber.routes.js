const express = require("express");
const router = express();
const bewerber = require("../controllers/bewerber.controller");

//Get many
router.get("/", bewerber.findMany);

//Get one
router.get("/:bewerberId", bewerber.findOne);

//Delete one
router.delete("/:bewerberId", bewerber.delete);

//Create one
router.post("/", bewerber.create);

//Update one
router.patch("/:bewerberId", bewerber.update);

module.exports = router;
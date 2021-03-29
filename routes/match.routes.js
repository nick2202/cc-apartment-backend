const express = require("express");
const router = express();
const match = require("../controllers/match.controller");

//Initiate matching for Bewerber manually (dev only)
router.post("/bewerber/:bewerberId", match.doMatchingBew);

//Initiate matching for WG manually (dev only)
router.post("/wg/:wgId", match.doMatchingWg);

//Get all matches for a Bewerber above a certain percentage (ex. 0.5)
router.get("/bewerber/:bewerberId", match.getMatchesBew);

//Get all matches for a WG above a certain percentage (ex. 0.5)
router.get("/wg/:wgId", match.getMatchesWg);

//Get all Bewerber which match a certain WG
router.get("/wg/getBews/:wgId", match.getMatchingBewWg);


module.exports = router;

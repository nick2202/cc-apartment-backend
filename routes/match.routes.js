const express = require("express");
const router = express();
const match = require("../controllers/match.controller");
const checkAuth = require("../middleware/check-auth")

//Initiate matching for Bewerber
router.post("/bewerber", checkAuth, match.doMatchingBew);

//Initiate matching for WG
router.post("/wg", checkAuth, match.doMatchingWg);

//Get all matches for a Bewerber above a certain percentage (ex. 0.5)
router.get("/bewerber", checkAuth, match.getMatchesBew);

//Get all matches for a WG above a certain percentage (ex. 0.5)
router.get("/wg", checkAuth, match.getMatchesWg);

//Get all Bewerber which match a certain WG
router.get("/wg/getBews", checkAuth, match.getMatchingBewWg);


module.exports = router;

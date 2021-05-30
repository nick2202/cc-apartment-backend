const express = require("express");
const router = express();
const matchingKriterien = require("../controllers/matching_kriterien.controller");
const match = require("../controllers/match.controller");

//Create MatchingKriterien of a Bewerber and initiate matching
router.post("/bewerber/:bewerberId", matchingKriterien.createMatchingKriterienBew);

//Update MatchingKriterien of a Bewerber and initiate matching
router.patch("/bewerber/:bewerberId", matchingKriterien.updateMatchingKriterienBew);

//Create MatchingKriterien of a WG and initiate matching
router.post("/wg/:wgId", matchingKriterien.createMatchingKriterienWg);

//Update MatchingKriterien of a WG and initiate matching
router.patch("/wg/:wgId", matchingKriterien.updateMatchingKriterienWg);


module.exports = router;

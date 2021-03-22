const express = require("express");
const router = express();
const matchingKriterien = require("../controllers/matching_kriterien.controller");
const match = require("../controllers/match.controller");

//Set or update MatchingKriterien of a Bewerber
router.post("/bewerber/:bewerberId", matchingKriterien.createMatchingKriterienBew);

//Set or update MatchingKriterien of a Bewerber
router.patch("/bewerber/:bewerberId", matchingKriterien.updateMatchingKriterienBew);

//Set or update MatchingKriterien of a WG
router.post("/wg/:wgId", matchingKriterien.createMatchingKriterienWg);

//Set or update MatchingKriterien of a WG
router.patch("/wg/:wgId", matchingKriterien.updateMatchingKriterienWg);


router.get("/matches/:bewerberId", match.doMatching);


module.exports = router;

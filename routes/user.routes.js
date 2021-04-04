const express = require("express");
const router = express();

const userc = require("../controllers/user.controller");

router.post("/login/bewerber", userc.loginBewerber);

router.post("/register/bewerber/:bewId", userc.registerBewerber);

router.post("/login/wg", userc.loginWg);

router.post("/register/wg/:wgId", userc.registerWg);

router.post("/logout", userc.logout);

module.exports = router;
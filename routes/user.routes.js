const express = require("express");
const router = express();

const userc = require("../controllers/user.controller");

router.patch("/login", userc.login);

router.patch("/register", userc.register);

router.patch("/logout", userc.logout);

module.exports = router;
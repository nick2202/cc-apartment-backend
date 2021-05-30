const express = require("express");
const router = express();
const checkAuth = require("../middleware/check-auth")

const user = require("../controllers/user.controller");

router.post("/login", user.login);

router.post("/register", user.register);

router.post("/logout", user.logout);

// Check authorization
router.get("/auth", checkAuth, user.getAuth);

module.exports = router;
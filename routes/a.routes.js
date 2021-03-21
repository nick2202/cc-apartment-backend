const express = require("express");
const router = express();

router.get("/", ((req, res) => {
    res.send("We are home");
}));

module.exports = router;
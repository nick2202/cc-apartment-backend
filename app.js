const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const BewerberRoute = require("./routes/bewerber.routes");

app.use("/bewerber", BewerberRoute);


mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () =>
    console.log("connected to DB")
);

app.listen(3000);
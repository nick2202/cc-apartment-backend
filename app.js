const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({ path: "config/.env"});
const cors = require("cors");

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const BewerberRoute = require("./routes/bewerber.routes");
const KriterienRoute = require("./routes/matching_kriterien.routes");

app.use("/bewerber", BewerberRoute);
app.use("/kriterien", KriterienRoute);


mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () =>
    console.log("connected to DB")
);

app.listen(3000);
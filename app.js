const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config({path: "config/.env"});
const cors = require("cors");
const ENV = process.env;

//Middlewares
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({message: "Home"});
});

const BewerberRoute = require("./routes/bewerber.routes");
const KriterienRoute = require("./routes/matching_kriterien.routes");
const WgRoute = require("./routes/wg.routes");

app.use("/bewerber", BewerberRoute);
app.use("/kriterien", KriterienRoute);
app.use("/wg", WgRoute);


mongoose.connect(
    ENV.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () =>
        console.log("Connected to DB")
);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});
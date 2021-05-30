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

const bewerberRoute = require("./routes/bewerber.routes");
const wgRoute = require("./routes/wg.routes");
const kriterienRoute = require("./routes/matching_kriterien.routes");
const matchRoute = require("./routes/match.routes");
const userRoute = require("./routes/user.routes");

app.use("/bewerber", bewerberRoute);
app.use("/wg", wgRoute);
app.use("/kriterien", kriterienRoute);
app.use("/match", matchRoute);
app.use("/user", userRoute);

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
const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const restRouter = require("./router/Restaurants")
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = 3000;

app.use("/restaurants", restRouter)

app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})
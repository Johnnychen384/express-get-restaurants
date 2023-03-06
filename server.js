const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants/:id", async (req, res) => {
    const target = await Restaurant.findByPk(req.params.id)
    res.json(target)
})

app.get("/restaurants", async (req, res) => {
    const restArr = await Restaurant.findAll()
    res.json(restArr)
})



app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})
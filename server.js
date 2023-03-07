const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

app.post("/restaurants", async (req, res) => {
    const createdRest = await Restaurant.create(req.body)
    res.json(createdRest)
})

app.put("/restaurants/:id", async (req, res) => {
    const target = await Restaurant.findByPk(req.params.id)
    await target.update(req.body)

    res.json(target)
})

app.delete("/restaurants/:id", async (req, res) => {
    const target = await Restaurant.findByPk(req.params.id)
    await target.destroy()

    res.json(target)
})


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})
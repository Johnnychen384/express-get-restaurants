const express = require("express")
const app = express()
const {Restaurant} = require("../models/index")
const {sequelize} = require("../db");
const router = express.Router()
const {check, validationResult} = require("express-validator")
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//TODO: Create your GET Request Route Below: 
router.get("/:id", async (req, res) => {
    const target = await Restaurant.findByPk(req.params.id)
    res.json(target)
})

router.get("/", async (req, res) => {
    const restArr = await Restaurant.findAll()
    res.json(restArr)
})

router.post("/", [check("name").not().isEmpty().trim(), check("location").isLength({min:10, max: 30}).trim(), check("cuisine").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req) // 

    console.log('if there are errors',errors)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    
    const createdRest = await Restaurant.create(req.body)
    const restArr = await Restaurant.findAll()
    res.json(restArr)
})

router.put("/:id", async (req, res) => {
    const target = await Restaurant.findByPk(req.params.id)
    await target.update(req.body)

    res.json(target)
})

router.delete("/:id", async (req, res) => {
    const target = await Restaurant.findByPk(req.params.id)
    await target.destroy()

    res.json(target)
})


module.exports = router
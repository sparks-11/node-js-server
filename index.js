require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Details = require("./models/details")
const data = require('./data')

const app = express();

const PORT = process.env.PORT || 1337

app.listen(PORT, () => {
console.log(`the server started on localhost:${PORT}`)
})

mongoose.connect(process.env.DB_URL)

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("this is working you dumbass!")
})

app.post('/api/result', async (req, res) => {
  const  fortune = data[Math.floor(Math.random() * 31)]
    const user = await Details.findOne({
    name: req.body.name,
    crushName: req.body.crushName
    })
    if (!user) {
        await Details.create({
        name: req.body.name.trim(),
        crushName: req.body.crushName.trim(),
        resultStmt: fortune
    })
    res.json({status:"ok", user: fortune})
    } else {
      res.json({ status: "ok", user: user.resultStmt})
    }
    
})

app.get("/data",async (req, res) => {
  try {
    const user = await Details.findOne({
    name: req.body.name.trim(),
    crushName: req.body.crushName.trim()
    })
    res.json({status:"ok", user: user})
  } catch (err) {
    res.json({status:"bad", error:err})
  }
})
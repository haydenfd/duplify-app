require('dotenv').config()
const express = require("express")
const cors = require("cors")
const authConfig = require('./auth')

const PORT = 8000 || process.env.port

const origins = {
    origin: "*",
}

const app = express()

app.use(express())
app.use(cors(origins))

app.get('/', (req, res) => {
    res.json({"ID": process.env.TEST_ID})
})

app.get('/authorize', (req, res) => {
    // res.json({"Hello": "World"})
    res.redirect(`https://accounts.spotify.com/authorize?response_type=${authConfig.response_type}&client_id=${process.env.SPOTIFY_API_CLIENT_ID}&scope=${authConfig.scope}&state=${authConfig.state}`)
})

app.listen(PORT, () => {
    console.log("Server active!")
})

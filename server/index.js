const express = require("express")
const cors = require("cors")

const PORT = 8000 || process.env.port

const origins = {
    origin: "*",
}

const app = express()

app.use(express())
app.use(cors(origins))

app.get('/', (req, res) => {
    res.json({"Status": 200})
})
app.listen(PORT, () => {
    console.log("Server active!")
})


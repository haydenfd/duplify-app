require('dotenv').config()
const express = require("express")
const cors = require("cors")

const userRouter = require('./routes/user')
const oauthRouter = require('./routes/oauth')
const playlistRouter = require('./routes/playlist')

const origins = {
    origin: "*",
}

const port = process.env.PORT;

const app = express();

app.use(express.json())
app.use(cors(origins))
app.use('/user', userRouter)
app.use('/oauth', oauthRouter)
app.use('/playlist', playlistRouter)


app.get('/', async (req, res) => {

  res.send({"Test" : port})
})

app.listen(port, () => {
    console.log(`Server active on port ${port}`);
})

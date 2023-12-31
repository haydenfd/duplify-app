require('dotenv').config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const userRouter = require('./routes/user')
const oauthRouter = require('./routes/oauth')
const playlistRouter = require('./routes/playlist')

const origins = {
    origin: "*",
}

const clientId = process.env.SPOTIFY_API_CLIENT_ID
const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET
const redirectUri = "https://duplify-server-401911.wl.r.appspot.com/callback"
const port = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cors(origins))
app.use('/user', userRouter)
// app.use('/oauth', oauthRouter)
app.use('/playlist', playlistRouter)

function createQueryString(params) {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

app.get('/', async (req, res) => {

  res.send({"Test" : port})
})

app.get('/authorize', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']; // Add more scopes if needed
    const authorizeUrl = `https://accounts.spotify.com/authorize?` +
      createQueryString({
        response_type: 'code',
        client_id: clientId,
        scope: scopes.join(' '),
        redirect_uri: redirectUri,
      });
  
    try {
      res.redirect(authorizeUrl);
    } catch (e) {
      console.log(e)
    }
  });

app.get('/callback', async (req, res) => {
    const { code } = req.query;
  
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(`${clientId}:${clientSecret}`).toString('base64')),
      },
    };
  
    try {
      const response = await axios(authOptions);
      const { access_token } = response.data;
  
      res.redirect(`http://localhost:3000/home?access_token=${access_token}`)
 
    } catch (error) {
      console.error('Error obtaining access token:', error);
      res.status(500).send('Error obtaining access token');
    }
  });

app.post('/createPlaylist', async (req, res) => {

  const data = req.body


  res.send({
    status: 200,
    data: data
  })

})

app.listen(port, () => {
    console.log(`Server active on port ${port}`)
})

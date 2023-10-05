require('dotenv').config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")
const bodyParser =require('body-parser')

const origins = {
    origin: "*",
}

const clientId = process.env.SPOTIFY_API_CLIENT_ID
const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET
const redirectUri = process.env.SPOTIFY_API_REDIRECT_URI
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors(origins))
app.use(bodyParser.json())

function createQueryString(params) {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

app.get('/authorize', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']; // Add more scopes if needed
    const authorizeUrl = `https://accounts.spotify.com/authorize?` +
      createQueryString({
        response_type: 'code',
        client_id: clientId,
        scope: scopes.join(' '),
        redirect_uri: redirectUri,
      });
  
    res.redirect(authorizeUrl);
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


app.get('/playlist', async (req, res) => {

  const { token, pid } = req.query

  const fetchPlaylistUrl = 'https://api.spotify.com/v1/playlists/'

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(`${fetchPlaylistUrl}${pid}`, axiosConfig).then((result) => result.data)

  const {
    name, 
    tracks,
    owner,
    id,
  } = response

  const projectionObject = { name, owner, tracks, id}

  res.send({
    data: projectionObject
  })
 
})


app.post('/createPlaylist', async (req, res) => {

  res.send({
    status: 200
  })
  
})

app.listen(port, () => {
    console.log("Server active!")
})

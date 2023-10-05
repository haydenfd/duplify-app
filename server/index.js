require('dotenv').config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

const origins = {
    origin: "*",
}

const clientId = process.env.SPOTIFY_API_CLIENT_ID
const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET
const redirectUri = process.env.SPOTIFY_API_REDIRECT_URI
const port = process.env.PORT

const app = express()

app.use(express())
app.use(cors(origins))

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


app.listen(port, () => {
    console.log("Server active!")
})

require('dotenv').config()
const express = require("express")
const cors = require("cors")
const axios = require("axios")

// const authConfig = require('./auth')

const PORT = 8000 || process.env.port

const origins = {
    origin: "*",
}

// Replace with your Spotify app credentials
const x = '678e30c5d52d4c46960ca7221a30a104';
const y = '78580fb6985048f5b8f8d1b23a36bcc4';
const redirectUri = 'http://localhost:8000/callback'; 

const app = express()

app.use(express())
app.use(cors(origins))

// Helper function to create a query string
function createQueryString(params) {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

app.get('/', (req, res) => {
    res.json({'test':'lol'})
})
// Endpoint to initiate Spotify authorization
app.get('/authorize', (req, res) => {
    const scopes = ['user-read-private', 'user-read-email']; // Add more scopes if needed
    const authorizeUrl = `https://accounts.spotify.com/authorize?` +
      createQueryString({
        response_type: 'code',
        client_id: clientId,
        scope: scopes.join(' '),
        redirect_uri: redirectUri,
      });
  
    res.redirect(authorizeUrl);
  });


// Endpoint to handle Spotify callback and obtain an access token
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
        'Authorization': 'Basic ' + (new Buffer.from(`${x}:${y}`).toString('base64')),
      },
    };
  
    try {
      const response = await axios(authOptions);
      const { access_token } = response.data;
  
      // Use the access token for authenticated requests to the Spotify API
      res.redirect(`http://localhost:3000/home?access_token=${access_token}`)
 
    } catch (error) {
      console.error('Error obtaining access token:', error);
      res.status(500).send('Error obtaining access token');
    }
  });

// app.get('/fetch-playlist', (req, res) => {

// })


app.listen(PORT, () => {
    console.log("Server active!")
})

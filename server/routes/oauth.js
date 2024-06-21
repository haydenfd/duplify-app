const axios = require("axios")
const oauth = require('express').Router()

const client_url = process.env.CLIENT_REDIRECT_URL;
const clientId = process.env.DUPLIFY_CLIENT_ID;
const clientSecret = process.env.DUPLIFY_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;

function createQueryString(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

oauth.get('/authorize', (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private']; 
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
    console.log('Failed to authorize');
  }
});

oauth.get('/callback', async (req, res) => {

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

    res.redirect(`${client_url}/home?access_token=${access_token}`)

  } catch (error) {
    console.error('Error obtaining access token:', error);
    res.status(500).send('Error obtaining access token');
  }
});

module.exports = oauth;
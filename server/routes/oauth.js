const oauth = require('express').Router()

function createQueryString(params) {
    return Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
  }

oauth.get('/authorize', (req, res) => {
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
  
      res.redirect(`http://localhost:3000/home?access_token=${access_token}`)
 
    } catch (error) {
      console.error('Error obtaining access token:', error);
      res.status(500).send('Error obtaining access token');
    }
  });


module.exports = oauth
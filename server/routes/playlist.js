const playlist = require('express').Router()
const axios = require('axios')

playlist.get('/', async (req, res) => {


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


module.exports = playlist
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

const fetchPlaylistSongs = async (id, token) => {

    const fetchPlaylistUrl = 'https://api.spotify.com/v1/playlists/'

    const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    let songs = []
    let endpoint = `${fetchPlaylistUrl}${id}/tracks`
    while (1) {

        const response = await axios.get(endpoint, axiosConfig).then((result) => result.data)
        for (let x = 0; x < response.items.length; x++)
        {
            const song = response.items[x]
            const uri = song.track.uri
            songs.push(uri)
        }

        if (response.next == null)
        {
            break
        }

        else {
            endpoint = response.next
        }
    }

    return songs
}


const addSongsToPlaylist = async (playlist_id, song_uri, token) => {

    const addSongsEndpoint = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`
    let copy = song_uri
    while (true) {

        if (copy.length > 100)
        {
           const list = copy.slice(0,100)
           copy = copy.slice(100)
           const body = {
            "uris": list
           }

           await axios.post(addSongsEndpoint, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        })
        }

        else {

            const list = copy
            const body = {
                "uris": list
               }
            await axios.post(addSongsEndpoint, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
            })
            break;
        }
    }

}

playlist.post('/create', async (req, res) => {

    const data = req.body
    const { token, id } = req.query
    const song_uri = await fetchPlaylistSongs(id, token)

    const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${data.user_id}/playlists`

    await axios.post(createPlaylistEndpoint, {
        name: data.playlistName,
        description: data.playlistDescription,
        public: data.playlistVisibility,
    } , {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
    }).then((response) => {
        created_id = response.data.id
        addSongsToPlaylist(created_id,song_uri,token)

        // add tracks to created playlist id
        // const addSongsEndpoint = `https://api.spotify.com/v1/playlists/${created_id}/tracks`
        
        // while (true) {

            // if (song_uri.length > 100)
            // {
            //    const list = song_uri.slice(0,100)
            //    const body = {
            //     "uris": list
            //    }

            //    await axios.post(a)

            // }

            // else {

            //     break;
            // }
        // }

    })


    res.send({
        data: created_id,
        "Status": 200
    })
})


module.exports = playlist
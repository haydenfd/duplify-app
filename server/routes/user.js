const user = require('express').Router()
const axios = require('axios')

user.get('/', async (req, res) => {

    const { access_token } = req.query

    const fetchMeEndpoint = 'https://api.spotify.com/v1/me'

    const axiosConfig = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
    };

    let user = null
    await axios.get(fetchMeEndpoint, axiosConfig).then((response) => {
        user = response.data
    })

    res.send({
        user
    })
})

module.exports = user
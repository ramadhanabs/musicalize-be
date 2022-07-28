const express = require('express')
const SpotifyWebApi = require('spotify-web-api-node')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post('/login', (req, res) => {
    const {code} = req.body
    const credentials = {
        redirectUri: 'http://127.0.0.1:3000',
        clientId: '1f9e862d3b4d4e8ea1e7b29d9f28fbea',
        clientSecret: '8538459f7f5641c8858a5d851fb2dd6e'
    }
    const spotifyApi = new SpotifyWebApi(credentials)
    spotifyApi.authorizationCodeGrant(code).then((data)=>{
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((error)=>{
        console.log(error)
        res.sendStatus(400)
    })
})

app.listen(3001)

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios')
const PORT = process.env.PORT || 3000

// Create Express Server
const app = express()
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public')) // serve static Swaggger UI files from root directory
app.use(cors()) // add CORS HTTP headers to allow browser API requests

// Proxy Server reroutes all Swagger API requests to https://api.attentivemobile.com/v1
app.use(/.*/, (req, res, next) => {
  console.log('APP.USE /.*/')
  // logger(req)

  // Set URL and Auth
  const url = `https://api.attentivemobile.com/v1${req.originalUrl}`
  // console.log('URL:', url)
  const headers = {}
  headers['authorization'] = req.get('authorization')
  const method = req.method
  let data

  // Set Content Type and Body Data
  const contentType = req.get('content-type')
  if (contentType) headers['content-type'] = contentType
  if (method === 'POST' || method === 'PUT') {
    // console.log('METHOD POST || PUT')
    if (contentType && contentType === 'application/json') {
      // console.log('APPLICATION/JSON')
      data = req.body
    }
  } else {
    // console.log('APPLICATION/X-WWW-FORM-URLENCODED')
    const qs = new URLSearchParams(req.params).toString()
    // console.log('QS:', qs)
    data = qs
  }
  // console.log('DATA:', data)

  axios({
    url,
    method,
    headers,
    data
  })
    .then(function (response) {
      // handle success
      console.log('SUCCESS')
      console.log('RESPONSE.DATA:', response.data)
      res.json(response.data)
    })
    .catch(function (error) {
      // handle error
      // console.log('ERROR:', error)
      // console.log('ERROR.RESPONSE:', error.response)
      console.log('CATCH')
      console.log('ERROR:', error.response.status, error.response.statusText)
      // console.log('ERROR.RESPONSE:', error.response)
      // console.log('ERROR:', error)
      res.status(error.response.status).send(error.response.statusText)
    })
    .finally(function () {
      // always executed
      console.log('FINALLY')
    })
})

// Function to inspect and log API requests in console for debugging
function logger (req) {
  console.log('REQ.PROTOCOL:', req.protocol)
  console.log('REQ.HOSTNAME:', req.hostname)
  console.log('REQ.METHOD:', req.method)
  console.log('REQ.URL:', req.url)
  console.log('REQ.ORIGINALURL:', req.originalUrl)
  console.log('REQ.PATH:', req.path)
  console.log('REQ.PARAMS:', req.params)
  console.log('REQ.QUERY:', req.query)
  console.log('REQ.GET.AUTHORIZATION:', req.get('authorization'))
  console.log('REQ.HEADERS:', req.headers)
  console.log('REQ.HEADERS.AUTHORIZATION:', req.headers['authorization'])
  console.log('CONTENT-TYPE:', req.get('content-type'))
  console.log('REQ.BODY', req.body)
}

// Start the Proxy Server
app.listen(PORT, () => {
  console.log(`Starting Proxy Server on port: ${PORT}`)
})

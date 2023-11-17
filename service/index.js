const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const dotenv = require('dotenv')

const test = require('./src/routes/test.route')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Multer configuration
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // no larger than 5mb
})

// Error handler
const errorHandler = (error, request, response, next) => {
    if (!error) {
        response.status(404).send('Page not found')
        return
    }

    console.error(error.message)

    const status = error.status || 400
    response.status(status).send("Internal Server Error")
}

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: 'cross-origin',
        },
    })
)
app.use(cors())
app.use(compression())
app.use(
    helmet({
        crossOriginResourcePolicy: {
            policy: 'cross-origin',
        },
    })
)

// Routes
app.get('/', (req, res) => res.json({ message: 'ok' }))
app.use('/qr', test)

// Error handler middleware
app.use(errorHandler)

// Start the server
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app
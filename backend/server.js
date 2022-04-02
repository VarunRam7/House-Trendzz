const express = require('express')
const cors = require('cors')

const connection = require('./config/db')
const home = require('./routes/api/home')
const port = 4000

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', home);

app.listen(port, () => {
    console.log("Server listening port : " + port);
})



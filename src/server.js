const express = require('express');
const { envConfig } = require('./config.js')
const cors = require('cors')

// Config
const app = express();
app.set('port', envConfig.PORT)

// Midleware
app.use(express.json())
app.use(cors({
  //origin: "*",
  //methods: ["GET", "POST", "DELETE", "PUT"]
}))

// Routes
app.get('/', (req, res) => {
  res.json({ 'msg': 'Successful response' });
});

// Static Files


// Running..
app.listen(app.get('port'), () => console.log(`Server on: ${app.get('port')}`))



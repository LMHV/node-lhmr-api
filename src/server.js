const express = require('express');
const { envConfig } = require('./config.js');
const cors = require('cors');

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

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
app.get('/', async (req, res) => {
  const users = await prisma.user.findFirst()
  res.json({
    message: 'Successful response',
    data: users
  })
});

// Static Files


// Running..
app.listen(app.get('port'), () => console.log(`Server on: ${app.get('port')}`))



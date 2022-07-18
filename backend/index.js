const express = require('express')
var cors = require('cors');

const app = express()
app.use('/', cors())

const PORT = process.env.PORT || 3000
const path = require('path')
const { Pool } = require('pg')

var pool = new Pool({
    connectionString: 'postgres://ntppecvi:eGj2ZvkW8QlZOGwhCFCvYOcI1NJWFpak@heffalump.db.elephantsql.com/ntppecvi',
    host: 'heffalump.db.elephantsql.com',
    user: 'ntppecvi',
    password: 'eGj2ZvkW8QlZOGwhCFCvYOcI1NJWFpak',
    database: 'db'
  })
  
  app.use(upload())
  
  var options = {
    dotfiles: 'ignore',
    extensions: ['html','htm'],
    index: 'start.html'
  }
  var users = []
  // parsing body of requests
  app.use(express.json())
  app.use(express.urlencoded( {extended:false} ))
  // static
  app.use('/', express.static('./pub_html',options));

  app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
  })
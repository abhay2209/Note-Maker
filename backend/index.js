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
    database: 'note_maker'
  })
  
//   var options = {
//     dotfiles: 'ignore',
//     extensions: ['html','htm'],
//     index: 'start.html'
//   }
var users = []
// parsing body of requests
app.use(express.json())
app.use(express.urlencoded( {extended:false} ))

//   // static
//   app.use('/', express.static('./',options));

app.post('/addnote', async (req,res)=>{
    var title = req.body.title
    var notebody = req.body.notebody
    var noteimportance = req.body.noteimportance
    console.log(title+" "+notebody+" "+noteimportance)
    var addusersquery = `INSERT INTO notes VALUES ($1,$2,$3,NOW())`
    try {
        const result = await pool.query(addusersquery,[title, notebody, noteimportance])
        // respond with json of success
        res.json({
            isSuccess: true,
            message: "Success",
        })
    }
    catch (error){
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
        console.log(error)
    }

})

app.get('/getnotes', async (req, res)=>{
    var query_string = `SELECT * FROM notes`
    try {
        const result = await pool.query(query_string)
        console.log(result.rows)
        res.json({
            isSuccess: true,
            message: "Success",
            res: result.rows
        })
    }
    catch (error){
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }
}
)

app.listen(PORT, ()=>{
console.log(`listening to port ${PORT}`);
})


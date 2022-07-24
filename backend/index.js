const express = require('express')
var cors = require('cors');

const app = express()
app.use('/', cors())

const PORT = process.env.PORT || 3000
const path = require('path')
const reactBuild = path.join(__dirname, 'build')

app.use(express.static(reactBuild))
const { Pool } = require('pg')

// var pool = new Pool({
//     connectionString: 'postgres://ntppecvi:eGj2ZvkW8QlZOGwhCFCvYOcI1NJWFpak@heffalump.db.elephantsql.com/ntppecvi',
//     host: 'heffalump.db.elephantsql.com',
//     user: 'ntppecvi',
//     password: 'eGj2ZvkW8QlZOGwhCFCvYOcI1NJWFpak',
//     database: 'note_maker'
//   })

var pool = new Pool({
    user: 'postgres',
    host:'db',
    database: 'notes',
    password: 'admin',
})
  
// parsing body of requests
app.use(express.json())
app.use(express.urlencoded( {extended:false} ))


app.post('/addnote', async (req,res)=>{
    var title = req.body.title
    var notebody = req.body.notebody
    var noteimportance = req.body.noteimportance
    var currentTime = req.body.modify
    // console.log(title+" "+notebody+" "+noteimportance)
    var addusersquery = `INSERT INTO notes VALUES (DEFAULT, $1,$2,$3,$4)`
    try {
        const result = await pool.query(addusersquery,[title, notebody, noteimportance, currentTime])
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
        // console.log(result.rows)
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

app.delete('/deletenote', async (req,res)=>{
    var title = req.body.title
    var delete_query_string = `DELETE FROM notes WHERE id = $1`
    try {
        const result = await pool.query(delete_query_string,[title])
        res.json({
            isSuccess: true,
            message: "Success",
            res: result.rows,
        })
    }
    catch (error){
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }

})

app.put('/updatenote', async (req, res)=>{
    console.log(req.body.id)
    var id = parseInt(req.body.id)
    var title = req.body.title
    var noteBody =  req.body.notebody
    var current = req.body.modify
    var noteSeverity = req.body.noteimportance
    console.log(id)
    
    const update_notes_query = `UPDATE notes 
                   SET title=$1, notebody=$2, noteimportance=$3, modify=$4 
                   WHERE id=$5`

    try {
        await pool.query(update_notes_query,[title, noteBody, noteSeverity, current, id])
        res.json({
            isSuccess: true,
            message: "Success",
        })
    }
    catch (error) {
        console.log(error)
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
        
    }
})

app.listen(PORT, ()=>{
console.log(`listening to port ${PORT}`);
})


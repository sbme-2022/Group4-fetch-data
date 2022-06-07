const express = require("express");
const cors = require('cors')
const sqlite3 = require('sqlite3')

const app = express();
app.use(express.json());
app.use(cors())

const api = require('./utils/API_fetch_data')
const db = new sqlite3.Database('./database.sqlite3',(err)=>{
        if (err) {
            console.log('Could not connect to database', err)
        } else {
            db.run(`
            CREATE TABLE IF NOT EXISTS currency_rates (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rates TEXT)`)
        }
    })

const save_data_to_db = async (req,res) => {
    const data = await api();
    var rates = JSON.stringify(JSON.parse(data)['rates'])

    db.run('INSERT INTO currency_rates (rates) VALUES (?)',[rates])
    
    res.status(201).json({'status': 'success'})
}

const get_data = async (req,res) => {
    var data = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM currency_rates ', (err, rows) => {
          if (err) {
            console.log(err)
          } 
        })
    })
   
    res.status(200).json({
        'status': 'success',
        'data' : data
    })
}

app.post('/', save_data_to_db)
app.get('/', get_data)

module.exports = app;
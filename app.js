const express = require("express");
const cors = require('cors')
const https = require('https');
const app = express();

app.use(express.json());
app.use(cors())

const options = {
    hostname: 'api.apilayer.com',
    port: 443,
    path:'/exchangerates_data/latest?symbols=AED&base=USD',
    method: 'GET',
    headers:{
        'apikey': process.env.API_KEY
    }
  };

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
  
    res.on('data', function(data) {
        data = JSON.parse(data)['rates'];
        console.log("Body:" + data['AED']);
    });
    
  });

req.on('error', error => {
console.error(error);
});

req.end();

module.exports = app;
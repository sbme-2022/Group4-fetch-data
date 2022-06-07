const https = require('https');
const Promise = require('bluebird');

const options = {
    hostname: 'api.apilayer.com',
    port: 443,
    path:'/exchangerates_data/latest',
    method: 'GET',
    headers:{
        'apikey': process.env.API_KEY
    }
  };

const API_fetch_data = async function(){
    return new Promise ((resolve,reject)=> {
        https.get(options, res => {
            console.log(`statusCode: ${res.statusCode}`);
            var body =''
            res.on('data', function(data) {
                body+=data
            });
            res.on('end',function(){
                resolve(body)
            })
        });
    });
}

module.exports = API_fetch_data;
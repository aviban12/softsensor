const express = require('express')
const app = express()
const https = require('https');
var bodyParser = require('body-parser');  
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    https.get('https://fakestoreapi.com/products', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', ()=> {
            res.send({
                data: JSON.parse(data)
            })
            console.log("request completed");
        })
    }).on("error", (err) => {
        console.log('Error: ' + err.message);
    });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
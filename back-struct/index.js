const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


function genID(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const ID = genID(0, 100000);


const { URLSearchParams } = require('url');

const fetch = require('node-fetch');
const modelServer = 'http://model-service'

app.post('/predict', function(req, res) {
    let a = req.body['a'];
    let b = req.body['b'];

    result = {
        'backid': ID
    };

    const params = new URLSearchParams();
    params.append('a', a);
    params.append('b', b);

    fetch(modelServer+'/predict', { method: 'POST', body: params })
        .then(modelres => modelres.json())
        .then(modelres => {
            result['result'] = 'success';
            result['value'] = modelres['result'];
            result['modelid'] = modelres['fingerprint'];
            res.send(result);
        })
        .catch(err => {
            result['result'] = 'fail';
            result['error'] = err;
            result['modelid'] = -1;
            res.send(result);
        });
});


//health check

app.get('/', function(req, res) {
    res.send({'result': 'success'});
});


const PORT = 8080;

const server = app.listen(PORT, function() {
    console.log('listenning on port ' + PORT.toString());
});
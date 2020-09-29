let express = require('express'),
    body_parser = require('body-parser'),
    fs = require('fs'),
    util = require('util');

require('dotenv').config()

var app = express();

// Log a Archivo

var log_file = fs.createWriteStream(__dirname + '/node.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { 
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

//MIDDLEWARE

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());

app.get('/', function (req, res) {
    res.send('Entrada');
});

//API REST
//http://localhost:80/parametros

app.post('/parametros', function (req, res) {
    console.log(req.body);
    let numbers = 0;

    Object.keys(req.body).forEach(function(key,index)  {
        console.log(req.body[key])
        const num = req.body[key];
        if(!isNaN(num)){
            numbers = numbers + num;
        }
        
    });

    res.send('La suma de parametros numéricos es: '+numbers);
});

app.listen(process.env.PORT, () => {
    console.log("Starting port " + process.env.PORT + ", http://localhost:"+process.env.PORT)
})


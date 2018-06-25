const express = require('express');
const parser = require('body-parser');
const bs = require('./base/connect.js');
const rut = require('./rt.js');
const st = require('./base/create_mod.js');
const port = process.env.PORT || 1212;
const ini = require('./ini_base.js');

ini.ini_base();

var app = express();
app.use('/',express.static(__dirname+'/doc/library/public'));
app.use(parser.json());
app.use(parser.urlencoded({extend:false}));
app.use('/service',rut);



app.listen(port,()=>{
		console.log(`BUEN DIA ESTAMOS ESCUCHANDO EN EL PUERTO ${port}`);

});

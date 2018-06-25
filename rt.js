const express = require('express');
const parser = require('body-parser');
const mbook = require('./base/mod_book.js');
const mloan = require('./base/mod_loan.js');
const muser = require('./base/mod_user.js');
const mongo = require('mongodb').ObjectId;
const fecha = require('moment');
var router = express.Router();



router.use(parser.json());
router.use(parser.urlencoded({extend:true}));


router.get('/books',(req,res)=>{
			console.log('hola estamos probando');
			mbook.books({},'total')
				.then(data =>{
					res.header('Access-Control-Allow-Origin', '*');
	//				console.log(data);
					res.status(200).json(data);
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});
});

router.get('/book/:title',(req,res)=>{
			console.log('hola estamos probando');
			var cod = req.params.title;
			console.log(cod)
			var query = {"title":cod,state:'ACTIVE'};
			mbook.books(query,'unit')
				.then(data =>{
					res.header('Access-Control-Allow-Origin', '*');
					console.log(data);
					res.status(200).json(data);
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});

});



router.post('/createbook',(req,res)=>{
			console.log('PROBANDO UN NUEVO INGRESO');
			var body = req.body;
		//	console.log(body);
			mbook.create_book(body)
				.then(ms =>{
					res.setHeader('Access-Control-Allow-Origin','*');
					res.status(200).json(ms);
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});


});

router.post('/uptobook',(req,res)=>{
			var id = req.body.id;
			var query = { "_id" : mongo(id)};
			var body = req.body;
			console.log('ESTAS INGRESANDO LA MODIFICACION DE UN LIBRO')
		//	console.log(query);
		//	console.log(body);
			mbook.update_book(query,body,'total')
				.then(ms =>{
					res.setHeader('Access-Control-Allow-Origin','*');
					res.status(200).json(ms);
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});

});


router.post('/createloan',(req,res)=>{
			console.log('PROBANDO UN NUEVO INGRESO loan');
			var body = req.body;
			var codi = req.body.cbook;
			console.log(body);
			var query ={"_id":mongo(codi)};
			var newdate = {$set:{state:'LOAN'}};
			mloan.create_loan(body)
				.then(ms =>{
					mbook.update_book(query,newdate,'unit')
						.then(ms =>{
							res.setHeader('Access-Control-Allow-Origin','*');
							res.status(200).json(ms);
						})
						.catch(err =>{
							res.setHeader('Access-Control-Allow-Origin', '*');
							res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
						});
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});
});


router.get('/loans',(req,res)=>{
			console.log('hola estamos probando enviar los prestamos');
			mloan.loans({},'total')
				.then(data =>{
					res.header('Access-Control-Allow-Origin', '*');
				//	console.log(data);
					res.status(200).json(data);
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});
});


router.get('/loans/:cuser',(req,res)=>{
			console.log('hola estamos probando enviar los prestamos');
			var us = req.params.cuser;
			var query = {cuser:us};
			mloan.loans(query,'unit')
				.then(data =>{
					res.header('Access-Control-Allow-Origin', '*');
				//	console.log(data);
					res.status(200).json(data);
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});
});

router.post('/rutloan',(req,res)=>{
			var idbook = req.body.cbook;
			var idloan =req.body.loan;
			var query_loan = { "_id" : mongo(idloan)};
			var query_book = {"_id": mongo(idbook)};
			var newdatebook = {$set:{state:'ACTIVE'}};
			var newdateloan = {$set:{state:'DELIVERED', delivery:fecha().format()}};
			var body = req.body;
			mloan.update_loan(query_loan,newdateloan,'unit')
				.then(ms =>{
					mbook.update_book(query_book,newdatebook,'unit')
						.then(ms =>{
							res.setHeader('Access-Control-Allow-Origin','*');
							res.status(200).json(ms);
						})
						.catch(err=>{
							console.log(err);
							res.setHeader('Access-Control-Allow-Origin', '*');
							res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
						});
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});
});


router.get('/login/:use/:pass',(req,res)=>{
			console.log('BIENVENIDO A TU BIBLIOTECA AMIGA :D');
			var userd = req.params.use;
			var passd = req.params.pass;
			var query ={ name:userd,pass:passd};
			console.log(query)
			muser.users(query,'unit')
				.then(data =>{
					res.header('Access-Control-Allow-Origin', '*');
					console.log(data);
					if(data.auth == true){
						res.status(200).json(data);
					}else{
						res.status(401).json({message:'NO TIENES ACCESO AMIGO '});
					}
				})
				.catch(err =>{
					console.log(err);
					res.setHeader('Access-Control-Allow-Origin', '*');
					res.status(500).json({message:'ERROR CON EL SERVIDOR POR FAVOR PONERCE EN CONTACTO CON EL SERVICIO TECNICO MUCHAS GRACIAS!'});
				});

});



module.exports = router;

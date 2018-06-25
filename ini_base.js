const base = require('./base/mod_user.js');

var  us ={
	name:'usuario_normal',
	pass:'prueba_prestalibros',
	rol:'us'
}
var admin = {
	name:'admin',
	pass:'ingresa_libros',
	rol:'admi'
}






module.exports.ini_base = ()=>{
base.users({},'total')
	.then(r=>{

		if(r['auth'] == false){
		base.create_user(us)
			.then(ms =>{
					console.log(ms);
					console.log(us);
			})
			.catch(err=>{console.log(err)});
		base.create_user(admin)
	        	.then(ms =>{
        	        	        console.log(ms);
        	        	        console.log(us);
        		})
        		.catch(err=>{console.log(err)});
		}else{
			console.log('YA ESTAN CREADOS LOS USUARIOS DE PRUEBA');
		}
	}).catch(err =>{console.log(err)});
};







const conn = require('./connect.js');
const fecha = require('moment');

//fragmentos operativos


alluser =(db,q,tip)=>{
	return new Promise((res,rej)=>{
	 	var base = db.db('biblioteca');
		var query;
		if(tip=='total'){
			query ={}
		}else if(tip=='unit'){
			query = q;
		}
		base.collection('user').find(query).toArray((err,result)=>{
			if(err) return rej(err);
			if(result.length==0){
				return res({auth:false});
			}else{
				console.log(result[0]['rol']);
				var rol = result[0]['rol'];
				var n = result[0]['name'];
				var cuser = result[0]['_id'] ;
				return res({auth:true , user:rol , name:n , id:cuser});
			}
		});
	});
};

cruser=(db,data)=>{
	var obj = {
			name:data.name,
			pass:data.pass,
			rol:data.rol
		}
	var base = db.db('biblioteca');
	return new Promise((res,rej)=>{
			base.collection('user').insertOne(obj,(err,rep)=>{
					if(err) return rej(err);
				//	console.log(rep);
					return res({confi:'AFIRMATIVO'});
			});

		});
};

upuser=(db,query,dat,tip)=>{
		var obj;
		if(tip=='total'){
			 obj = {
				$set:{
				}
			}
		}else if(tip=='unit'){
			obj = dat;
		}
		var base = db.db('biblioteca');
			return new Promise((res,rej)=>{
				//	console.log(query);
				//	console.log(obj);
					base.collection('user').updateOne(query,obj,(err,rep)=>{
							if(err) return res(err);
				//			console.log(rep);
							return res({confi:'AFIRMATIVO'});
					});
				});


};
//--------------------------------------------------------------------------------------------<XV_950805>
module.exports.users = (q,tip)=>{
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db => {
							alluser(db,q,tip)
								.then(r=>{
									return res(r);
								})
								.catch(err=> rej({message:'PROBLEMAS AMIGO'}));
							db.close();
						})
						.catch(err => {
							console.log(err);
							rej({message:'PROBLEMAS AMIGO'})
						});
				});
};




module.exports.create_user = (data)=>{
			console.log(data)
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db =>{
							cruser(db,data)
								.then(ms=>{
									return res(ms);
								})
								.catch(err=> rej({message:'PROBLEMAS AMIGO'}));
							db.close();
						})
						.catch(err => {
							console.log(err);
							rej({message:'PROBLEMAS AMIGO'});
						});
				});
};
module.exports.update_user = (q,dat,tip)=>{
		//	console.log(q);
		//	console.log(dat);
		//	console.log(tip);
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db =>{
							upuser(db,q,dat,tip)
								.then(ms =>{
									return res(ms);
								})
								.catch(err => rej({message:'PROBLEMAS AMIGO'}));
							db.close();
						})
						.catch(err =>{
							console.log(err);
							rej({message:'PROBLEMAS AMIGO'});
						});
				});

};

const conn = require('./connect.js');
const fecha = require('moment');

//fragmentos operativos


allloan =(db,q,tip)=>{
	return new Promise((res,rej)=>{
	 	var base = db.db('biblioteca');
		var query;
		if(tip=='total'){
			query ={}
		}else if(tip=='unit'){
			query = q;
		}
		base.collection('loan').find(query).toArray((err,result)=>{
			if(err) return rej(err);
			if(result.length==0){
				return res([{
			_id:'no hay nada',
			clibrary:'no hay nada',
                        cuser:'no hay nada',
                        create:'no hay nada' ,
                        floan:'no hay nada',
                        state:'no hay nada',
                        cbook:'no hay nada',
                        ret:'no hay nada',
                        delivery:'no hay nada',
                        name:'no hay nada',
                        title:'no hay nada'
					}]);
			}else{
				console.log(result);
				return res(result);
			}
		});
	});
};

crloan=(db,data)=>{
	var obj = {
			clibrary:data.clibrary,
			cuser:data.cuser,
			create:fecha().format() ,
			floan:data.floan,
			state:"ACTIVE",
			cbook:data.cbook,
			ret:data.ret,
			delivery:'',
			name:data.name,
			title:data.title
		}
	var base = db.db('biblioteca');
	return new Promise((res,rej)=>{
			base.collection('loan').insertOne(obj,(err,rep)=>{
					if(err) return rej(err);
				//	console.log(rep);
					return res({confi:'AFIRMATIVO'});
			});

		});
};

uploan=(db,query,dat,tip)=>{
		var obj;
		if(tip=='total'){
			 obj = {
				$set:{
		 			clibrary:dat.clibrary,
					cuser:dat.cuser,
					create:dat.create,
					floan:dat.floan,
					state:dat.state,
					cbook:dat.cbook,
					ret:dat.ret,
					delivery:dat.delivery
				}
			}
		}else if(tip=='unit'){
			obj = dat;
		}
		var base = db.db('biblioteca');
			return new Promise((res,rej)=>{
				//	console.log(query);
				//	console.log(obj);
					base.collection('loan').updateOne(query,obj,(err,rep)=>{
							if(err) return res(err);
				//			console.log(rep);
							return res({confi:'AFIRMATIVO'});
					});
				});


};
//--------------------------------------------------------------------------------------------<XV_950805>
module.exports.loans = (q,tip)=>{
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db => {
							allloan(db,q,tip)
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




module.exports.create_loan = (data)=>{
			console.log(data)
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db =>{
							crloan(db,data)
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
module.exports.update_loan = (q,dat,tip)=>{
		//	console.log(q);
		//	console.log(dat);
		//	console.log(tip);
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db =>{
							uploan(db,q,dat,tip)
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

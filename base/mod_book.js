const conn = require('./connect.js');
const ubook = require('./map.js');
const fecha = require('moment');

//fragmentos operativos


allbook =(db,q,tip)=>{
	return new Promise((res,rej)=>{
	 	var base = db.db('biblioteca');
		var query;
		if(tip=='total'){
			query ={}
		}else if(tip=='unit'){
			query = q;
		}
		base.collection('libro').find(query).toArray((err,result)=>{
			if(err) return rej(err);
			if(result.length==0){
				return res([{
			title:'no hay nada',
                       	editorial:'no hay nada',
                        isbn: 'no hay nada',
                        edition: 'no hay nada',
                        create:'no hay nada' ,
                        clibrary:'no hay nada',
                        state:'no hay nada',
                        language: 'no hay nada'



				}]);
			}else{
				console.log(result);
				return res(result);
			}
		});
	});
};

crbook=(db,data)=>{
	var obj = {
			title: data.title,
			editorial: data.editorial,
			isbn: data.isbn,
			edition: data.edition,
			create:fecha().format() ,
			clibrary:data.clibrary,
			state:"ACTIVE",
			language: data.language
		}
	var base = db.db('biblioteca');
	return new Promise((res,rej)=>{
			base.collection('libro').insertOne(obj,(err,rep)=>{
					if(err) return rej(err);
				//	console.log(rep);
					return res({confi:'AFIRMATIVO'});
			});

		});
};

upbook=(db,query,dat,tip)=>{
		var obj;
		if(tip=='total'){
			 obj = {
				$set:{
		 			title: dat.title,
					editorial: dat.editorial,
					isbn: dat.isbn,
					edition: dat.edition,
					create:dat.create ,
					clibrary:dat.clibrary,
					state:dat.state,
					language: dat.language
				}
			}
		}else if(tip=='unit'){
			obj = dat;
		}
		var base = db.db('biblioteca');
			return new Promise((res,rej)=>{
				//	console.log(query);
				//	console.log(obj);
					console.log(obj);
					console.log(query)
					base.collection('libro').updateOne(query,obj,(err,rep)=>{
							if(err) return res(err);
				//			console.log(rep);
							return res({confi:'AFIRMATIVO'});
					});
				});


};
//--------------------------------------------------------------------------------------------<XV_950805>
module.exports.books = (q,tip)=>{
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db => {
							allbook(db,q,tip)
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




module.exports.create_book = (data)=>{
			console.log(data)
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db =>{
							crbook(db,data)
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
module.exports.update_book = (q,dat,tip)=>{
		//	console.log(q);
		//	console.log(dat);
		//	console.log(tip);
			return new Promise((res,rej)=>{
					conn.con_library()
						.then(db =>{
							upbook(db,q,dat,tip)
								.then(ms =>{
							//		console.log(dat);
							//		console.log(q)
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

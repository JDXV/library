const conn = require('./connect.js');
const bs = 'biblioteca';
crcollection=(db,colle)=>{
		var base = db.db(bs);
	return new Promise((res,rej)=>{
				base.createCollection(colle,(err,rep)=>{
					if(err) return rej(err);
				//
//	console.log(rep);
					return res({confi:`AFIRMATIVO ${colle}`});
				});
			});


};

conn.con_library()
	.then(db =>{
			crcollection(db,'libro')
				.then(ms=>{console.log(ms)})
				.catch(err => console.log(err));
			crcollection(db,'user')
				.then(ms =>{console.log(ms)})
				.catch(err =>{console.log(err)});
			crcollection(db,'loan')
				.then(ms =>{console.log(ms)})
				.catch(err =>{console.log(err)});
	})
	.catch(err=>{
			console.log(err);
	});

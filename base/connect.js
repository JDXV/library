const client = require('mongodb').MongoClient;
const url = 'mongodb:\/\/localhost:27017';

module.exports.con_library = ()=>{
					return new Promise((res,rej)=>{
						client.connect(url,(err,db)=>{
							if(err) return rej(err);
							return res(db);
						});
					});
};



  const mysql =require('mysql');

  const mysqlConexion = mysql.createConnection({
  	host: 'localhost',
  	user: 'root',
  	password: '',
  	database: 'china_long'
  },'single');

  mysqlConexion.connect(function(err){
  	if(err){
  		console.log(err);
  		return;
  	}else{
  		console.log('Base de datos conectada correctamente');
  	}
  });


  module.exports = mysqlConexion;
const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/mesero',(req,res) =>{
	mysqlConexion.query('SELECT * FROM mesero',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


module.exports =rutas;
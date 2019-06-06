const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/clientemesa',(req,res) =>{
	mysqlConexion.query('SELECT * FROM clientemesa',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


module.exports =rutas;
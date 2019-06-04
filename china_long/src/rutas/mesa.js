
const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/mesa',(req,res) =>{
	mysqlConexion.query('SELECT * FROM mesa',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


module.exports =rutas;
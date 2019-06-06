
const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

//Consulta de mesas libres
rutas.get('/mesa',(req,res) =>{
	mysqlConexion.query('SELECT * FROM mesa',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


//Dar de alta mesas
rutas.post('/mesa',(req,res) =>{
	const { IDMesa, Cantidad} = req.body;
	const query = "INSERT INTO mesa(IDMesa,Cantidad) VALUES(?,?)";
	mysqlConexion.query(query,[IDMesa,Cantidad],(err,filas,campos)=>{
		if(!err){
			res.json({estatus:"¡Mesa agregada con"+Cantidad+" de capacidad"});
		}else{
			console.log(err);
		}
	})
	});

module.exports =rutas;
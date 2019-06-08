const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/ClienteMesa',(req,res) =>{
	mysqlConexion.query('SELECT * FROM ClienteMesa',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//INSERTAR RESERVACION
rutas.post('/ClienteMesa',(req,res) =>{
	var  {IDMesa1,IDMesa2,IDCliente} = req.body;
	const query = "INSERT INTO ClienteMesa(IDMesa1,IDMesa2,IDCliente) VALUES(?,?,?)";
		mysqlConexion.query(query,[IDMesa1,IDMesa2,IDCliente],(err,filas,campos) => {
			if(!err){
				res.json({estatus: 'la Mesa ha sido dado de alta exitosamente!'})
				}else{
					console.log("Hay un error "+err);	
				}
			})
	var  {IDEmp,IDMesa} = req.body;
		const query1 = "INSERT INTO Meseromesa(IDEmp,IDMesa) VALUES(?,?)";
		mysqlConexion.query(query1,[IDEmp,IDMesa],(err,filas,campos) => {
		if(!err){
		 res.json({estatus: 'El Mesero se ha asignado exitosamente!'})
				}else{
					console.log("Hay un error "+err);	
				}

		})
	});


module.exports =rutas;
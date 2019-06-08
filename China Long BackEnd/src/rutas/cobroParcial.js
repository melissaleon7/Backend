const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/CobroParcial',(req,res) =>{
	mysqlConexion.query('SELECT * FROM CobroParcial',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


//Cobrar
rutas.post('/CobroParcial/:IDCliente',(req,res) => {
	var {IDVenta,IDMesa,IDCliente,Cantidad,SubTotal} = req.body; 

             
			var IVA=SubTotal*0.16;
			var Total = SubTotal+IVA;
		

	const query = "INSERT INTO CobroParcial(IDVenta,IDMesa,IDCliente,Cantidad,SubTotal,IVA,Total) VALUES(?,?,?,?,?,?,?)";
	mysqlConexion.query(query,[IDVenta,IDMesa,IDCliente,Cantidad,SubTotal,IVA,Total],(err,filas,campos) => {
	if(!err){
		res.json({estatus: 'CobroParcial generado exitosamente!'})
	}else{
		console.log("Hay un error "+err);	
		}
	});
});   		

rutas.post('/CobroParcial/:IDMesa',(req,res) => {
var {IDVenta,IDMesa,IDCliente,Cantidad,SubTotal} = req.body; 
 
				var IVA=SubTotal*0.16;
			var Total = SubTotal+IVA;



					const query = "INSERT INTO CobroParcial(IDVenta,IDMesa,IDCliente,Cantidad,SubTotal,IVA,Total) VALUES(?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDVenta,IDMesa,IDCliente,Cantidad,SubTotal,IVA,Total],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'CobroParcial generado exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});
});   



module.exports =rutas;
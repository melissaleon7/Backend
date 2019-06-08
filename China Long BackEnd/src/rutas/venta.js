const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/venta',(req,res) =>{
	mysqlConexion.query('SELECT * FROM venta',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


//Cobrar
rutas.post('/venta/:IDCliente',(req,res) => {
	var {IDVenta,IDCliente,CantidadTotal,SubTotal} = req.body; 

            var f = new Date();
            var SubTotal1 = SubTotal*CantidadTotal;
			var IVA=SubTotal*0.16;
			var Total = SubTotal+IVA;
			var Fecha =  f.getDate();
			var Hora = f.getHours();

	const query = "INSERT INTO venta(IDVenta,IDCliente,CantidadTotal,SubTotal,IVA,Total,Fecha,Hora) VALUES(?,?,?,?,?,?,?,?)";
	mysqlConexion.query(query,[IDVenta,IDCliente,CantidadTotal,SubTotal,IVA,Total,Fecha,Hora],(err,filas,campos) => {
	if(!err){
		res.json({estatus: 'Venta generada exitosamente!'})
	}else{
		console.log("Hay un error "+err);	
		}
	});
});   		

rutas.post('/venta/:IDMesa',(req,res) => {
var {IDVenta,IDCliente,CantidadTotal,SubTotal} = req.body; 
   var f = new Date();
				var IVA=SubTotal*0.16;
			var Total = SubTotal+IVA;
			 var Fecha =  f.getDate();
			 var Hora = f.getHours();


					const query = "INSERT INTO venta(IDVenta,IDCliente,CantidadTotal,SubTotal,IVA,Total,Fecha,Hora) VALUES(?,?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDVenta,IDCliente,CantidadTotal,SubTotal,IVA,Total,Fecha,Hora],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'Venta generada exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});
});   



module.exports =rutas;
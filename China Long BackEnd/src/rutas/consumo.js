const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

rutas.get('/consumo',(req,res) =>{
	mysqlConexion.query('SELECT * FROM consumo',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//Agregar Pedido
rutas.post('/Consumo',(req,res) => {
	var {IDConsumo,IDCliente,IDPlatillo,IDEmp,Cantidad,IDMesa1,IDMesa2} = req.body;
    if(validacion(Cantidad))
    {     

      //Aquí regresamo el ID de la última inserción para agregarlo al nuevo empleado+1
			const query1 = "SELECT MAX(IDConsumo) AS mayor FROM Consumo";
		 	 mysqlConexion.query(query1,(err,filas,campos)=>{
				if(!err){
					if(filas[0].mayor<=0){
						IDConsumo = 1;
						
						 //Aquí va la validación de duplas
			
					const query = "INSERT INTO Consumo(IDConsumo,IDCliente,IDPlatillo,IDEmp,Cantidad,IDMesa1,IDMesa2) VALUES(?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDConsumo,IDCliente,IDPlatillo,IDEmp,Cantidad,IDMesa1,IDMesa2],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'el Pedido ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error 1"+err);	
						}
						});

		 	 			 	 
		 	
					}else
					{
						var IDConsumo = filas[0].mayor + 1;
            
					const query = "INSERT INTO Consumo(IDConsumo,IDCliente,IDPlatillo,IDEmp,Cantidad,IDMesa1,IDMesa2) VALUES(?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDConsumo,IDCliente,IDPlatillo,IDEmp,Cantidad,IDMesa1,IDMesa2],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'el Pedido ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error 2 "+err);	
						}
						});
		 	 		}
		 	 	
					
				}else{
					console.log(err);
				}
			});
			
	}else{

		res.json({estatus:'Datos incompletos'})
	}
    		
});

function validacion(Cantidad)
{
	var respuesta=true;

	if(Cantidad==""){
		respuesta=false;
	}
	return respuesta; 
}


module.exports =rutas;
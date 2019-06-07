const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')


//Consulta de mesas libres
rutas.get('/mesaLibre',(req,res) =>{
	mysqlConexion.query('SELECT m.IDMesa,m.Cantidad FROM mesa AS m INNER JOIN clientemesa AS cm ON cm.IDMesa1=m.IDMesa WHERE cm.IDCliente = ""  ',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//consulta de mesas ocupadas
rutas.get('/mesaOcupada',(req,res) =>{
	mysqlConexion.query('SELECT m.IDMesa FROM mesa AS m INNER JOIN clientemesa AS cm ON cm.IDMesa1=m.IDMesa WHERE cm.IDCliente <> ""  ',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//Buscar mesa por ID
rutas.get('/mesa/:IDmesa',(req,res)=>{
	const IDmesa=req.params.IDmesa;
	mysqlConexion.query('SELECT * FROM mesa WHERE IDmesa = ?',[IDmesa],(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err);
		}
	})
});








//Alta de mesa
rutas.post('/mesa',(req,res) => {
	var {Cantidad} = req.body;
    if(validacion(Cantidad))
    {     
    	

      //Aquí regresamo el ID de la última inserción para agregarlo al nuevo empleado+1
			const query1 = "SELECT MAX(IDMesa) AS mayor FROM mesa";
		 	 mysqlConexion.query(query1,(err,filas,campos)=>{
				if(!err){
					if(filas[0].mayor<=0){
						IDMesa = 1;
						
						 //Aquí va la validación de duplas
			
					const query = "INSERT INTO mesa(IDMesa,Cantidad) VALUES(?,?)";
					mysqlConexion.query(query,[IDMesa,Cantidad],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'La mesa '+Nombre+' ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
						});

		 	 			 	 
		 	
					}else
					{
						var IDMesa = filas[0].mayor + 1;
					    
            
					const query = "INSERT INTO mesa(IDMesa,Cantidad) VALUES(?,?)";
					mysqlConexion.query(query,[IDMesa,Cantidad],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'La mesa ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
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



//Modificar mesa
rutas.put('/mesa/:IDmesa',(req,res) =>{
	const IDmesa = req.params.IDmesa;
	const {Cantidad} = req.body;
	if(validarModificar(Cantidad))
	{


	if(buscarId(IDmesa))
	{


	const query= "UPDATE mesa SET Cantidad=? WHERE IDmesa = ?";
	mysqlConexion.query(query,[Cantidad,IDmesa],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "La mesa "+IDmesa+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
}else{
	res.json({estatus:'Mesa no existente'})
}
}else{
	res.json({estatus:'Datos incompletos'})
}
});


//Eliminar mesa
rutas.delete('/mesa/:IDmesa'),(req,res) =>{
	const IDmesa= req.params.IDmesa;
	if(buscarId(IDmesa))
	{


	const query ="DELETE FROM mesa WHERE IDmesa = ?";
	mysqlConexion.query(query,[IDmesa],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "la mesa"+IDmesa+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
}else
{
	res.json({estatus:'Mesa no existente'})
}
};


module.exports =rutas;


function validacion( Cantidad ){
	
    var respuesta=true;



	if(Cantidad == ""){
		respuesta=false;
	}
	 return respuesta;
}




function validarModificar(Cantidad){
	
    var respuesta=true;

	if(Cantidad == ""){
		respuesta=false;
	}
	 return respuesta;
}

function buscarId(IDMesa)
{
var respuesta=true;
const query ="SELECT * FROM mesa WHERE IDMesa=?";
mysqlConexion.query(query,[IDMesa],(err,filas,campos)=>{ 
   if(!err){
			respuesta= false;
			return respuesta;
		}else{
			console.log(err);
		}
	})
}
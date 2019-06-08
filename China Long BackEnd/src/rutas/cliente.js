const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')


//Consulta de Clientes
rutas.get('/Cliente',(req,res) =>{
	mysqlConexion.query('SELECT IDCliente,Nombre,ApPat,ApMat FROM Cliente',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


//Buscar Cliente por ID
rutas.get('/Cliente/:IDCliente',(req,res)=>{
	const IDCliente=req.params.IDCliente;
	if(buscarId(IDCliente))
	{

	
	mysqlConexion.query('SELECT * FROM Cliente WHERE IDCliente = ?',[IDCliente],(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err);
		}
	})
}else
{
	res.jsonm({estatus:'Cliente no existente'})
}
});




//Alta de un Cliente
rutas.post('/Cliente',(req,res) => {
	var { Nombre, ApPat, ApMat, Nac, RFC, Tel} = req.body;
    if(validacion(Nombre, ApPat, ApMat, Nac))
    {
    	if(validarNumero(Tel))
    	{
			const query1 = "SELECT MAX(IDCliente) AS mayor FROM Cliente";
		 	 mysqlConexion.query(query1,(err,filas,campos)=>{
				if(!err){
					if(filas[0].mayor<=0){
						IDCliente = 1;
						RFC = validarRFC(RFC);
					    Tel = validarTelefono(Tel);

              //Aquí va la validación de duplas
			const query2 = "SELECT Nombre, ApPat,ApMat FROM Cliente WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Cliente '+Nombre+' duplicado'}) 

		 	 	}else{
					const query = "INSERT INTO Cliente(IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel) VALUES(?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El Cliente '+Nombre+' ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});

		 	 	}
		 	 })
					}else
					{
						var IDCliente = filas[0].mayor + 1;
					    RFC = validarRFC(RFC);
					    Tel = validarTelefono(Tel);

              //Aquí va la validación de duplas
			const query2 = "SELECT Nombre, ApPat,ApMat FROM Cliente WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Cliente '+Nombre+' duplicado'}) 

		 	 	}else{
					const query = "INSERT INTO Cliente(IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel) VALUES(?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El Cliente '+Nombre+' ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});

		 	 	}
		 	 })		
				}	
				}else{
					console.log(err);
				}
			
		});
		 	}else{
				res.json({estatus:'Teléfono debe ser numérico.'})
		 	}
	}else{

		res.json({estatus:'Datos incompletos'})
	}
    		
});




//Modificar Cliente
rutas.put('/Cliente/:IDCliente',(req,res) =>{
    const IDCliente =req.params.IDCliente;
	const {Nombre, ApPat, ApMat} = req.body;
	if(validarModificar(Nombre, ApPat, ApMat))
	{	if(buscarId(IDCliente))
		{



		const query2 = "SELECT Nombre, ApPat,ApMat FROM Cliente WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Cliente '+Nombre+' duplicado'}) 

		 	 	}else{
	const query= "UPDATE Cliente SET Nombre = ?, ApPat = ?, ApMat = ? WHERE IDCliente = ?";
	mysqlConexion.query(query,[Nombre, ApPat, ApMat, IDCliente],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El Cliente "+Nombre+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
}
})}else
		 	 	{
		 	 		res.json({estatus:'Cliente no existente'})
		 	 	}
}else{
	res.json({estatus:'Datos incompletos'})
}
});




//Eliminar Cliente
rutas.delete('/Cliente/:IDCliente'),(req,res) =>{
	const IDCliente= req.params.IDCliente;
	if(buscarId(IDCliente))
	{


	const query ="DELETE FROM Cliente WHERE IDCliente = ?";
	mysqlConexion.query(query,[IDCliente],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El Cliente "+Nombre+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
}else
{
	res.json({estatus:'Cliente no existente'})
}
};

module.exports =rutas;

function validacion( Nombre, ApPat, ApMat, Nac){
	
    var respuesta=true;



	if(Nombre == ""){
		respuesta=false;
	}
	if(ApPat == ""){
		respuesta=false;
	}
	if(ApMat == ""){
		respuesta=false;
	}
	if(Nac == ""){
		respuesta=false;
	}
	 return respuesta;
}



function validarModificar(Nombre, ApPat, ApMat){
	
    var respuesta=true;



	if(Nombre == ""){
		respuesta=false;
	}
	if(ApPat == ""){
		respuesta=false;
	}
	if(ApMat == ""){
		respuesta=false;
	}
	
	 return respuesta;
}

function validarTelefono(Tel){
	var respuesta='';

	if(Tel=="")
	{
		respuesta= 'Sin telefono';
	}

	return respuesta;
}

function validarRFC(RFC){
	var respuesta='';

	if(RFC == "")
	{
		respuesta='Sin RFC';
	}

	return respuesta;
}




function buscarId(IDCliente)
{
var respuesta=true;
const query ="SELECT * FROM Cliente WHERE IDCliente=?";
mysqlConexion.query(query,[IDCliente],(err,filas,campos)=>{ 
   if(!err){
			respuesta= false;
			return respuesta;
		}else{
			console.log(err);
		}
	})
}


function validarNumero(Tel)
{
	var respuesta=true;
	if(isNaN(Tel)){
		respuesta=false;
	}
	return respuesta;
}

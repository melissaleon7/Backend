const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')


//Consulta de clientes
rutas.get('/cliente',(req,res) =>{
	mysqlConexion.query('SELECT IDCliente,Nombre,ApPat,ApMat FROM cliente',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});


//Buscar cliente por ID
rutas.get('/cliente/:IDCliente',(req,res)=>{
	const IDCliente=req.params.IDCliente;
	mysqlConexion.query('SELECT * FROM cliente WHERE IDCliente = ?',[IDCliente],(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err);
		}
	})
});




//Alta de un cliente
rutas.post('/cliente',(req,res) => {
	var { Nombre, ApPat, ApMat, Nac, RFC, Tel} = req.body;
    if(validacion(Nombre, ApPat, ApMat, Nac))
    {
			const query1 = "SELECT MAX(IDCliente) AS mayor FROM cliente";
		 	 mysqlConexion.query(query1,(err,filas,campos)=>{
				if(!err){
						var IDCliente = filas[0].mayor + 1;
					//console.log("Agarró el id:"+filas[0].mayor + 1);
					//console.log(IDCliente,Nombre, ApPat, ApMat, Nac, RFC, Tel, Dir);
					    RFC = validarRFC(RFC);
					    Tel = validarTelefono(Tel);

              //Aquí va la validación de duplas

const query2 = "SELECT Nombre, ApPat,ApMat FROM cliente WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
		if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Cliente duplicado'}) 

		 	 	}else{
<<<<<<< HEAD

						const query = "INSERT INTO cliente(IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel) VALUES(?,?,?,?,?,?,?)";
=======
		 	 		
						const query = "INSERT INTO cliente(IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel) VALUES(?,?,?,?,?,?,?,?)";
>>>>>>> ea68c0b8fbfedbd4ae659b42ad96eff0f729a3a8
					mysqlConexion.query(query,[IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El cliente '+Nombre+' ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});

		 	 	}
		 	 })





				
					
				}else{
					console.log(err);
				}
			});
	}else{

		res.json({estatus:'Datos incompletos'})
	}
    		
});




//Modificar cliente
rutas.put('/cliente/:IDCliente',(req,res) =>{
    const IDCliente =req.params.IDCliente;
	const {Nombre, ApPat, ApMat} = req.body;
	const query= "UPDATE cliente SET Nombre = ?, ApPat = ?, ApMat = ? WHERE IDCliente = ?";
	mysqlConexion.query(query,[Nombre, ApPat, ApMat, IDCliente],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El cliente "+Nombre+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
});


//Eliminar cliente
rutas.delete('/cliente/:IDCliente'),(req,res) =>{
	const IDCliente= req.params.IDCliente;
	console.log(".."+IDCliente);
	const query ="DELETE FROM cliente WHERE IDCliente = ?";
	mysqlConexion.query(query,[IDCliente],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El cliente "+Nombre+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
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


const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')


//Consulta de clientes
rutas.get('/cliente',(req,res) =>{
	mysqlConexion.query('SELECT * FROM cliente',(err,filas,campos) =>{
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
	var { Nombre, ApPat, ApMat, Nac, RFC, Tel, Dir} = req.body;
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
		 	 		
						const query = "INSERT INTO cliente(IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel,Dir) VALUES(?,?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel,Dir],(err,filas,campos) => {
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
rutas.delete=(req,res) =>{
	const { id } = req.params;
	re.get
}

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

//function validarDuplas(Nombre,ApMat,ApPat){

//var respuesta='';
//		const query = "SELECT Nombre, ApPat,ApMat FROM cliente WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
//		 	 	mysqlConexion.query(query,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
//		if(filas.length()>0)
//		 	 	{
 //            res.json({'Cliente duplicado'}) ;
//		 	 	}
//		 	 })

			

//}
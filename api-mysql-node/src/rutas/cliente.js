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
	const { Nombre, ApPat, ApMat, Nac, RFC, Tel, Dir} = req.body;
    if(validacion(Nombre, ApPat, ApMat, Nac))
    {
    	if(validarTelefono(Tel))
    	{

    		if(validarRFC(RFC))
    		{
    			IDCliente= regresarID();
	const query = "INSERT INTO cliente(IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel,Dir) VALUES(?,?,?,?,?,?,?,?)";
	mysqlConexion.query(query,[IDCliente,Nombre,ApPat,ApMat,Nac,RFC,Tel,Dir],(err,filas,campos) => {
			if(!err){
				res.json({estatus: 'El cliente '+Nombre+' ha sido dado de alta exitosamente!'})
		
			}else{
			console.log("Hay un error"+err);	
			}
		})
			}else{
				console.log("RFC nulo")
			}
		}else{
			res.json({Tel:'Sin telefono'});
		}	
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



function regresarID()
{
	IDCliente=0;

	const query= "SELECT MAX(IDCliente) AS mayor FROM cliente";
	mysqlConexion.query(query,(err,filas,campos)=>{
		if(!err){
			IDCliente= filas['mayor']+1;
		}else{
			console.log("mm"+err);
		}
	})
	return IDCliente;
}
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
	var respuesta=true;

	if(Tel=="")
	{
		respuesta=false;
	}

	return respuesta;
}


function validarRFC(RFC){
	var respuesta=true;

	if(RFC == "")
	{
		respuesta=false;
	}

	return respuesta;
}
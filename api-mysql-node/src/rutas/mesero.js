const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')


//Consulta de meseros
rutas.get('/mesero',(req,res) =>{
	mysqlConexion.query('SELECT * FROM mesero',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//Buscar mesero por ID
rutas.get('/mesero/:IDmesero',(req,res)=>{
	const IDmesero=req.params.IDmesero;
	mysqlConexion.query('SELECT * FROM mesero WHERE IDmesero = ?',[IDmesero],(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err);
		}
	})
});


//Alta de un mesero
rutas.post('/mesero',(req,res) => {
	const { Nombre, ApPat, ApMat,Tel,Correo,Dir,Sueldo,Horario} = req.body;
    if(validacion(Nombre, ApPat, ApMat,Tel,Correo,Dir,Sueldo,Horario))
    {
    	if(validarTelefono(Tel))
    	{

    		if(validarRFC(Correo))
    		{
    			IDmesero= regresarID();
	const query = "INSERT INTO mesero(IDmesero,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario) VALUES(?,?,?,?,?,?,?,?)";
	mysqlConexion.query(query,[IDmesero,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario],(err,filas,campos) => {
			if(!err){
				res.json({estatus: 'El mesero '+Nombre+' ha sido dado de alta exitosamente!'})
		
			}else{
			console.log("Hay un error"+err);	
			}
		})
			}else{
				console.log("Correo nulo")
			}
		}else{
			res.json({Tel:'Sin telefono'});
		}	
	}else{
		res.json({estatus:'Datos incompletos'})
	}
});

//Modificar mesero
rutas.put('/mesero/:IDmesero',(req,res) =>{
	const {Nombre, ApPat, ApMat} = req.body;
	const query= "UPDATE mesero SET Nombre = ?, ApPat = ?, ApMat = ? WHERE IDmesero = ?";
	mysqlConexion.query(query,[Nombre, ApPat, ApMat, IDmesero],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El mesero "+Nombre+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
});


//Eliminar mesero
rutas.delete=(req,res) =>{
	const { id } = req.params;
	re.get
}

module.exports =rutas;



function regresarID()
{
	IDmesero=0;

	const query= "SELECT MAX(IDmesero) AS mayor FROM mesero";
	mysqlConexion.query(query,(err,filas,campos)=>{
		if(!err){
			IDmesero= filas['mayor']+1;
		}else{
			console.log("mm"+err);
		}
	})
	return IDmesero;
}
function validacion( Nombre, ApPat, ApMat){
	
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
	var respuesta=true;

	if(Tel=="")
	{
		respuesta=false;
	}

	return respuesta;
}


function validarRFC(Correo){
	var respuesta=true;

	if(Correo == "")
	{
		respuesta=false;
	}

	return respuesta;
}
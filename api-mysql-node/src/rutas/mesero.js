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
rutas.get('/mesero/:IDEmp',(req,res)=>{
	const IDEmp=req.params.IDEmp;
	mysqlConexion.query('SELECT * FROM mesero WHERE IDEmp = ?',[IDEmp],(err,filas,campos) =>{
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
    			IDEmp= regresarID();
	const query = "INSERT INTO mesero(IDEmp,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario) VALUES(?,?,?,?,?,?,?,?,?)";
	mysqlConexion.query(query,[IDEmp,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario],(err,filas,campos) => {
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
rutas.put('/mesero/:IDEmp',(req,res) =>{
	const IDEmp = req.params.IDEmp;
	const {Nombre, ApPat, ApMat} = req.body;
	const query= "UPDATE mesero SET Nombre = ?, ApPat = ?, ApMat = ? WHERE IDEmp = ?";
	mysqlConexion.query(query,[Nombre, ApPat, ApMat, IDEmp],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El mesero "+Nombre+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
});


//Eliminar mesero
rutas.delete('/mesero/:IDEmp'),(req,res) =>{
	const IDEmp= req.params.IDEmp;
	const query ="DELETE FROM mesero WHERE IDEmp = ?";
	mysqlConexion.query(query,[IDEmp],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El mesero"+Nombre+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
};
module.exports =rutas;

function regresarID()
{
	IDEmp=0;

	const query= "SELECT MAX(IDEmp) AS mayor FROM mesero";
	mysqlConexion.query(query,(err,filas,campos)=>{
		if(!err){
			IDEmp= filas['mayor']+1;
		}else{
			console.log("mm"+err);
		}
	})
	return IDEmp;
}
function validacion( Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario){
	
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
	if(Tel == ""){
		respuesta=false;
	}
	if(Correo == ""){
		respuesta=false;
	}
	if(Dir == ""){
		respuesta=false;
	}
	if(Sueldo == ""){
		respuesta=false;
	}
	if(Horario == ""){
		respuesta=false;
	}
	 return respuesta;
}

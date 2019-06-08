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



//Alta de mesero
rutas.post('/mesero',(req,res) => {
	var {Nombre, ApPat, ApMat,Tel,Correo,Dir,Sueldo,Horario} = req.body;
    if(validacion(Nombre, ApPat, ApMat,Tel,Correo,Dir,Sueldo,Horario))
    {     
    	if(validarTelefono(Tel))
    	{


      //Aquí regresamo el ID de la última inserción para agregarlo al nuevo empleado+1
			const query1 = "SELECT MAX(IDEmp) AS mayor FROM mesero";
		 	 mysqlConexion.query(query1,(err,filas,campos)=>{
				if(!err){
					if(filas[0].mayor<=0){
						IDCliente = 1;
						console.log("hola");
						 //Aquí va la validación de duplas
			const query2 = "SELECT Nombre, ApPat,ApMat FROM mesero WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Mesero'+Nombre+' duplicado'}) 

		 	 	}else{
					const query = "INSERT INTO mesero(IDEmp,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario) VALUES(?,?,?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDEmp,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El empleado '+Nombre+' ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});

		 	 	}
		 	 })
					}else
					{
						var IDEmp = filas[0].mayor + 1;
					    
              //Aquí va la validación de duplas
			const query2 = "SELECT Nombre, ApPat,ApMat FROM mesero WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Mesero '+Nombre+' duplicado'}) 

		 	 	}else{
					const query = "INSERT INTO mesero(IDEmp,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario) VALUES(?,?,?,?,?,?,?,?,?)";
					mysqlConexion.query(query,[IDEmp,Nombre,ApPat,ApMat,Tel,Correo,Dir,Sueldo,Horario],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El empleado '+Nombre+' ha sido dado de alta exitosamente!'})
					
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
			}else
			{
				res.json({estatus:'Teléfono debe ser numérico.'})
			}
	}else{

		res.json({estatus:'Datos incompletos'})
	}
    		
});

//Modificar mesero
rutas.put('/mesero/:IDEmp',(req,res) =>{
	const IDEmp = req.params.IDEmp;
	const {Nombre, ApPat, ApMat, Sueldo} = req.body;
	if(validarModificar(Nombre, ApPat,ApMat,Sueldo))
	{
	if(buscarId(IDEmp))
	{
	
		const query2 = "SELECT Nombre, ApPat,ApMat FROM mesero WHERE Nombre= ? AND ApPat=? AND ApMat = ?";
		 	 	mysqlConexion.query(query2,[Nombre, ApPat, ApMat],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'mesero '+Nombre+' duplicado'}) 

		 	 	}else{
	const query= "UPDATE mesero SET Nombre = ?, ApPat = ?, ApMat = ?, sueldo = ? WHERE IDEmp = ?";
	mysqlConexion.query(query,[Nombre, ApPat, ApMat, Sueldo, IDEmp],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El empleado "+Nombre+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
}
})
}else{
	res.json({estatus:'Empleado no encontrado'})

}
}else
{
	res.json({estatus:'Datos incompletos'})
}
});



//Eliminar mesero
rutas.delete('/mesero/:IDEmp'),(req,res) =>{
	const IDEmp= req.params.IDEmp;
	if(buscarId(IDEmp))
	{


	const query ="DELETE FROM mesero WHERE IDEmp = ?";
	mysqlConexion.query(query,[IDEmp],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El mesero"+Nombre+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
}else
{
		res.json({estatus:'Empleado no existente'})
}
};
module.exports =rutas;


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


function validarModificar(Nombre, ApPat, ApMat, Sueldo){
	
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
	if(Sueldo== "")
	{
		respuesta=false;
	}
	
	 return respuesta;
}



function buscarId(IDEmp)
{
var respuesta=true;
const query ="SELECT * FROM mesero WHERE IDEmp=?";
mysqlConexion.query(query,[IDEmp],(err,filas,campos)=>{ 
   if(!err){
			respuesta= false;
			return respuesta;
		}else{
			console.log(err);
		}
	})
}


function validarTelefono(Tel)
{
	var respuesta=true;
	if(isNaN(Tel) ){
		respuesta=false;
	}
	return respuesta;
}
const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')

//consultar menú
rutas.get('/menu',(req,res) =>{
	mysqlConexion.query('SELECT * FROM menu ORDER BY Tipo',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//Buscar menu por ID
rutas.get('/menu/:IDPlatillo',(req,res)=>{
	const IDPlatillo=req.params.IDPlatillo;
	if(buscarId(IDPlatillo))
	{


	mysqlConexion.query('SELECT * FROM menu WHERE IDPlatillo = ?',[IDPlatillo],(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err);
		}
	})}
	else{
		res.json({estatus:'Platillo no existente'})
	}
});



//Alta de un platillo
rutas.post('/menu',(req,res) => {
	var { Nombre, Descr,Tipo,Precio} = req.body;
    if(validacion(Nombre, Descr,Tipo))
    {
    	
			const query1 = "SELECT MAX(IDPlatillo) AS mayor FROM menu";
		 	 mysqlConexion.query(query1,(err,filas,campos)=>{
				if(!err){
					if(filas[0].mayor<=0){
						IDPlatillo = 1;
						

              //Aquí va la validación de duplas
			const query2 = "SELECT Nombre,Descr, Tipo  FROM menu WHERE Nombre= ? AND Descr=? AND Tipo = ?";
		 	 	mysqlConexion.query(query2,[Nombre, Descr,Tipo],(err,filas,campos)=>{
		 	 		var tamaño = filas.length;
				if(tamaño >0)
		 	 	{
                     res.json({estatus:'Platillo '+Nombre+' duplicado'}) 

		 	 	}else{
					const query = "INSERT INTO menu(IDPlatillo,Nombre, Descr,Tipo,Precio) VALUES(?,?,?,?,?)";
					mysqlConexion.query(query,[IDPlatillo,Nombre,Descr,Tipo,Precio],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El platillo '+Nombre+' ha sido dado de alta exitosamente!'})
					
						}else{
						console.log("Hay un error "+err);	
						}
					});

		 	 	}
		 	 })
					}else
					{
						var IDPlatillo = filas[0].mayor + 1;
				

              //Aquí va la validación de duplas
			const query2 = "SELECT Nombre, Descr,Tipo FROM menu WHERE Nombre= ? AND Descr=? AND Tipo = ?";
		 	 	mysqlConexion.query(query2,[Nombre, Descr,Tipo],(err,filas,campos)=>{
		 	 		console.log("----------"+filas.length)
		 	 		var tamaño1 = filas.length;
				if(tamaño1 >0)
		 	 	{
                     res.json({estatus:'Platillo '+Nombre+' duplicado'}) 

		 	 	}else{
					const query = "INSERT INTO menu(IDPlatillo,Nombre,Descr,Tipo,Precio) VALUES(?,?,?,?,?)";
					mysqlConexion.query(query,[IDPlatillo,Nombre,Descr,Tipo,Precio],(err,filas,campos) => {
						if(!err){
							res.json({estatus: 'El platillo '+Nombre+' ha sido dado de alta exitosamente!'})
					
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

		res.json({estatus:'Datos incompletos'})
	}
    		
});









//Modificar menu
rutas.put('/menu/:IDPlatillo',(req,res) =>{
	const IDPlatillo = req.params.IDPlatillo;
	const {Nombre, Tipo,Precio} = req.body;
	if(buscarId(IDPlatillo))
	{


	if(validarModificar(Nombre, Tipo,Precio))
	{
	       

		const query2 = "SELECT Nombre,Tipo,Precio FROM menu WHERE Nombre= ? AND Tipo=? AND Precio = ?";
		 	 	mysqlConexion.query(query2,[Nombre, Tipo,Precio],(err,filas,campos)=>{
				if(filas.length > 0)
		 	 	{
                     res.json({estatus:'Platillo '+Nombre+' duplicado'}) 

		 	 	}else{
	const query= "UPDATE menu SET Nombre = ?, Tipo = ?, Precio = ? WHERE IDPlatillo = ?";
	mysqlConexion.query(query,[Nombre, Tipo,Precio,IDPlatillo],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El platillo "+Nombre+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
}
})
}else{
	res.json({estatus:'Datos incompletos'})
}}
else{
	res.json({estatus:'Platillo no existente'})
}
});


//Eliminar platillo
rutas.delete('/menu/:IDPlatillo'),(req,res) =>{
	const IDPlatillo= req.params.IDPlatillo;
	if(buscarId(IDPlatillo))
	{


	const query ="DELETE FROM menu WHERE IDPlatillo = ?";
	mysqlConexion.query(query,[IDPlatillo],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El platillo "+Nombre+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
}else{
	res.json({estatus:'Platillo no existente'})
}
};




module.exports =rutas;




function buscarId(IDPlatillo)
{
var respuesta=true;
const query ="SELECT * FROM menu WHERE IDPlatillo=?";
mysqlConexion.query(query,[IDPlatillo],(err,filas,campos)=>{ 
   if(!err){
			respuesta= false;
			return respuesta;
		}else{
			console.log(err);
		}
	})
}



function validacion( Nombre, Descr, Tipo){
	
    var respuesta=true;



	if(Nombre == ""){
		respuesta=false;
	}
	if(Descr == ""){
		respuesta=false;
	}
	if(Tipo == ""){
		respuesta=false;
	}
	
	 return respuesta;
}




function validarModificar(Nombre, Tipo,Precio){
	
    var respuesta=true;

	if(Nombre == ""){
		respuesta=false;
	}
	if(Tipo == ""){
		respuesta=false;
	}
	if(Precio == ""){
		respuesta=false;
	}
	
	 return respuesta;
}
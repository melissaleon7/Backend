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


//Dar de alta un platillo
rutas.post('/menu',(req,res) =>{
	const { IDEmp, Nombre, Desc, Tipo, Precio} = req.body;
	const query = "INSERT INTO menu(IDEmp, Nombre, Desc, Tipo, Precio) VALUES(?,?,?,?,?)";
	mysqlConexion.query(query,[IDEmp,Nombre,Desc,Tipo,Precio],(err,filas,campos)=>{
		if(!err){
			res.json({estatus:"¡Agregado correctamente."});
		}else{
			console.log(err);
		}
	})
}
	
);

//Modificar platillo
rutas.put('/menu/:IDEmp',(req,res) =>{
	const IDEmp = req.params.IDEmp;
	const {Nombre,Tipo,Precio} = req.body;
	const query= "UPDATE menu SET  Nombre = ?, Tipo=?,Precio = ? WHERE IDEmp = ?";
	mysqlConexion.query(query,[Nombre, Tipo, Precio, IDEmp],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "Modificado correctamente."});
		}else{
			console.log(err);
		}
	})
});

//Eliminar cliente
rutas.delete('/menu/:IDEmp'),(req,res) =>{
	const IDEmp= req.params.IDEmp;
	const query ="DELETE FROM menu WHERE IDEmp = ?";
	mysqlConexion.query(query,[IDEmp],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "El menu "+Nombre+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
};

module.exports =rutas;


function regresarID()
{
	IDEmp=0;

	const query= "SELECT MAX(IDEmp) AS mayor FROM menu";
	mysqlConexion.query(query,(err,filas,campos)=>{
		if(!err){
			IDEmp= filas['mayor']+1;
		}else{
			console.log("mm"+err);
		}
	})
	return IDEmp;
}









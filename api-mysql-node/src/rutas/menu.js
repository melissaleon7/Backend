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
	const { IDPlatillo, Nombre, Desc, Tipo, Precio} = req.body;
	const query = "INSERT INTO menu(IDPlatillo, Nombre, Desc, Tipo, Precio) VALUES(?,?,?,?,?)";
	mysqlConexion.query(query,[IDPlatillo,Nombre,Desc,Tipo,Precio],(err,filas,campos)=>{
		if(!err){
			res.json({estatus:"¡Agregado correctamente."});
		}else{
			console.log(err);
		}
	})
}
	
);

//Modificar platillo
rutas.put('/menu/:IDPlatillo',(req,res) =>{
	const {Nombre, Tipo, Precio} = req.body;
	const query= "UPDATE menu SET Nombre = ?, Tipo = ?, Precio = ? WHERE IDPlatillo = ?";
	mysqlConexion.query(query,[Nombre, Tipo, Precio, IDPlatillo],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "Modificado correctamente."});
		}else{
			console.log(err);
		}
	})
});
module.exports =rutas;
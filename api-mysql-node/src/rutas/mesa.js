const express =require('express');
const rutas = express.Router();

const mysqlConexion = require('../basededatos.js')


//Consulta de mesas libres
rutas.get('/mesa',(req,res) =>{
	mysqlConexion.query('SELECT * FROM mesa',(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err)
		}
	})
});

//Buscar mesa por ID
rutas.get('/mesa/:IDmesa',(req,res)=>{
	const IDmesa=req.params.IDmesa;
	mysqlConexion.query('SELECT * FROM mesa WHERE IDmesa = ?',[IDmesa],(err,filas,campos) =>{
		if(!err){
			res.json(filas);
		}else{
			console.log(err);
		}
	})
});




//Dar de alta mesas
rutas.post('/mesa',(req,res) =>{
	const { IDMesa, Cantidad} = req.body;
	const query = "INSERT INTO mesa(IDMesa,Cantidad) VALUES(?,?)";
	mysqlConexion.query(query,[IDMesa,Cantidad],(err,filas,campos)=>{
		if(!err){
			res.json({estatus:"¡Mesa agregada con"+Cantidad+" de capacidad"});
		}else{
			console.log(err);
		}
	})
	});



//Modificar mesa
rutas.put('/mesa/:IDmesa',(req,res) =>{
	const IDmesa = req.params.IDmesa;
	const {Cantidad} = req.body;
	const query= "UPDATE mesa SET Cantidad=? WHERE IDmesa = ?";
	mysqlConexion.query(query,[Cantidad,IDmesa],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "La mesa "+IDmesa+" ha sido modificado correctamente"});
		}else{
			console.log(err);
		}
	})
});


//Eliminar mesa
rutas.delete('/mesa/:IDmesa'),(req,res) =>{
	const IDmesa= req.params.IDmesa;
	const query ="DELETE FROM mesa WHERE IDmesa = ?";
	mysqlConexion.query(query,[IDmesa],(err,filas,campos)=>{
		if(!err){
			res.json({estatus: "la mesa"+IDmesa+" ha sido eliminado correctamente"});
		}else{
			console.log(err);
		}
	})
};


module.exports =rutas;

function regresarID()
{
	IDmesa=0;

	const query= "SELECT MAX(IDmesa) AS mayor FROM mesa";
	mysqlConexion.query(query,(err,filas,campos)=>{
		if(!err){
			IDmesa= filas['mayor']+1;
		}else{
			console.log("mm"+err);
		}
	})
	return IDmesa;
}

function validacion( Cantidad ){
	
    var respuesta=true;



	if(Cantidad == ""){
		respuesta=false;
	}
	 return respuesta;
}





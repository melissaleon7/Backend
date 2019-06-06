const express = require('express');
const app= express();
const mysql= require('mysql');
 

app.set('port',process.env.PORT || 3000);


app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Usamos las rutas
app.use(require('./rutas/cliente.js'));
app.use(require('./rutas/clientemesa.js'));
app.use(require('./rutas/consumo.js'));
app.use(require('./rutas/menu.js'));
app.use(require('./rutas/mesa.js'));
app.use(require('./rutas/mesero.js'));
app.use(require('./rutas/meseromesa.js'));
app.use(require('./rutas/venta.js'));



app.listen(app.get('port'),() =>{
		console.log('Servidor en puerto ',app.get('port'));
})
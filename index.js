const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require("mysql")

//Crear la conexion a la base de datos
const db = mysql.createPool({
    host: "db4free.net",
    user: "adminfrsftw",
    password: "test1234",
    database: "freesoftware",
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



app.post("/queja/insertar", (req, res)=>{

    //Armo la fecha de la queja
    const fechita = new Date();
    const anio = fechita.getFullYear();
    const mes = fechita.getMonth();
    const dia = fechita.getDay();

    //Parametros para insertar la queja
    const descripcionQueja = req.body.descripcionQueja;
    const fechaQueja = `${anio}-${mes}-${dia}`;
    const sucursal = 13;


    const insertar = "INSERT INTO Queja (quejaDescripcion, quejaFecha, idSucursal) VALUES (?, ?, ?);"
    db.query(insertar, [descripcionQueja, fechaQueja, sucursal],(err, resultado) => {
        console.log(err);
    })
})


app.listen(5000, () => {
    console.log("Aplicativo corriendo en el puerto 5000");
})
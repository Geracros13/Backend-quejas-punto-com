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

//Puerto
app.set('port', process.env.PORT || 5000);



app.post("/queja/insertar", (req, res)=>{

    //Parametros para insertar la queja
    const descripcionQueja = req.body.descripcionQueja;
    const sucursal = req.body.idSucursal;

    const insertar = "INSERT INTO Queja (quejaDescripcion, idSucursal) VALUES (?, ?);"
    db.query(insertar, [descripcionQueja, sucursal],(err, resultado) => {
        console.log(err);
    })

    res.send({
        msg: "Queja insertada",

    }).status(200);
})


// app.listen(5000, () => {
//     console.log("Aplicativo corriendo en el puerto 5000");
// })

app.listen(app.get('port'), ()=>{
    console.log(`Aplicativo corriendo en el puerto siguiente ---> ${app.get('port')}`);
})
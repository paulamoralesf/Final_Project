//Llamar modelos y alli toda la cadena de conexión, ES ADECUADO
const mongoose=require('mongoose')
const {Medicos}=require('./Medicos')
const {Pacientes}=require('./Pacientes')
const {Farmacos}=require('./Farmacos')


const URL_MONGO='mongodb+srv://Paula:1234@cluster0-pikdd.mongodb.net/IPS?retryWrites=true'

//Configuración cadena de conexión
mongoose.connect(URL_MONGO,{useNewUrlParser:true},(err)=>{
    !err 
        ? console.log('Conexion exitosa')
        : console.log('Error en conexion')
})
module.exports={
    Medicos,
    Pacientes,
    Farmacos
}
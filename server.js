
const express=require('express')
const bodyParser=require('body-parser')
const {Medicos}=require('./models//index')
const {Pacientes}=require('./models//index')
const {Farmacos}=require('./models//index')
const PORT=process.env.PORT || 3000 
const app=express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send({message:'System on'})
})
app.post('/api/v1/create/patient',(req,res)=>{
    console.log(req.body)
    const {nombre,CC,EPS,edad}=req.body
    const newPatient= Pacientes({
        nombre,
        CC,
        EPS,
        edad
    })
    newPatient.save((err,user)=>{
        if(err){
            console.log(err)
            res.status(400).send('No se pudo crear el paciente')
        }else{
            res.status(201).send(user)
        }
    })
})
app.post('/api/v1/create/doctor',(req,res)=>{
    console.log(req.body)
    const {nombre,TP,especialidad}=req.body
    const newDoctor= Medicos({
        nombre,
        TP,
        especialidad
    })
    newDoctor.save((err,user)=>{
        if(err){
            console.log(err)
            res.status(400).send('No se pudo crear el médico')
        }else{
            res.status(201).send(user)
        }
    })
})
app.post('/api/v1/create/medicine',(req,res)=>{
    console.log(req.body)
    const {nombre,posologia}=req.body
    const newMedicine= Farmacos({
        nombre,
        posologia
    })
    newMedicine.save((err,user)=>{
        if(err){
            console.log(err)
            res.status(400).send('No se pudo crear el medicamento')
        }else{
            res.status(201).send(user)
        }
    })
})
app.get(`/api/v1/patients`,(req,res)=>{
    Pacientes.find().
        populate('prescripciones.farmacos','prescripciones.posologia.medico').
        exec()    
        .then((users)=>{
            res.send(users)
        }).catch((err)=>{
            res.status(409).send(err)
        })

})
app.get(`/api/v1/doctors`,(req,res)=>{
    Medicos.find().exec()
        .then((users)=>{
            res.send(users)
        }).catch((err)=>{
            res.status(409).send(err)
        })

})
app.get(`/api/v1/medicines`,(req,res)=>{
    Farmacos.find().exec()
        .then((users)=>{
            res.send(users)
        }).catch((err)=>{
            res.status(409).send(err)
        })

})
app.post('/api/v1/patients/:idPatient/medicine/:idMedicine',(req,res)=>{
    const {idPatient}=req.params
    const {idMedicine}=req.params
    console.log([req.body])
    Pacientes.findByIdAndUpdate({"_id":idPatient},
        {$push:{
            prescripciones:{
                farmacos:idMedicine,
                posologia:req.body

            }
        }},
        {new:true}).exec()
        .then((result)=>{
            res.send(result)
        }).catch((err)=>{
            res.status(409).send(err)
        })
})
app.listen(PORT,()=>{
    console.log(`Server on port ${PORT}`)
})
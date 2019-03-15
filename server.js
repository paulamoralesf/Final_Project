
const express=require('express')
const bodyParser=require('body-parser')
const {Medicos}=require('./models//index')
const {Pacientes}=require('./models//index')
const {Farmacos}=require('./models//index')
const PORT=process.env.PORT || 3000 
const app=express();
const cors=require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send({message:'System on'})
})
app.post('/api/v1/create/patient',(req,res)=>{
    console.log(req.body)
    const {foto,nombre,CC,EPS,edad}=req.body
    const newPatient= Pacientes({
        foto,
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
    const {foto,nombre,TP,especialidad}=req.body
    const newDoctor= Medicos({
        foto,
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
    const {imagen,nombre,posologia}=req.body
    const newMedicine= Farmacos({
        imagen,
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
        populate('prescripciones.farmacos').populate('prescripciones.posologia.medico').
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
app.get('/api/v1/patient/:uid',(req,res)=>{
    Pacientes.findById(req.params.uid).exec()
        .then((user)=>{
            res.send(user)
        }).catch((err) => {
            res.status(409).send(err)
        })
})
app.get('/api/v1/doctor/:uid',(req,res)=>{
    Medicos.findById(req.params.uid).exec()
        .then((user)=>{
            res.send(user)
        }).catch((err) => {
            res.status(409).send(err)
        })
})
app.get('/api/v1/medicines/:uid',(req,res)=>{
    Farmacos.findById(req.params.uid).exec()
        .then((user)=>{
            res.send(user)
        }).catch((err) => {
            res.status(409).send(err)
        })
})
app.put('/api/v1/patient/:uid',(req,res)=>{
    const {uid}=req.params
    Pacientes.findByIdAndUpdate(uid,{$set:req.body},{new:true}).exec()
        .then((newUser)=>{
            res.send(newUser)
        }).catch((err) =>{
            res.status(409).send(err)
        })
})
app.delete('/api/v1/patient/:uid',(req,res)=>{
    const {uid}=req.params
    Pacientes.findByIdAndDelete(req.params.uid).exec()
        .then((user)=>{
            res.sendStatus(204)//No content
        }).catch((err) => {
            res.status(409).send(err)
        })
})
app.delete('/api/v1/medicine/:uid',(req,res)=>{
    const {uid}=req.params
    Farmacos.findByIdAndDelete(req.params.uid).exec()
        .then((user)=>{
            res.sendStatus(204)//No content
        }).catch((err) => {
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
const express =  require('express');
const mongodb = require('mongodb')
const logger =  require('morgan');
const bodyParser =  require('body-parser');
const errorhandler =  require('errorhandler');


//const url = 'mongodb://localhost:27017/';
const url = 'mongodb+srv://ruben:rabano@devruben.yrp4rpk.mongodb.net/?retryWrites=true&w=majority';
let app  =  express();
app.use(bodyParser.json());
app.use(logger('dev'));


mongodb.MongoClient.connect(url, (error, database) => {
    //console.log(url);
    if(error) return process.exit(1);
    const db = database.db('701nosql');
    console.log("Connection is OK");

    app.get('/estudiantes',(req,res)=>{
        db.collection('estudiantes').find().toArray((error,results)=>{
            if(error) return next(error);
            console.log(results);
            res.send(results);
        });
    });

    app.post('/estudiantes',(req, res)=>{
        let newAccount =  req.body;
        db.collection('estudiantes').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

    app.put('/estudiantes/:id',(req,res)=>{
        db.collection('estudiantes').update(
            {_id: mongodb.ObjectID(req.params.id)},
            {$set:req.body},
            (error,resutls)=>{
                if(error) console.log(error);
                res.send(resutls);
            });
    });

    app.delete('/estudiantes/:id',(req,res)=>{
        db.collection('estudiantes').remove({_id: mongodb.ObjectID(req.params.id)},(error,results)=>{
            if(error) console.log(error);
            res.send(results);
        });
    });

    /* API Maestros */

    app.get('/maestros',(req,res)=>{
        db.collection('maestros').find().toArray((error,results)=>{
            if(error) return next(error);
            console.log(results);
            res.send(results);
        });
    });

    app.post('/maestros',(req, res)=>{
        let newAccount =  req.body;
        db.collection('maestros').insert(newAccount,(error,results)=>{
            if(error)  return next(error);
            res.send(results);
        });
    });

 


     app.listen(3000, ()=>{
        console.log('Express server corriendo en el puesto 3000: \x1b[32m','online');
    })
});
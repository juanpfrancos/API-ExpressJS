const axios = require('axios');
const express = require('express');
const app = express();

axios.get('https://www.datos.gov.co/resource/gt2j-8ykr.json').then(resp => {

        const data = resp.data
// ---------- Get genre
        const genero = data.map(function(j){
          return j.sexo
        })
        //console.log(genero)
        const totalPorGenero = genero.reduce((contadorGenero,genero)=>{
          contadorGenero[genero] = (contadorGenero[genero] || 0)+1
          return contadorGenero
        },{})
        //console.log(totalPorGenero)


// ---------- Get ages
        const ages = data.map((i)=> parseInt(i.edad))
        //console.log(ages)
        const age = ages.reduce((countAges, age)=>{
          countAges[age] = (countAges[age] || 0)+1
          return countAges
        },{})
        //console.log(age)

// ---------- Classifying ages
        const agesOrdered= []
        const teen = []
        const youngAdult = []
        const adult = []

        for (var a in age) {
          agesOrdered.push({age:a, total:age[a]});
          if ( a < 20){
            teen.push({age:a, total:age[a]});
          }
          if (a >= 20 && a < 40){
            youngAdult.push({age:a, total:age[a]});
          }
          if(a >= 40){
            adult.push({age:a, total:age[a]});
          }
        }

// ---------- Setting up endpoints

        app.get('/genre', function(req, res){
            return res.send({totalPorGenero});
        });
        app.get('/age', function(req, res){
            return res.send({ age });
        });
        app.get('/age/teen/', function(req, res){
            return res.send({teen});
        });
        app.get('/age/youngadult', function(req, res){
            return res.send({youngAdult});
        });
        app.get('/age/adult', function(req, res){
            return res.send({adult});
        });
})



// create a server
  var server = app.listen(3001, () => {
  var host = server.address().address
  var port = server.address().port

  console.log("Server is running http://localhost", host, port);
})
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const request= require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

 const path_to_public = path.join(__dirname,'../public')
 const viewsPath = path.join(__dirname,'../templates/views')
const path_to_partials = path.join(__dirname,'../templates/partials')
 app.set('view engine','hbs')
 app.set('views',viewsPath)
hbs.registerPartials(path_to_partials)


 app.use(express.static(path_to_public))
 

 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather app',
         name:'Lech Sopur'
     })
 })
 app.get('/about',(req,res)=>{
     res.render('about',{
         title:'Pozycje Jobavy - rendered by hbs',
         name:'Plany for white'
     })
 })

 app.get('/help',(req,res)=>{
     res.render('help',{
         message:'Tutaj uzyskasz Help from HTML',
         title:'Help',
         name:'Lech'
     })
 })
  app.get('/weather',(req,res)=>{
      if(!req.query.adress){
          return res.send({
              error:'Musisz podać adress!'})
      }
      geocode(req.query.adress,(error,data) => {
        if(error){
           return console.log(error)
        }
           forecast(data.latitude,data.longtitude,(error,forecastData) => {
               if(error){
                   return console.log(error)
               }
               res.send({
                forecast:forecastData,
               adress:req.query.adress
           })
                
               console.log(forecastData)
               console.log(data.place)
           })
        })
 })

 app.get('/help/*',(req,res)=>{
    res.render('error_404',{
        title:'404',
        name:'Lech Sopur',
        error_message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error_404',{
        title:'404',
        name:'Lech Sopur',
        error_message:'Page not found'
    })
})

app.listen(3000,()=>{
     console.log('Server is up on port 3000')
 })
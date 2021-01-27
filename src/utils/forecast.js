const request = require('postman-request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=04ad6403d78d686a91f4a98f22d80e73&query='+lat+','+long+'&units=m'
    request({ url: url , json:true },(error,response) => {
        if(error){
            callback('Brak polaczenie z netem',undefined)
             
        }else if(response.body.error){
             
            callback("Błędne dane",undefined)
            
        } else { 
            console.log(url)
            callback(undefined," Mamy teraz temperature: "+response.body.current.temperature+' stopni\nKierunek wiatru to:'   
            +response.body.current.wind_dir+' Miejscowość: '+response.body.location.name +' '+response.body.location.country)
             
    }
         
        
     })
}

module.exports = forecast
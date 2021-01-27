const request = require('postman-request')

const geocode = (adress,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoibW9ydXMyMiIsImEiOiJja2s4NWUxMzMwNHB3MnVxOHh3Zm01ZHNvIn0.m-RvnteXipG5Gsqy6-6hlg&limit=1'
    console.log(url)
    request({url:url,json:true},(error,response) => {
        if(error){
            callback('Brak polaczenia z internetem',undefined)
        }else if(response.body.features.length===0) {
          callback("Nie udalo sie zlokalizowac",undefined)
        }else {
            callback(undefined,{
               longtitude: response.body.features[0].center[0],
               latitude: response.body.features[0].center[1],
               place :   response.body.features[0].place_name
           })
        }
    })      

   }

   module.exports = geocode
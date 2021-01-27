console.log('Podłączona Java Script')



const paragraf_1 = document.querySelector('.forecast')
const paragraf_2 = document.querySelector('.adress')
const weather_form = document.querySelector('form')
const search = document.querySelector('input')

weather_form.addEventListener('submit',(e)=>{
    e.preventDefault()
    paragraf_1.textContent='LOADING...'
    const url =  'http://localhost:3000/weather?adress='+search.value 
 fetch(url).then((response) => {
    response.json().then((data)=>{
        if (data.error){
            console.log('BLad '+data.error)
        }else {
            paragraf_1.innerHTML=data.forecast
            paragraf_2.innerHTML=data.adress
        }
    })
   
} )
     
    console.log('wcisnieto przycisk')
})
 


/* Global Variables */
let d = new Date();
let newDate =  d.getDate()+'.'+d.getMonth()+'.'+ d.getFullYear();
const apiKey = "c1eb465b61d82b9665192beb85f33dbd";
const generateBtn = document.querySelector('#generate');
let zipCode = document.querySelector('#zip');
let feeling = document.querySelector("#feelings");
let dateSet = document.querySelector("#date");
let content =  document.querySelector("#content");
let tempDeg = document.querySelector("#temp");


// Create a new date instance dynamically with JS
const getWeather = async function(){
    // data variable for holding date, temp, feeling
    let data = {};
    // try to get temp from open wether map api 
    try {
       const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`;
       const respon = await (await fetch(url)).json();
       if(respon.cod != 200){
           alert(respon.message);
           return;
       }
       
        data = {
           temp: respon.main.temp,
           date: newDate,
           content: feeling.value
       }
       return data;
    } catch (error) {
       alert(error);
    }
    // post request with fetch
    await fetch("/postWeather", {
        method: "POST",
        credentials: "same-origin",
        body: JSON.stringify(data),
    });
    // get request
    console.log("then");
    let response = await (await fetch("/all")).json();
    return response;
}

generateBtn.addEventListener('click', ()=>{
    
    getWeather()
    .then((res)=>{
        dateSet.innerHTML = res.date;
        content.innerHTML = res.content;
        tempDeg.innerHTML = res.temp; 
    })
    .catch((err)=>{console.log(err)});
});





    


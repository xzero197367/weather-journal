// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

/*
 
*/
// get weather data all 
app.get("/all", (request, response)=>{
    response.send(projectData).status(200).end();
});

// post weather data
app.post("/postWeather", (request, response)=>{
    projectData = {
        temp: request.body.temp,
        date: request.body.date,
        content: request.body.content
    }
    response.send().status(200).end();
});

// Setup Server
const port = 5000;

const server = app.listen(port, listening());
function listening(){
    console.log("listening on port: "+port);
}


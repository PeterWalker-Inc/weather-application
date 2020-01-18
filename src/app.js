const path = require('path');
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for the Express config
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup the handlebars and views locations
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) =>{
    res.render('index', {
        'title' : "Weather",
        'name' : 'Peter Walker'
    })
});

app.get('/about', (req, res) =>{
    res.render('about',{
        'title' : 'About',
        'name' : 'Peter Walker'
    })
});

app.get('/help', (req, res)=>{
    res.render('help', {
        'helpText' : 'This is help text',
        'title' : 'Help',
        'name' : 'Peter Walker'
    })
});

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "Please provide the address"
        })
    }

    //empty object as default params
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error: error});
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error: error}); 
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        });
    });
})

app.get('/product', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error : "Please enter the search terms"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'Peter Walker',
        errorMessage: 'help page not found'
    })
});

app.get('*', (req, res) =>{
    res.render('404', {
        title : '404 Page',
        name: 'Peter Walker',
        errorMessage: 'Page not found'
    })
});

app.listen('3000', ()=>{
        console.log("Welcome to web server");    
});
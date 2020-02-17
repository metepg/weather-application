const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')


const app = express();

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mete Guneysel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mete Guneysel'
    })
})

app.get("/help", (req, res) => {
    res.render('help',{
      title: 'Help',
      message: 'You need help?',
      name: 'Mete Guneysel'
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
           return res.send({ error })
        } 
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
          })
    })
});

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search word'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mete Guneysel',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mete Guneysel',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

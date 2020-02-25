const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')


const app = express();

// Ports for production(heroku) and development (3000)
const port = process.env.PORT || 3000;

// Defining paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory path to server (node)
app.use(express.static(publicDirectoryPath))


// 'Front' page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mete Guneysel'
    })
})

// 'About' page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mete Guneysel'
    })
})

// 'Help' page
app.get("/help", (req, res) => {
    res.render('help',{
      title: 'Help',
      message: 'Dont panic, everything is fine',
      name: 'Mete Guneysel'
    });
});

// 'Weather form' routeWhat happens when you 
app.get("/weather", (req, res) => {

    // If theres no address send Object including error message 
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }
    
    // Calls the geocode function from (/utils/geocode)
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
           return res.send({ error })
        } 
    
        // Calls the forecast function from (/utils/forecast)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            // If everything went well send Object including the data as separate values
            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
          })
    })
});

// Error handling
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mete Guneysel',
        errorMessage: 'Help Article not found'
    })
})

// Error handling
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mete Guneysel',
        errorMessage: 'Page not found'
    })
})

// Open up the server
app.listen(port, () => {
  console.log('Listening on port ' + port );
});

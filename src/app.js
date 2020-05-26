const path = require('path');
const express = require('express');
const hbs = require('hbs');
/* Weather App */
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//
const app = express();
/*  Value for port */
const port = process.env.PORT || 3000 // For heroku || locally

//Define paths for Express config
const publiDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publiDirectoryPath));


app.get('',(req,res)=>{
  res.render('index', {
    title: 'Weather',
    name: 'Lenin Santiago'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About',
    name: 'Lenin Montalvo'
  });
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help',
    message: 'This is the help page',
    name: 'Lenin Montalvo'
  });
})


/* ***********QUERY STRING*************** */
app.get('/weather', (req,res) => {

  if(!req.query.address){
    return res.send({
      error: 'Need the address'
    })
  }
  geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
    if(error){
      return res.send({
        error: error
      })
    }
    forecast(latitude,longitude,(error,forecast)=>{
      if (error){
        return res.send({
          error: error
        })
      }
     return  res.send({
      forecast,
      location,
      address:req.query.address
      })
    })
  });
 
});

/* ***********QUERY STRING*************** */
app.get('/products', (req,res) => {
  if (!req.query.search) {
    return  res.send({
       error: 'You must orivide a search term'
    })
  }

  console.log(req.query.search);
  res.send({
    products: []
  })
})

/* ************Match specific pattern 404************** */
app.get('/help/*', (req,res)=>{
  res.render('articleNotFound',{
    title: 'Not Found',
    message:'Article help not found',
    name: 'Lenin Montalvo'
  });
})

/* *********404*********** */
app.get('*', (req, res) => {
  res.render('404',{
    title: 'Not Found',
    errorMessage:'Article help not found',
    name: 'Lenin Montalvo'
  });
})

app.listen(port, ()=>{
  console.log(`Server is up on port ${port} in http://localhost:${port}`);
})

// app.com
// app.com/help
// app.com/about
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios');
// require('dotenv').config()
const url = 'https://api.football-data.org/v4/matches';
const apiKey = 'c8215cd1965a49fa8bba96fca8e36a88';

// post data json 
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// public file 
app.use(express.static('public'))

app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
 



axios.get(`${url}`, {
  headers: {
    'X-Auth-Token': apiKey,
    'Content-Type': 'application/json',
  }
})
.then(response => {
    console.log(response.data)
    timestamp=response.data.matches[0].utcDate
    res.render('index',{
        countryname:response.data.matches[0].area.name,
        awaycrest:response.data.matches[0].awayTeam.crest,
        homecrest:response.data.matches[0].homeTeam.crest,
        utcdate:new Date(timestamp).toISOString().slice(8, 10) + '-' + new Date(timestamp).toLocaleString('en-us', { month: 'long' }).slice(0, 3) + ' ' + new Date(timestamp).toISOString().slice(11, 16),
        homeName:response.data.matches[0].homeTeam.name,
        awayName:response.data.matches[0].awayTeam.name
    })
})
.catch(error => {
    res.render('index')
});
})
app.get('/matches',(req,res)=>{
axios.get(`${url}`, {
  headers: {
    'X-Auth-Token': apiKey,
    'Content-Type': 'application/json',
  }
})
.then(response => {
    res.render('matches',{
       data:response.data
    })
})
.catch(error => {
    res.render('matches')
    
})
});
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.listen(PORT, "0.0.0.0",() => {
    console.log("Create Server " + PORT)
})
const express = require('express'),
	  session = require('express-session'),
	  massive = require('massive'),
	  bodyPar = require('body-parser'),
	  AuthCtrl = require('./Controllers/AuthCtrl');
	  require('dotenv').config()

const app = express()
const port = 3007;

massive(process.env.CONNECTION_STRING).then(db=>{
app.set('db', db)
console.log('db connect success!')
})

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyPar.json())

app.get('/auth/callback', AuthCtrl.auth)

app.get('/api/currentUser', (req, res)=>{
	console.log(req.session.user)
	res.send(req.session.user)

})

app.listen(port, ()=> {
	console.log('Narwal, Narwal, swimming in the Ocean', port)
})
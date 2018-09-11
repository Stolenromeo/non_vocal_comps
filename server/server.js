const express = require('express'),
	  session = require('express-session'),
	  massive = require('massive'),
	  bodyPar = require('body-parser'),
	  AuthCtrl = require('./Controllers/AuthCtrl');
	  require('dotenv').config()

const app = express()
const port = process.env.SERVER_PORT;

massive(process.env.CONNECTION_STRING).then(db=>{
app.set('db', db)
console.log('db connect success!')
})
/*---------Top Level MiddleWare--------*/
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

app.use(bodyPar.json())


/*-------------Request Level MiddleWare-------------*/
app.get('/auth/callback', AuthCtrl.auth)
app.get('/api', AuthCtrl.loginCheck)

app.listen(port, ()=> {
	console.log('Gotta be done', port)
})
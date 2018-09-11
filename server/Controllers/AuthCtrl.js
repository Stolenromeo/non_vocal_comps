const axios = require('axios')

module.exports = {
	auth: async (req, res)=>{
		try {

			let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
			let { code } = req.query
			let payload = {
				client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
				client_secret: process.env.AUTH0_CLIENT_SECRET,
				code,
				grant_type: 'authorization_code',
				redirect_uri: `http://${req.headers.host}/auth/callback`
			}
			
			let accessTokenResponse = await axios.post(`${auth0domain}/oauth/token`, payload)
			let accessToken= accessTokenResponse.data.access_token;
			
			let userInfoResponse = await axios.get(`${auth0domain}/userinfo?access_token=${accessToken}`)
			
			let userInfo = userInfoResponse.data;
			
			let db = req.app.get('db')
			
			let users = await db.findUserByAuthId(userInfo.sub)
			if (users.length){

				/*---------AUTH(SESSIONS)--------- */
				req.session.user = users[0]
				req.session.loggedIn='yessir';
				res.redirect('/')
			} else {
				let users = db.createUser(userInfo)
				/*---------AUTH(SESSIONS)--------- */
				req.session.user = users[0];
				req.session.loggedIn='yessir';
				res.redirect('/')
			}
			
		} catch (error) {
		console.log('We have a problem', error)
		res.redirect('/error')	
		}
	},
	loginCheck: (req, res)=>{

		if(req.query.user === req.session.loggedIn){
			console.log(req.query.loggedIn, req.session.loggedIn)
			res.send({resp:"Congratulations.  You are logged in.  Move on to next question.", value:true})
		} else {
			res.send({resp:'you are not logged in.  Unfortunately, you failed the test.', value:false})
		}
	}
}
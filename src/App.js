import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: false
    }
			{/* -------React - Class(.bind)-------- */}

    this.login = this.login.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
  }

  pushTomatch = ()=>{
    /*-------React - Routing(match object)--------*/
    if(this.props.match.path !== '/other'){
      this.props.history.push('/other')
    }
  }

  loggedIn(){
    /*---------Server-REST(queries)---------*/
    axios.get('/api/?user=yessir').then(resp => {
      console.log(resp.data.resp)
      if(resp.data.value){
         this.setState({ user:true})
      }
    })
  }

  login(){
    let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
    let clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    let scope = encodeURIComponent("openid profile email");
    let redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

    let location = `${auth0domain}/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code `

    window.location = location;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.state.user?
          <button onClick={this.pushTomatch}>go to next page</button>
        :
          <div>
            <button onClick={this.login}>You may login here.</button>
            <button onClick={this.loggedIn}>Click this button to see if you're here.</button>
          </div>
        }
      </div>
    );
  }
}

export default App;

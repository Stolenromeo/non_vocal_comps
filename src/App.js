import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(){
    super()

    this.state = {
      user: null
    }

    this.login = this.login.bind(this)
  }

  getUserInfo = () => {
    axios.get('/api/currentUser').then(resp => {
      console.log('2222222', resp.data)
      this.setState({
        user: resp.data
      })
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
        <button onClick={this.login}>Login</button>
        <button onClick={this.getUserInfo}>Get user info</button>
        {this.state.user && <div>{JSON.stringify(this.state.user)}</div>}
      </div>
    );
  }
}

export default App;

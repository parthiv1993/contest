import React, { Component } from 'react';
import { checkForJwt, saveJwt } from './util';
import Login from './Login';
import HomePage from './HomePage';
import axios from 'axios';
import constants from './Constants';

class App extends Component {

  login(nickName){
    axios.post(constants.BASE_URL+'/login',{nickName}).then((res)=>{
      saveJwt(res.data.token)
      this.forceUpdate();
    },(err)=>{
      console.log(err);
    })
  }

  render() {
    const isAuthorized = checkForJwt();
    return (
      <div>{isAuthorized?<HomePage/>:<Login onLogin={this.login.bind(this)}/>}</div>
    );
  }
}

export default App;

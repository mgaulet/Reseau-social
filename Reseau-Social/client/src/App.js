import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom' // browserHistory.replace('/user')

import './App.css';
import Signin from './signin/Signin';
import Register from './register/Register';
import User from './user/User'
import Home from './home/Home-insta'
import Personal from './pagePersonal/Personal'
import UserFriends from './pageFriend/Personal'
import EditImage from './editImage/EditImage'
let CircularJSON = require('circular-json')
import axios from 'axios'
import SocketStores from '../flux/stores/SocketStores.js'
import * as ListFriendActions from '../flux/actions/ListFriendActions.js'


const rediRoot = (rootV, rootF) => {
  let user = JSON.parse(localStorage.getItem('user'))
    
    if (user) {// secu
      return(rootV)
    }
    else {
      return(rootF)

    }
}

class App extends Component {

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user && user.id) {// secu
      axios.post('/getTodoFriends', {
        id: user.id,
      })
      .then((res) => {
        if (res.data.err) {}
        else {
          ListFriendActions.createTodo(res.data) /// send tab of friend
        }
      })
      .catch((res) => {
      })
    }

      if (user && user.id) {// secu

        axios.post('/recoSocket', {
          id: user.id,
        })
        .then((res) => {
          if (res.data.err) {}
          else {
            SocketStores.getSocketIo().emit('verifTocken', res.data.tocken, user.id)
          }
        })
        .catch((res) => {
        })

      }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
                <Switch>
                  <Route exact path={'/'} render={() => rediRoot(<Home/>, <Signin />)}/>
                  <Route exact path={'/register'} render={() => rediRoot(<Home/>, <Register/>)}/>
                  <Route exact path={'/home'} render={() => rediRoot(<Home/>, <Signin />)}/>
                  <Route exact path={'/user'} render={() => rediRoot(<Personal/>, <Signin />)}/>
                  <Route exact path={'/friend/:id'} render={() => {
                    return rediRoot(<UserFriends/>, <Signin />)
                    }}/>
                </Switch>
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

import React, {Component} from 'react';
import { Layout } from 'element-react';
import ActuInsta from './Actu-insta'
import TodoFriends from './TodoFriends'
import './Home-insta.css'
import NavBar from './Insta'
import Chat from '../chat/Chat'
import axios from 'axios'


import * as ListFriendActions from '../../flux/actions/ListFriendActions.js'
import * as NotifActions from '../../flux/actions/NotifActions.js'

import SocketStores from '../../flux/stores/SocketStores.js'


let socket = SocketStores.getSocketIo()


let eventFollowFronT = (idfollower, user, etat) => {
  if (etat === 2)
    ListFriendActions.pushFollowed(user)
  else
    ListFriendActions.pushFollower(user)
}

let eventNotif = (userNotif) => {
  NotifActions.pushNotif(userNotif)
}


socket.on('eventNotif', eventNotif)
socket.on('eventFollowFront', eventFollowFronT)

class HomeInsta extends Component {
    state = {
      floot: false,
      imageE: false,
      chaT: false,
      name: '',
      lastName: '',
      idFriendMsg: ''
    }
  
  flootHundle = (id) => {
    this.setState({
      floot: true,
      imageE: true,
      chaT: true,
      idFriendMsg: id

    })
  }
  escFlootHundle = () => {
    this.setState({
      floot: false,
      imageE: false,
      chaT: false,
      idFriendMsg: ''
    })
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
      let user = JSON.parse(localStorage.getItem('user'))
      if (user && user.id) {
        if (user)
          this.setState({
            name: user.name,
            lastName: user.lastName
          })
        else
          this.setState({
            name: 'intru',
            lastName: 'intru'
          })
      }
    }

    render() {

      let imageE = this.state.imageE ? (<div onClick={this.escFlootHundle}  className='imageFontShadow'></div>) : (<div></div>)
      let chaT = this.state.chaT ? (<Chat idMsgF={this.state.idFriendMsg}/>) : (<div></div>)

      return (
        <div >
            {chaT}
            {imageE}
          <div>
          <NavBar/>

            <Layout.Row justify="start" type="flex" className="row-bg">

              <Layout.Col span="15" className="col-leftss"> 
                <ActuInsta/>

              </Layout.Col>

              <Layout.Col span="5" className="col-lefts" style={{font: "400 15px/1.8 Lato, sans-serif"}}>
                <TodoFriends floot={this.flootHundle} user={{name: this.state.name, lastName: this.state.lastName}}/>
              </Layout.Col>

          </Layout.Row>
          </div>
        </div>
      )
    }
}

export default HomeInsta;

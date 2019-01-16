import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react'

import './Actu-insta.css'
import './TodoFriends.css'

import * as LikeActions from '../../flux/actions/LikeActions.js'

import * as ActusActions from '../../flux/actions/ActusActions.js'
import ActusStores from '../../flux/stores/ActusStores.js'

import axios from 'axios'

import SocketStores from '../../flux/stores/SocketStores.js'
let socket = SocketStores.getSocketIo()



let deleteActuImg = (idImg) => {

    ActusActions.deleteImg(idImg)
}

let liveActu = (imageFriend) => {
    LikeActions.firstInitLike(imageFriend._id, imageFriend.like)
    ActusActions.liveActuImg(imageFriend)
}

socket.on('eventdeleteActuImg', deleteActuImg)
socket.on('eventLiveActu', liveActu)

class ActuInsta extends Component {

  state = {
    ImagesFriends: [...ActusStores.getImagesFriends()],
    date: "",
    truite: null
  }


  hundlePushHoserImg = () => {
    ActusActions.firstpushImg(undefined)
  }

  getImagesFriends = (tab) => {
    
    
    this.setState({
      ImagesFriends: []
    }, () => {
      this.setState({
        ImagesFriends: [...tab]
      })
    })
  }


  componentWillUnmount() {
    ActusStores.removeListener('getImagesFriends', this.getImagesFriends)
  }


  componentWillMount() {
      if (ActusStores.getFirstReq()) {
      let thisS = this
        axios.post('/firstActu', {
          myId: JSON.parse(localStorage.getItem('user')).id,
        })
        .then(function (data) {
            if (data.data.err) console.log('err wtfuck')
            else {
              ActusActions.firstpushImg(data.data.imagesFriends)
            }
        })
        .catch(function (error) {
        });
      }
      ActusStores.on('getImagesFriends', this.getImagesFriends)
    }

    render() {
      return (
        <div className="actu">
        
        {this.state.ImagesFriends}

        <img onClick={this.hundlePushHoserImg} className="btnPushIstx tutistx" src="/iconI/flech.png" alt=""></img>
        </div>
      )
    }
}

export default ActuInsta;

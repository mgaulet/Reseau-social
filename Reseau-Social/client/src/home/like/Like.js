import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react'

import '../Actu-insta.css'
import '../TodoFriends.css'

import axios from 'axios'

import * as LikeActions from '../../../flux/actions/LikeActions.js'
import LikeStores from '../../../flux/stores/LikeStores.js'


class Like extends Component {

    state = {
        like: null,
    }

    getNbLike = (voids, bool, tr) => {

        if (bool)
            if (tr)
                this.setState({
                    like: <Icon id={this.props.myId} onClickCapture={this.myLike} style={{marginRight: "15px", fontWeight: "100", color: "red"}} name='heart' size='large'/>
                })
            else
                this.setState({
                    like: <Icon id={this.props.myId} onClickCapture={this.myLikes} style={{marginRight: "15px", fontWeight: "100", color: this.props.col}} name='heart outline' size='large'/>
                })
    }

    componentWillMount () {
        LikeStores.on(`${this.props.myId}`, this.getNbLike)
    }

    componentWillUnmount() {
        LikeStores.removeListener(`${this.props.myId}`, this.getNbLike)
      }

    componentDidMount() {
        let like

        if (LikeStores.getFirstBool(this.props.myId)) {
            LikeActions.firstInitLike(this.props.myId, this.props.myLike)
            let id = JSON.parse(localStorage.getItem('user')).id
            let res = this.props.myLike.find(elem => elem.id === id)
            if (res) {
                like = <Icon id={this.props.myId} onClickCapture={this.myLike} style={{marginRight: "15px", fontWeight: "100", color: "red"}} name='heart' size='large'/>
                LikeActions.initDiv(this.props.myId, 'red')
            }
            else {
                like = <Icon id={this.props.myId} onClickCapture={this.myLikes} style={{marginRight: "15px", fontWeight: "100", color: this.props.col}} name='heart outline' size='large'/>
                LikeActions.initDiv(this.props.myId, 'blanc')
            }
        } else {
            if (LikeStores.getLike(this.props.myId) === 'red')
                like = <Icon id={this.props.myId} onClickCapture={this.myLike} style={{marginRight: "15px", fontWeight: "100", color: "red"}} name='heart' size='large'/>
            else
                like = <Icon id={this.props.myId} onClickCapture={this.myLikes} style={{marginRight: "15px", fontWeight: "100", color: this.props.col}} name='heart outline' size='large'/>
        }
        this.setState({
            like,
        })
    }

    handleDataLike = (bool) => {
        axios.post('/likeImg', {
            idUserImg: this.props.idUser,
            liked: bool,
            myId: JSON.parse(localStorage.getItem('user')).id,
            idImg: this.props.myId,
        })
        .then((data) => {
            
        })
        .catch((data) => {

        })

    }

    myLike = (e) => {

        this.handleDataLike(false)

        LikeActions.initDiv(this.props.myId, 'blanc')
      }
    myLikes = (e) => {

        this.handleDataLike(true)

        LikeActions.initDiv(this.props.myId, 'red')
      }
    

    render() {
        let styleCss = {}

        if (this.props.styleCss) 
            styleCss = this.props.styleCss

        styleCss.display = "inline"

        return (
            <div onDoubleClick={() => {console.log("oui")}} style={styleCss}>
                {this.state.like}
            </div>
        )
    }


}

export default Like;

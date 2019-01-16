import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react'

import '../Actu-insta.css'
import '../TodoFriends.css'

import axios from 'axios'

import LikeStores from '../../../flux/stores/LikeStores.js'


class NbLike extends Component {

    state = {
        nb: LikeStores.getNbLike(this.props.myId)
    }

    getNbLike = (data) => {
        this.setState({
            nb: data
        })
    }

    componentWillMount () {
        LikeStores.on(`${this.props.myId}`, this.getNbLike)
    }

    componentWillUnmount() {
        LikeStores.removeListener(`${this.props.myId}`, this.getNbLike)
      }
  
    componentDidMount() {

        this.setState({
            nb: LikeStores.getNbLike(this.props.myId),
        })
    }

    render() {
        let styleCss = {}

        if (this.props.styleCss) 
            styleCss = this.props.styleCss
            
        return (
            <div>
                <div className="textStyNumber" style={styleCss}>{this.state.nb + " J'aime"}</div>
            </div>               
        )
    }


}

export default NbLike;

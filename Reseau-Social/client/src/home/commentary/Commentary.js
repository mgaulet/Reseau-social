import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react'

import '../Actu-insta.css'
import '../TodoFriends.css'

import axios from 'axios'


import * as CommentaryActions from '../../../flux/actions/CommentaryActions.js'
import CommentaryStores from '../../../flux/stores/CommentaryStores.js'


class Commentary extends Component {

    state = {
        commentary: CommentaryStores.getCommentary(this.props.idImg),
    }

    hundleStateComm = (divTab) => {
        this.setState({
            commentary: divTab
        })
    }

    componentWillUnmount() {
        CommentaryStores.removeListener(`${this.props.idImg} getStateComm`, this.hundleStateComm)
    }
    componentDidMount(){
        if (CommentaryStores.getBoolInit(this.props.idImg, this.props.com)) {
            CommentaryActions.firstInitCom(this.props.idImg, this.props.com)
        }
    }

    componentWillMount() {
        CommentaryStores.on(`${this.props.idImg} getStateComm`, this.hundleStateComm)
    }

    render() {

        return (
            <div style={{marginTop: "5px"}}>
                {this.state.commentary}
            </div>
        )
    }


}

export default Commentary;

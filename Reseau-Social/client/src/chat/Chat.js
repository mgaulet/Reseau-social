import React, {Component} from 'react'
import FromMessage from './FormMessage'
import './Chat.css'
import AddMessage from './AddMessage'

import * as TabMsgFriendActions from '../../flux/actions/TabMsgActions.js'
import TabMsgStores from '../../flux/stores/TabMsgStores.js'

import SocketStores from '../../flux/stores/SocketStores.js'
let socket = SocketStores.getSocketIo()

let MsgFriend = (idFriend, text) => {
    TabMsgFriendActions.pushMsgFront(text, idFriend)
}

socket.on('eventMsgFriend', MsgFriend)

class Chat extends Component {
    state = {
        tabMsg: TabMsgStores.getMsg(this.props.idMsgF),
        textMsg: '',
    }

    loadMsg = (tab) => {
        this.setState({
            tabMsg: tab
        })
        let nb = document.getElementById('boxMsg').scrollHeight;
	    document.getElementById('boxMsg').scrollBy(0, nb);
    }

    componentDidUnmount() {
        TabMsgStores.removeListener('loadMsg', this.loadMsg)
    }

    componentDidMount() {
        TabMsgStores.on('loadMsg', this.loadMsg)
        let nb = document.getElementById('boxMsg').scrollHeight;
	    document.getElementById('boxMsg').scrollBy(0, nb);
    }

    hundleTextMsg = (e) => {
        e.preventDefault()
        this.setState({
            textMsg: e.target.value
        })
    }

    btnAdd = (e) => {
        e.preventDefault()
        this.setState({
            textMsg: ''
        })
        TabMsgFriendActions.pushMsg(this.state.textMsg, this.props.idMsgF)
    }

    render (){
     
        return (

            <div>
                <FromMessage/>
                <AddMessage/>

                 <div className="chat_window">
                    <ul className="messages" id="boxMsg">

                    {this.state.tabMsg}


                    </ul>
                        
                    <div className="bottom_wrapper clearfix">
                        <div className="row">
                            <form className="tyui">
                                <div className="row">
                                    <form onSubmit={this.btnAdd}>
                                        <div className="input-field">
                                            <input id="icon_prefix2" className="materialize-input" value={this.state.textMsg} onChange={this.hundleTextMsg}></input>
                                        </div>
                                    </form>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
            </div>

        )
    }

}

export default Chat

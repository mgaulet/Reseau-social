import {EventEmitter} from 'events'
import dispatcher from "../../dispatcher/dispatcherMsg"
import React, { Component } from 'react';

import { Button } from "semantic-ui-react";
import * as ListFriendActions from '../actions/ListFriendActions.js'

import axios from 'axios'



class MsgStores extends EventEmitter {
    tabMsg  = []
    
    algoMsg = (myId, idF, tab) => {
        let tabg = []
        tab.forEach((elem) => {
            let choose = (myId === elem.emmeter) ? "right" : "left";
            tabg.push(
                <li className={"message appeared " + choose}>
                    <div className="text_wrapper">
                        <div className="text textBreak">{elem.msg}</div>
                    </div>
                </li>
            )
        })
        this.tabMsg[idF] = tabg
        return tabg
    }
    getMsg(idF) {
        let myId = JSON.parse(localStorage.getItem('user')).id
        if (this.tabMsg[idF]) return this.tabMsg[idF]
        else {
            axios.post('/getAllMsg', {
                myId: myId,
                idF: idF
            }).then((data) => {
                if (data.data.err) {}
                else {
                    this.emit("loadMsg", this.algoMsg(myId, idF, data.data.tab))
                }
            })
            .catch(function (error) {
                console.log(error);
              });
        }
    }

    pushText = (text, idF) => {

        
        axios.post('/pushMsgForFriend', {
            myId: JSON.parse(localStorage.getItem('user')).id,
            text: text,
            idF: idF,
        })
        .then((data)=> {
            if (data.data.err) {}
                else {
                    this.tabMsg[idF].push(
                        <li className={"message appeared right"}>
                            <div className="text_wrapper">
                                <div className="text textBreak">{text}</div>
                            </div>
                        </li>
                    )
                    this.emit("loadMsg", this.tabMsg[idF])
                }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    pushTextFront = (idF, text) => {
        this.tabMsg[idF].push(
            <li className={"message appeared left"}>
                <div className="text_wrapper">
                    <div className="text textBreak">{text}</div>
                </div>
            </li>
        )
        this.emit("loadMsg", this.tabMsg[idF])
    }

    hundleAction = (action) => {
        if (action.type === "MSG_PUSH") {
            this.pushText(action.text, action.idF)
        }
        else if (action.type === "MSGFRONT_PUSH") {
            this.pushTextFront(action.idF, action.text)
        }
    }
}

const msgStores = new MsgStores
dispatcher.register(msgStores.hundleAction)
window.dispatcher = dispatcher
export default msgStores
import {EventEmitter} from 'events'
import dispatcher from "../../dispatcher/dispatcherCommentary"
import React, { Component } from 'react';

import SocketStores from './SocketStores.js'
let socket = SocketStores.getSocketIo()


socket.on('commentarySocket', (idImg, obj) => {
    console.log("on passe ??!!!")
    console.log(obj);
    console.log(idImg);
    
    
    commentaryStores.pushCommentary(idImg, obj)
})

import axios from 'axios'
import { userInfo } from 'os';

let comNbPush = (tab, nb) => {
    let newTab = []
    let tabDiv = []
    let index = 0
    let tabs = [...tab].reverse()
    while (index != 2 && tabs.length !== index + nb) {
        newTab.push(tabs[nb + index++])
    }

    newTab.forEach((elem) => {
        tabDiv.push( <br></br>)
        tabDiv.push( <div><a>{"@"+elem.lastName+"_"+elem.name}</a> {" "+elem.content}</div>)
    })


    return [tabDiv, index]
}

class CommentaryStores extends EventEmitter {

    commentary = []

    pushCommentary = (idImg, elem) => {

        if (this.commentary[idImg]) {
            this.commentary[idImg].cpCom.splice(0,0, <div><a>{"@"+elem.lastName+"_"+elem.name}</a> {" "+elem.content}</div>)
            this.commentary[idImg].cpCom.splice(0,0, <br></br>)
            this.emit(`${idImg} getStateComm`, [...this.commentary[idImg].cpCom])
        } else {
            // let myCom = elem.content
            // let recupValue = comNbPush([elem], 0)
            this.commentary[idImg] = {
                // nbPush: recupValue[1],
                // idImg,
                myCom: [elem],
                // cpCom: recupValue[0],
                first: 1
            }
            // this.emit(`${idImg} getStateComm`, [...this.commentary[idImg].cpCom])
        }
    }

    getBoolInit = (idImg, com) => {
        if (this.commentary[idImg] && !this.commentary[idImg].first) {
            return false
        }
        else {
            if (this.commentary[idImg])
                this.commentary[idImg].myCom = [...com,...this.commentary[idImg].myCom]
            return true
        }
    }

    getCommentary = (idImg) => {
        if (this.commentary[idImg])
            return this.commentary[idImg].cpCom
        else return []
    }

    firstInitCom = (idImg, myCom) => {
        let recupValue
       
        if (!this.commentary[idImg] || this.commentary[idImg].first) {
            if (this.commentary[idImg] && this.commentary[idImg].first)
            myCom = [...this.commentary[idImg].myCom]
            console.log("ici 1")
            console.log(myCom)
            recupValue = comNbPush(myCom, 0)
            this.commentary[idImg] = {
                nbPush: recupValue[1],
                idImg,
                myCom,
                cpCom: recupValue[0],
                first: 0
            }
        }
        else {
            recupValue = comNbPush(this.commentary[idImg].myCom, this.commentary[idImg].nbPush)
            this.commentary[idImg].nbPush += recupValue[1]
            this.commentary[idImg].cpCom = [...this.commentary[idImg].cpCom, ...recupValue[0]]
        }

        this.emit(`${idImg} getStateComm`, this.commentary[idImg].cpCom)
    }

   hundleAction = (action) => {
        if (action.type === "FIRSTINIT_COM") {
            this.firstInitCom(action.idImg, action.myCom)
        }
    }
}

const commentaryStores = new CommentaryStores
dispatcher.register(commentaryStores.hundleAction)
window.dispatcher = dispatcher
export default commentaryStores
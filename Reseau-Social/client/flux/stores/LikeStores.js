import {EventEmitter} from 'events'
import dispatcher from "../../dispatcher/dispatcherLike"
import React, { Component } from 'react';

import { Button } from "semantic-ui-react";
import * as LikeActions from '../actions/LikeActions.js'

import SocketStores from './SocketStores.js'
let socket = SocketStores.getSocketIo()

import axios from 'axios'
import { userInfo } from 'os';

socket.on("likedImg", (data) => {
    likeStores.likeTarget(data)
})

class LikeStores extends EventEmitter {
    like = []

    likeTarget = (data) => {
        if (this.like[data.idImg]) {
            if (data.liked) {
                    this.like[data.idImg].like.push({id: data.myId})
            } else {
                this.like[data.idImg].like = this.like[data.idImg].like.filter((el) => el.id !== data.myId)
            }
            let bool = data.myId === JSON.parse(localStorage.getItem('user')).id
            this.emit(`${data.idImg}`, this.like[data.idImg].like.length, bool, data.liked)
        }

    }

    getNbLike = (idImg) => {
        if (this.like[idImg]) {
            return this.like[idImg].like.length
        } else return 0
    }

    pushLike = (div, idImg) => {
        if (!this.like[idImg]) this.like[idImg] = {}
        this.like[idImg].div = div
    }

    getFirstBool = (idImg) => {
        if (!this.like[idImg]){
             return true}
        else {
        return false}
    }

    getLike = (idImg) => {
        if (this.like[idImg])
            return this.like[idImg].div
        else return null
    }

    firstInitLike = (idImg, like) => {
        
        
        if (!this.like[idImg]) {
            
            this.like[idImg] = {}
        }
        this.like[idImg].like = like
        this.like[idImg].div = like.find(elem => elem.id === JSON.parse(localStorage.getItem('user')).id) ? 'red' : 'blanc'
    }



    initDiv = (idImg, div) => {
        if (this.like[idImg]) {
            this.like[idImg].div = div
        }
        
    }

   hundleAction = (action) => {
        if (action.type === "STATUSLIKE_LIKE") {
            this.pushLike(action.div, action.idImg)
        }
        else if (action.type === "FIRSTINIT_LIKE") {
            this.firstInitLike(action.idImg, action.myLike)
        }
        else if (action.type === "INITDIV_LIKE") {
            this.initDiv(action.idImg, action.div)
        }
        
    }
}

const likeStores = new LikeStores
dispatcher.register(likeStores.hundleAction)
window.dispatcher = dispatcher
export default likeStores
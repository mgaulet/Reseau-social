import {EventEmitter} from 'events'
import dispatcher from "../../dispatcher/dispatcherNotif"
import React, { Component } from 'react';

import { Button } from "semantic-ui-react";
import * as ListFriendActions from '../actions/ListFriendActions.js'

import axios from 'axios'


class NotifStores extends EventEmitter {
    firstConnect = true
    notif = [
    ]

    getNotifs () {
        return this.notif
    }

    getFirstConnect () {
        return this.firstConnect
    }

    reqAdd = (e) => {
        e.preventDefault()
        let val = JSON.parse(e.target.value)
        this.notif = this.notif.filter(tab => tab.value !== val.id)

        let user = JSON.parse(localStorage.getItem('user'))
        if (user && user.id) {
            axios.post('/ConfirmeFriend', {
                myId: user.id,
                idFriend: val.id
              })
              .then(function (data) {
                if (data.data.err) ;
                else {
                    ListFriendActions.pushFollower(val)
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }

       this.emit('pushNotif')
    }

    reqRef = (e) => {
        e.preventDefault()
        this.notif = this.notif.filter(tab => tab.value !== e.target.value)

        let user = JSON.parse(localStorage.getItem('user'))
        if (user && user.id) {
            axios.post('/confirmeAnnule', {
                myId: user.id,
                idFriend: e.target.value
              })
              .then(function (data) {
                if (data.data.err) ;
                else {
                }
              })
              .catch(function (error) {
              });
        }

        this.emit('pushNotif')
    }

    initAll = (tab) => {
        this.firstConnect = false
        this.notif = [...tab.map(notif => {
            return {
                text:    <div style={{width: '350px', height: "40px",}}>
                <div style={{display: "flex", marginTop: "5px", position: "absolute", width: "100%", height: "100%"}}>
                    <img style={{marginTop: '0px', marginLeft: '3px'}} src={`/usersImage/${notif.id}/imgProfil.png`} className="img-circle imagesstx" alt="" />
                    <div className="">
                      <div  className="" style={{marginTop: '0px', marginLeft: '8px'}}>
                        <a  style={{color: "#696969"}} className="small"><a id={'5be091b8d61849464542474a'} >{notif.name}</a></a>
                        <p className="small" style={{marginTop: '5px'}}>{notif.lastName}</p>
                      </div>
                    </div>
                    <div style={{marginTop: "2px", marginLeft: "20%", }}>
                      <Button.Group style={{}} size='mini'>
                        <Button value={JSON.stringify(notif)} onClickCapture={this.reqAdd} style={{backgroundColor: "rgb(194, 101, 101)", boxShadow: "0px 0px 10px rgb(169, 168, 168)"}}>Acceptee</Button>
                        <Button.Or />
                        <Button value={notif.id} onClickCapture={this.reqRef} style={{boxShadow: "0px 0px 10px rgb(169, 168, 168)"}}>Refuser</Button>
                      </Button.Group>
                    </div>
                  </div>
                    <div style={{bottom: '0px', position: "absolute", marginLeft: "34px"}} className="dividersssst"></div>
                  </div>,
                  value: notif.id
              }
        }), ...this.notif]
        this.emit('pushNotif')
    }

    
    pushNotif = (notif) => {
        this.notif = [...this.notif, 
            {
                text:    <div style={{width: '350px', height: "40px",}}>
                <div style={{display: "flex", marginTop: "5px", position: "absolute", width: "100%", height: "100%"}}>
                    <img style={{marginTop: '0px', marginLeft: '3px'}} src={`/usersImage/${notif.id}/imgProfil.png`} className="img-circle imagesstx" alt="" />
                    <div className="">
                      <div  className="" style={{marginTop: '0px', marginLeft: '8px'}}>
                        <a  style={{color: "#696969"}} className="small"><a id={'5be091b8d61849464542474a'} >{notif.name}</a></a>
                        <p className="small" style={{marginTop: '5px'}}>{notif.lastName}</p>
                      </div>
                    </div>
                    <div style={{marginTop: "2px", marginLeft: "20%", }}>
                      <Button.Group style={{}} size='mini'>
                        <Button value={JSON.stringify(notif)} onClickCapture={this.reqAdd} style={{backgroundColor: "rgb(194, 101, 101)", boxShadow: "0px 0px 10px rgb(169, 168, 168)"}}>Acceptee</Button>
                        <Button.Or />
                        <Button value={notif.id} onClickCapture={this.reqRef}style={{boxShadow: "0px 0px 10px rgb(169, 168, 168)"}}>Refuser</Button>
                      </Button.Group>
                    </div>
                  </div>
                    <div style={{bottom: '0px', position: "absolute", marginLeft: "34px"}} className="dividersssst"></div>
                  </div>,
                  value: notif.id
              },
        ]

        this.emit('pushNotif')
    }
    
   hundleAction = (action) => {
        if (action.type === "NOTIF_PUSH") {
            this.pushNotif(action.notif)
        }
        else if (action.type === "NOTIF_INITALL") {
            this.initAll(action.tab)
        }
        else if (action.type === "NOTIF_VALNOT") {
        this.valOrNo(action.idFriend)
    }
    }
}

const notifStores = new NotifStores
dispatcher.register(notifStores.hundleAction)
window.dispatcher = dispatcher
export default notifStores
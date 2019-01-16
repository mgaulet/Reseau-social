import React, {Component} from 'react';
import dispatcher from "../../dispatcher/dispatcherActus"
import {EventEmitter} from 'events'
import { Icon } from 'semantic-ui-react'
import Like from "../../src/home/like/Like"
import NbLike from "../../src/home/nbLike/NbLike"
import Com from "../../src/home/commentary/Commentary"
import Inputs from "../../src/home/utils/input"

import * as CommentaryActions from '../actions/CommentaryActions.js'
import * as LikeActions from '../actions/LikeActions.js'

class ActusStores extends EventEmitter {
    imagesFriends = []
    ImagesAllFriends = []
    nbImage = 0
    firstReq = true

    addCom = (e) => {
      CommentaryActions.firstInitCom(e.target.id)
    }

    getAllThis = () => {
      return this
    }
    getFirstReq = () => {
        return this.firstReq
    }

    deleteImgFriend = (idImg) => {
        this.ImagesAllFriends.forEach((elem, index) => {
            if (elem.url.indexOf(idImg) !== -1 && this.nbImage > index)
                this.nbImage -= 1
        })

        this.ImagesAllFriends = this.ImagesAllFriends.filter(elem => -1 === elem.url.indexOf(idImg))
        this.imagesFriends = []

        this.ImagesAllFriends.forEach((elem, index) => {
        if (index < (this.nbImage)){
          
            this.imagesFriends.push(
                <div style={{width: "600px", boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.34)", marginRight: "15px", marginBottom: "70px"}}>
            <div className="boxTop">
              <img src={"/iconI/cirlcess.png"} className="img-circle imagexxs" alt="" />
              <img src={"/usersImage/"+elem.idUser+"/imgProfil.png"} className="img-circle imagexx" alt="" />
              <div className="textSty">{elem.lastName+elem.name}</div>
            </div>
            <img src={elem.url} className="images" />
            <div className="boxbottom">
              <div>

                <div style={{marginTop: "13px", marginLeft: "15px"}}>
                  <Like  myId={elem._id} myLike={elem.like} idUser={elem.idUser}/>
                  <Icon style={{marginRight: "15px", fontWeight: "100"}} name='comment outline' size='large'/>
                  <Icon style={{marginRight: "445px", fontWeight: "100"}} name='edit outline' size='large'/>
                  <Icon style={{}} name='bookmark outline' size='large'/>
                </div>
                <NbLike styleCss={{marginTop: "25px", marginLeft: "15px", color: "#262626"}} myId={elem._id} myLike={elem.like} idUser={elem.idUser}/>

                <div style={{display: "inline-block", marginTop: "15px", marginLeft: "13px", marginBottom: "7px"}}>
                  <p className="textStys" style={{marginRight: "2px", color: "#262626", display: "inline"}}>{"Alex_Gaulet "} </p>
                  <p style={{marginBottom: "0px", display: "inline"}}>{elem.content}</p>
                </div>
                <p className="textSty" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px"}}>Charger d'autre commentaires</p>
                <div style={{marginLeft: "15px"}}>
                  <Com com={elem.commentary} idUser={elem.idUser} idImg={elem._id}/>
                </div>
                <p className="" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px", fontSize: "10px", letterSpacing: ".2px"}}>IL Y A 5 HEURES</p>
                <div className="barrrt"></div>
                
                <Inputs idImg={elem._id} idUser={elem.idUser} />
              </div>
            </div>
          </div>
            )
        }
        })
        
        this.emit('getImagesFriends', this.imagesFriends)

    }

    onePushI = (elem) => {
      
        this.imagesFriends.splice(0,0,
          <div style={{width: "600px", boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.34)", marginRight: "15px", marginBottom: "70px"}}>
        <div className="boxTop">
          <img src={"/iconI/cirlcess.png"} className="img-circle imagexxs" alt="" />
          <img src={"/usersImage/"+elem.idUser+"/imgProfil.png"} className="img-circle imagexx" alt="" />
          <div className="textSty">{elem.lastName+elem.name}</div>
        </div>
        <img src={elem.url} className="images" />
        <div className="boxbottom">
          <div>

            <div style={{marginTop: "13px", marginLeft: "15px"}}>
              <Like  myId={elem._id} myLike={elem.like} idUser={elem.idUser}/>
              <Icon style={{marginRight: "15px", fontWeight: "100"}} name='comment outline' size='large'/>
              <Icon style={{marginRight: "445px", fontWeight: "100"}} name='edit outline' size='large'/>
              <Icon style={{}} name='bookmark outline' size='large'/>
            </div>
            <NbLike styleCss={{marginTop: "25px", marginLeft: "15px", color: "#262626"}} myId={elem._id} myLike={elem.like} idUser={elem.idUser}/>

            <div style={{display: "inline-block", marginTop: "15px", marginLeft: "13px", marginBottom: "7px"}}>
              <p className="textStys" style={{marginRight: "2px", color: "#262626", display: "inline"}}>{"Alex_Gaulet "} </p>
              <p style={{marginBottom: "0px", display: "inline"}}>{elem.content}</p>
            </div>
            <p className="textSty" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px"}}>Charger d'autre commentaires</p>
            <div style={{marginLeft: "15px"}}>
                <Com com={elem.commentary} idUser={elem.idUser} idImg={elem._id}/>
            </div>
            <p className="" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px", fontSize: "10px", letterSpacing: ".2px"}}>IL Y A 5 HEURES</p>
            <div className="barrrt"></div>
            <Inputs idImg={elem._id} idUser={elem.idUser} />
          </div>
        </div>
        </div> )
        this.emit('getImagesFriends', this.imagesFriends)
    }

    btnAdds = (e) => {
      e.preventDefault()
    }
    firstpushImg = (tab) => {
        if (tab) this.ImagesAllFriends = tab
        else tab = this.ImagesAllFriends

        this.firstReq = false

        tab.forEach((elem, index) => {
        if (index >= (this.nbImage) && (index <= (this.nbImage + 4))){
              let style = {height: "30px", marginTop: "15px", marginBottom: "3px", marginLeft: "15px", marginRight: "15px", width: "570px"}     

            this.imagesFriends.push(
                <div style={{width: "600px", boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.34)", marginRight: "15px", marginBottom: "70px"}}>
            <div className="boxTop">
              <img src={"/iconI/cirlcess.png"} className="img-circle imagexxs" alt="" />
              <img src={"/usersImage/"+elem.idUser+"/imgProfil.png"} className="img-circle imagexx" alt="" />
              <div className="textSty">{elem.lastName+elem.name}</div>
            </div>
            <img src={elem.url} className="images" />
            <div className="boxbottom">
              <div>

                <div style={{marginTop: "13px", marginLeft: "15px"}}>
                  <Like myId={elem._id} myLike={elem.like} idUser={elem.idUser}/>
                  <Icon style={{marginRight: "15px", fontWeight: "100"}} name='comment outline' size='large'/>
                  <Icon style={{marginRight: "445px", fontWeight: "100"}} name='edit outline' size='large'/>
                  <Icon style={{}} name='bookmark outline' size='large'/>
                </div>
                <NbLike styleCss={{marginTop: "15px", marginLeft: "15px", color: "#262626"}} myId={elem._id} myLike={elem.like} idUser={elem.idUser}/>

                <div style={{display: "inline-block", marginTop: "15px", marginLeft: "13px", marginBottom: "7px"}}>
                  <p className="textStys" style={{marginRight: "2px", color: "#262626", display: "inline"}}>{"Alex_Gaulet "} </p>
                  <p style={{marginBottom: "0px", display: "inline"}}>{elem.content}</p>
                </div>
                <p className="textSty" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px"}} id={elem._id} onClick={this.addCom}>Charger d'autre commentaires</p>

                <div style={{marginLeft: "15px", maxHeight: "300px", overflow: "auto"}}>
                  <Com com={elem.commentary} idUser={elem.idUser} idImg={elem._id} />
                </div>

                <p className="" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px", fontSize: "10px", letterSpacing: ".2px"}}>IL Y A 5 HEURES</p>
                <div className="barrrt"></div>
                <Inputs idImg={elem._id} idUser={elem.idUser} styleCom={style}/>

              </div>

            </div>
          </div>
            )
      } else LikeActions.firstInitLike(elem._id, elem.like)

        })
        
        this.nbImage += 5
        this.emit('getImagesFriends', this.imagesFriends)
    }

    getImagesFriends = () => {
        return this.imagesFriends
    }
 
   hundleAction = (action) => {
        if (action.type === "FIRSTPUSHIMG_ACTUS") {
            this.firstpushImg(action.tab)
        }
        else if (action.type === "LIVEIMG_ACTUS") {
            this.onePushI(action.tab)
        }
        else if (action.type === "DELETEIMG_ACTUS") {
            this.deleteImgFriend(action.idImg)
        }
        
        
   }
}
const actusStores = new ActusStores
dispatcher.register(actusStores.hundleAction)
window.dispatcher = dispatcher
export default actusStores
import React, {Component} from 'react'
import {Button, Icon} from 'element-react'
import './Personal.css'
import NavBar from '../home/Insta'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import TodoImg from './todoImg/TodoImg'
import Carousels from './caroussel/Caroussel.js'
import FriendsStores from '../../flux/stores/FriendsStores.js'
import  * as FriendsActions from '../../flux/actions/FriendsActions.js'
import * as ListFriendActions from '../../flux/actions/ListFriendActions.js'
import ListFriendStores from '../../flux/stores/ListFriendStores.js'

import { css, lastOfType } from 'glamor'
let styleBTN = css({    
    border: "1px solid #dbdbdb",
    backgroundColor: "#fafafa",
    color: "2d2d2d",
    padding: "8px 15px",
    fontSize: '15px',
    fontWeight: 400,
    marginTop: "4px",
    ":hover": {
        backgroundColor: "#3b97e8",
        color: "#fff"
      }
})
class UserFriends extends Component {

    constructor(props){
        super(props)

        this.state = {
            name: '',
            lastName: '',
            firstIMG: false,
            imageE: false,
            floot: false,
            imgNewImg: 0,
            todos: FriendsStores.getAll(),
            friend: FriendsActions.getFriend(),
            btnFollow: ListFriendStores.getStatus(this.props.match.params.id),
            statuAbn: null,
            gr: 1,
        }
    }

    getBtnSOrD = () => {
        this.setState({
            btnFollow: ListFriendStores.getStatus(this.props.match.params.id)
        })
    }

    getPersoFriend = () => {
        let thisS = this
        this.setState({
            friend: []
        }, () => {
            thisS.setState({
                friend: FriendsStores.getFriend()
            })
        })
    }



    getTodo = () => {
        let thisS = this

        this.setState({
            todos: [],
            friend: []
        }, () => {
            thisS.setState({
                todos: FriendsStores.getAll(),
                friend: FriendsStores.getFriend()
            })
        })

    }

    hundlePushTodo = (data) => {
        FriendsActions.createTodo(data)
    }

    

    componentDidMount() {
        if (FriendsStores.getBool()){
            FriendsStores.emitChange()
        }
        let id = this.props.match.params.id
        let thisS = this
            axios.post('/imageFriend2', {
                data: id,
                nbImage: 3,
                myId: JSON.parse(localStorage.getItem('user')).id,
              })
              .then(function (data) {
                  if (data.data.err) {
                  } else {
                    thisS.hundlePushTodo(data.data.data)
                  }
              })
              .catch(function (error) {
              });

    }

    componentWillMount() {
            axios.post("/likeNoFriends", {
                id: this.props.match.params.id,
                myId: JSON.parse(localStorage.getItem('user')).id,
            })
            .then((data) => {

            })
            .catch((err) => {})
        FriendsStores.on('change', this.getTodo)
        ListFriendStores.on('firstIn', this.getBtnSOrD)
        
        axios.post('/imageFriend2', {
            data: this.props.match.params.id,
            nbImage: 3,
            myId: JSON.parse(localStorage.getItem('user')).id,
          })
          .then(function (data) {
            if (data.data.err) {
            } else {
              FriendsActions.deleteTodo()
              FriendsActions.createFriend(data.data.friend)
              FriendsActions.createTodo(data.data.data)
          }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

      UNSAFE_componentWillReceiveProps(nextProps) {
        
          axios.post("/likeNoFriendsDelete", {
              id: this.props.match.params.id,
              myId: JSON.parse(localStorage.getItem('user')).id,
          })
          .then((data) => {
              
                FriendsActions.deleteTodo()
          })
          .catch((err) => {
          })
          
      }
    
    componentWillUnmount() {
        if (!ListFriendStores.getFollowed().find(elem => elem.id === this.props.match.params.id))
        axios.post("/likeNoFriendsDelete", {
            id: this.props.match.params.id,
            myId: JSON.parse(localStorage.getItem('user')).id,
        })
        .then((data) => {
            
        })
        .catch((err) => {
        })
        FriendsActions.deleteTodo()
        ListFriendStores.removeListener('firstIn', this.getBtnSOrD)
        FriendsStores.removeListener('change', this.getTodo)
    }


  flootHundle = (urlImg, sec) => {
    this.state.imgNewImg = urlImg

    if (sec === 1) {
        this.setState({
        floot: true,
        imageE: true,
        firstIMG: false
        })
    } else {
        this.setState({
            floot: false,
            imageE: true,
            firstIMG: true
        })
    }
  }

  escFlootHundle = () => {     // efface l affichage de la creation de l image
    this.state.imgNewImg = 0
    this.setState({
      floot: false,
      imageE: false,
      firstIMG: false
    })
  }

      hundleAddTodo = () =>{
        let id = this.props.match.params.id
        let thisS = this

         if (id) {
             let nbbb = FriendsStores.getNbImage()
             console.log(nbbb);
             
            axios.post('/pushOtherI2', {
                data: id,
                nbImage: nbbb,
                myId: JSON.parse(localStorage.getItem('user')).id,
              })
              .then(function (data) {
                    FriendsStores.pushOtherTodo(data.data.data)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
      }

      sAbonner = () => {

          axios.post('/reqFollow', {
            idSocket: this.props.match.params.id,   //id pour le destinater
            id: JSON.parse(localStorage.getItem('user')).id,
          })
          .then(function (data) {
              if (!data.data.err)
                if (typeof {} === typeof data.data.msg) {
                    ListFriendActions.pushFollowed(data.data.msg)
                }

          })
          .catch(function (data) {
          });

            this.setState({
                btnFollow: "Se desabonner",
                statuAbn: <div className='btnnt '><Button onClick={this.sDesabonner} className={`${styleBTN}`}>{"Se desabonner"}</Button></div>
            })
       

      }
      sDesabonner = () => {
          let thiss = this
          
        axios.post('/sDesabonner', {
            idFriend: this.props.match.params.id,   //id pour le destinater
            id: JSON.parse(localStorage.getItem('user')).id,
          })
          .then(function (data) {
            if (data.data.err) console.log('err supperssion friend');
            else {
                    ListFriendActions.deleteFollowed(thiss.props.match.params.id)
                    thiss.setState({
                        btnFollow: "S'abonner",
                        statuAbn: <div className='btnnt '><Button onClick={thiss.sAbonner} className={`${styleBTN}`}>{"S'abonner"}</Button></div>
                    })
                }
          })
          .catch(function (err) {
            console.log(err);
          });


        

      }

    // ######################### RENDER () #########################
    // ######################### RENDER () #########################

    render () {

    
    
    let imageE = this.state.imageE ? (<div onClick={this.escFlootHundle}  className='imageFontShadow'></div>) : (<div></div>)
    let Carousel = this.state.floot ? (<Carousels urlImg={parseInt(this.state.imgNewImg)} todos={this.state.todos} deleteI={this.escFlootHundle} idUserImg={this.props.match.params.id} />) : (<div></div>)

    let tt = this.state.friend ? this.state.friend.lastName + '_' + this.state.friend.name : 'r'
    let followers = this.state.friend ? this.state.friend.followers : 0
    let followed = this.state.friend ? this.state.friend.followed : 0
    let nbImg = this.state.friend ? this.state.friend.nbImg : 0
    let uu = this.state.friend ?  this.state.friend.name+' '+this.state.friend.lastName : 'r'
    let btn = null
    
        this.state.statuAbn = (ListFriendStores.getStatus(this.props.match.params.id) === "Se Desabonner") ? <div className='btnnt '><Button onClick={this.sDesabonner} className={`${styleBTN}`}>{"Se desabonner"}</Button></div> 
                                                                        : <div className='btnnt '><Button onClick={this.sAbonner} className={`${styleBTN}`}>{"S'abonner"}</Button></div>
        btn = this.state.statuAbn
    if (JSON.parse(localStorage.getItem('user')).id === this.props.match.params.id)
        btn = null
 
        return (
            <div>
                {imageE}
                {Carousel}
                <div>
                        <NavBar/>
                    <div className='containerP'>

                            <div className="frtt firstDIV">
                                <div className="frtt tjbn4">
                                
                                <img src={"/usersImage/" + this.props.match.params.id + "/imgProfil.png"} className="imageP" alt=""/>

                                    <div className="fCircle">
                                    </div>

                                    <div style={{marginLeft: "100px"}}>
                                        <div className="frtt">
                                            <div className='fontP '><p>{(tt).toLowerCase()}</p></div>
                                                {btn}
                                        </div>

                                        <div className='frtt topBkgl'>
                                            <div className='pubAbAb'><p><span className='numFT'>{nbImg}</span> publications </p></div>
                                            <div className='pubAbAb'> <p><span className='numFT'>{followers}</span>  abonnes</p></div>
                                            <div className='pubAbAb'><p><span className='numFT'>{followed}</span>  abonnements</p></div>
                                        </div>

                                        <div className='frtt topBkgl'>
                                            <span className='nameSur'>{uu}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <TodoImg floot={this.flootHundle} />
                            
                            <img onClick={this.hundleAddTodo} className="btnPushI tuti" src="/iconI/flech.png" alt=""></img>
                    </div>
                </div>
            </div>

        )

    }
}

export default withRouter(UserFriends)
import React, {Component} from 'react';
import { Layout, Badge} from 'element-react';
import { Link, NavLink, withRouter } from 'react-router-dom'
import './TodoFriends.css'
import axios from 'axios'

import * as ListFriendActions from '../../flux/actions/ListFriendActions.js'
import  * as FriendsActions from '../../flux/actions/FriendsActions.js'

import SocketStores from '../../flux/stores/SocketStores.js'
import ListFriendStores from '../../flux/stores/ListFriendStores.js'


let socket = SocketStores.getSocketIo()



let fluxDes = (idUser) => {
    ListFriendActions.deleteFollower(idUser)
}

socket.on('eventDes', fluxDes)


class TodoFriends extends Component {

    constructor(props) {
        super(props)
        
        this.state = {

            countt: 1,
            todoFriends: ListFriendStores.getFriend()
        };
    }

    componentWillMount() {
        ListFriendStores.on('firstIn', this.getFirstFriend)
    }

    componentWillUnmount() {    // Supression de ecouteur
        ListFriendStores.removeListener('firstIn', this.getFirstFriend)
    }

    componentDidMount() {
    }



    countts = () => {
        let thiss = this
        setTimeout(function() {
            thiss.state.countt += + 1;
            thiss.setState({
                countt: thiss.state.countt
            })
            thiss.countts()
        }, 1000)
    }

    messageHundle = (e) => {
        this.props.floot(e.target.id)
    }

    getFirstFriend = () => {
        this.setState({
            todoFriends: ListFriendStores.getFriend()
        })
    }
    
    hundleDeleteFriends = (e) => {
        
        FriendsActions.deleteTodo()
        this.props.history.push('/friend/'+e.target.id)

        axios.post('/imageFriend2', {
          data: e.target.id,
          nbImage: 3,
          myId: JSON.parse(localStorage.getItem('user')).id,
        })
        .then(function (data) {
            if (data.data.err) {
            } else {
              FriendsActions.createFriend(data.data.friend)
              FriendsActions.createTodo(data.data.data)
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      }

    listsFriends =  (data) => {
        let tab = []
        let i = 0

        while(i !== data.length) {
            tab.push(
                <Layout.Row justify="start" type="flex" className="leftss friendMarge">
        
                        <Layout.Col span="8"> 
                            <img src={"/usersImage/" + data[i].id + "/imgProfil.png"} className="img-circle imagess" alt="" />
                        </Layout.Col>

                        <Layout.Col span="12" >
                            <div className="_0v2O4">
                                <div className="text-marge">
                                    <a style={{color: "#696969"}} className="small" id={data[i].id} onClick={this.hundleDeleteFriends}>{data[i].name + '_' + data[i].lastName}</a>
                                    <p className="small">{data[i].name + ' ' + data[i].lastName}</p>
                                </div>
                            </div>
                        </Layout.Col>
                        <Layout.Col span="3"> 
                        <img id={data[i].id} onClick={this.messageHundle} src={"/icon/lettre.png"} className="img-circle imagessx" />
                        </Layout.Col>
                    </Layout.Row>
            )
                i++
        }
        return tab
    }



    render() {
        let myId = JSON.parse(localStorage.getItem('user')).id
        let fr = this.listsFriends(this.state.todoFriends)
      return (
        <div>
            <Layout.Row justify="start" type="flex" className="leftss">

                <Layout.Col span="8"> 
                    <img src={"/usersImage/" + myId + "/imgProfil.png"} className="img-circle imagess" alt=""/>
                </Layout.Col>

                <Layout.Col span="10" >
                    <div className="_0v2O4">
                        <div className="text-marge">
                            <a style={{color: "#696969", whiteSpace: "nowrap"}} className="small">{this.props.user.lastName+' '+this.props.user.name}</a>
                            <p className="small">{this.props.user.lastName+' '+this.props.user.name}</p>
                        </div>
                    </div>
                </Layout.Col>
            </Layout.Row>
            <hr className="lineShadow"/>
            <p className="p-size">Amies</p>


            <div className="friendsList">
                {fr}
                <div className="imgShadow"/>
            </div>
            <hr className="lineShadowBot"/>
                <a className="supportt">
                    Suport Argent Finance. © 2018 Gaulet AM
                </a>
        </div>
      )
    }
}

export default withRouter(TodoFriends);

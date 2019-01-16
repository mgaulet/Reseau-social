import React, {Component} from 'react'
import './Signin.css'
import { Link, withRouter } from 'react-router-dom'

import axios from 'axios'

import io from 'socket.io-client';
import ip from '../../ipMachine'

const sockeT = io(ip);

import  * as SocketActions from '../../flux/actions/SocketActions.js'
import * as ListFriendActions from '../../flux/actions/ListFriendActions.js'

class Signin extends Component {

    state = {
        email: 'alex@gmail.com',
        password: '1ea4'
    }

    btnAdd = (e) => {
        e.preventDefault()
        const tab = this.state
        let thisS = this

        
        if (tab.email && tab.password) {
            axios.post('/', {
                data: tab,
              })
              .then(function (data) {
                  
                if (data.data.err) {
                    
                }
                else {

                    const sessionUser = {name: data.data.user.name, lastName: data.data.user.lastName, email: data.data.user.email, id: data.data.user._id}
                    let userJSON = JSON.stringify(sessionUser)
                    localStorage.setItem('user', userJSON)
                    SocketActions.createSocketIo(tab)

                    if (sessionUser && sessionUser.id) {// secu
                        axios.post('/getTodoFriends', {
                          id: sessionUser.id,
                        })
                        .then((res) => {
                          if (res.data.err){ 
                            }
                          else {
                            ListFriendActions.createTodo(res.data) /// send tab of friend
                          }
                        })
                        .catch((res) => {
                        })
                      }

                    thisS.props.history.push('/home')
                }
              })
              .catch(function (error) {
                console.log(error);
              });

        }
    }

    // componentDidMount() {
    //     let user = JSON.parse(localStorage.getItem('user'))
    //     console.log(user);
    // }
    
    saveText = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidMount () {
        // let thiss = this
        // setTimeout(() => {
        //     thiss.btnAdd()
        // }, 0)
    }

    render() {
        return (
            <div className='container'>

                <h1 className='center-5'>Signin</h1>

                <div className='policeF center'>
                    <div className=" row ">
                        <form onSubmit={this.btnAdd} className="frtt_signin">
                        <div className="row">
                                <div className="input-field col s12">
                                <input id="email" type="email" className="validate" value={this.state.email} onChange={this.saveText}/>
                                <label htmlFor="email">Email</label>
                                <span className="helper-text" data-error="wrong" data-success="right"></span>
                            </div>
                        </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.saveText}/>
                                <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <button className="btn-flat disabled" type='submit'></button>
                        </form>

                        <p className="waves-effect waves-teal btn-flat"><Link to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Signin)
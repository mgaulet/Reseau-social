import React, {Component} from 'react'
import './Register.css'
import { Link, withRouter } from 'react-router-dom'

import io from 'socket.io-client';
import ip from '../../ipMachine'

const socket = io(ip);


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            lastName: '',
            email: '',
            password: ''
        }
    }


    btnAdd = (e) => {
        e.preventDefault();
        const tab = this.state
        
        if (tab.name && tab.lastName && tab.email && tab.password) {
            socket.emit('ValEmail', tab, (dataErr) => {
            this.props.history.push('/')
            })
        }
    }
    
    saveText = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })
        
      }


    render() {
        return (
            <div className='container'>

                <h1>Register</h1>

                <div className="row policeF center">

                    <form onSubmit={this.btnAdd} className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                            <input id="name" type="text" className="validate" value={this.state.name} onChange={this.saveText}/>
                            <label htmlFor="name">First Name</label>
                            </div>
                            <div className="input-field col s6">
                            <input id="lastName" type="text" className="validate" value={this.state.lastName} onChange={this.saveText}/>
                            <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="email" type="email" className="validate" value={this.state.email} onChange={this.saveText}/>
                            <label htmlFor="email">Email</label>
                            <span className="helper-text" data-error="wrong" data-success="right"></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="password"  type="password" className="validate" value={this.state.password} onChange={this.saveText}/>
                            <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <button className="btn-flat disabled" type='submit'></button>
                    </form>
                    
                    <p className="waves-effect waves-teal btn-flat"><Link to='/'>Signin</Link></p>
                </div>
            </div>
        )
    }
}

export default withRouter(Register)
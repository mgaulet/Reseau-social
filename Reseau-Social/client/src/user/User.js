import React, {Component} from 'react'
import NavBar from '../home/Insta'

class User extends Component {
    state = {
        user: {}
    }

    componentDidMount() {
        let useR = JSON.parse(sessionStorage.getItem('user'))
        this.setState({
            user: useR
        },() =>{ 
        })
    }
    render () {
        return (
            <div>
                <NavBar/>

                <h1>{this.state.user.name} {this.state.user.lastName}</h1>
                <h1>{this.state.user.email}</h1>
                <h1>{this.state.user.id}</h1>
            </div>
        )
    }

}

export default User
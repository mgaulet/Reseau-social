import React, {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../Personal.css'
import './TodoImg.css'

import FriendsStores from '../../../flux/stores/FriendsStores.js'
import  * as FriendsActions from '../../../flux/actions/FriendsActions.js'

import Like from "../../home/like/Like"
import NbLike from "../../home/nbLike/NbLike"



class TodoImg extends Component {

    state = {
        selectedFile: 0,
        imageT:  [],
        newImage: null,
        gtt: 'alex',
        oHund: true,
        todos: FriendsStores.getAll()
    }


    getTodo = () => {
        this.setState({
            todos: FriendsStores.getAll()
        }, ()=> {
            this.hundleSorting()
        })
    }
    
    componentWillMount() {

        FriendsStores.on('change', this.getTodo)
        FriendsStores.listenerCount('change')
    }

    componentWillUnmount() {
        FriendsStores.removeListener('change', this.getTodo)
    }

    hundlePushTodo = (data) => {
        FriendsActions.createTodo(data)
    }

    
    oHundle = (e) => {
    }


    hundleZoom = (e) => {
        this.props.floot(e.target.id, 1)
    }

    tabE = (index, max) => {
        let ind = 0
        let IMG = []

        while (ind != 3) {
            if (index.index != max) {
                IMG.push(
                        <div  className="containers">
                            <img  src={this.state.todos[index.index].url} className="imageI" alt=""/>

                            <div id={index.index} onDoubleClickCapture={this.hundleZoom} className="overlay">
                            </div>
                            <div id={index.index} className="flex" style={{position: "absolute", top: "10px"}}>
                                    <Like col={"#fff"} myId={this.state.todos[index.index]._id} myLike={this.state.todos[index.index].like} idUser={this.state.todos[index.index].idUser}/>
                                    <NbLike styleCss={{color: "#fff"}} myId={this.state.todos[index.index]._id} myLike={this.state.todos[index.index].like} idUser={this.state.todos[index.index].idUser}/>
                            </div>
                        </div>
                   )
                index.index++;
            }
            ind++;
        }
        return IMG
}

hundleSorting = () => {
    let tab = []
    let index = {index: 0}
    let max = this.state.todos.length
    while (index.index != max) {
        tab.push(
                <div className='dncd'>
                    { this.tabE(index, max) }
                </div>
        )
    }

    this.setState({
        imageT: tab
    })
}

    render(){
        return (
            <div>

                <div className='dwDIV2'>

                    <hr className='_5mToa'/>
                    <div className="frtt">
                    <h5 className='' style={{marginTop: '6px', marginLeft: '44%', letterSpacing: '3px'}}>PHOTOS</h5>

                    </div>
                </div>

                    <div style={{marginLeft: "-36px"}}>
                        {this.state.imageT}
                    </div>
            </div>
        )
    }
}
export default withRouter(TodoImg)







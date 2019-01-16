import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'


import './Caroussel.css'
import '../../home/TodoFriends.css'

import Like from "../../home/like/Like"
import NbLike from "../../home/nbLike/NbLike"

class Caroussel extends Component {

    state = {
        text: '',
        imgI: '',
        nbImg: -1,
        elem: [],
        like: null,
        nbLike: null,
        // se connecter au todos store, renvoyer la todo puis remplacer this.props.url part l'id
    }

    newComponent = () => {

        if (!this.state.elem[this.props.todos[this.props.urlImg]._id]) {
            this.state.elem[this.props.todos[this.props.urlImg]._id] = {}
            this.state.elem[this.props.todos[this.props.urlImg]._id].like = <Like styleCss={{marginTop: "4px"}} myId={this.props.todos[this.props.urlImg]._id} myLike={this.props.todos[this.props.urlImg].like} idUser={this.props.todos[this.props.urlImg].idUser}/>
            this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike = <NbLike myId={this.props.todos[this.props.urlImg]._id} myLike={this.props.todos[this.props.urlImg].like} idUser={this.props.todos[this.props.urlImg].idUser}/>
        }
    }

    componentDidMount () {
        if (this.props.todos[this.props.urlImg]) {
            this.newComponent()
            this.setState({
                imgI : this.props.todos[this.props.urlImg].url,
                like: null,
                nbLike: null
            }, () => {
                this.setState({
                    like: this.state.elem[this.props.todos[this.props.urlImg]._id].like,
                nbLike: this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike  
                })
            })
            this.forceUpdate()
        }
            else {
            }
    }
    

    hundleLeft = () => {
        
        if (this.props.urlImg === 0) {
        }
        else {

            this.props.urlImg -= 1
            this.newComponent()
            this.setState({
                imgI : this.props.todos[this.props.urlImg].url,
                nbImg: this.props.urlImg,
                like: null,
                nbLike: null
            }, () => {
                this.setState({
                  like: this.state.elem[this.props.todos[this.props.urlImg]._id].like,
                nbLike: this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike  
                })
            })
            this.forceUpdate()
        }
    }
    hundlerigth = () => {
        let tgb = this.props.todos.length
        if (this.props.urlImg === (this.props.todos.length - 1)){
        }
        else {
            this.props.urlImg += 1
            this.newComponent()
            this.setState({
                imgI : this.props.todos[this.props.urlImg].url,
                nbImg: this.props.urlImg,
                like: null,
                nbLike: null
            }, () => {
                this.setState({
                    like: this.state.elem[this.props.todos[this.props.urlImg]._id].like,
                    nbLike: this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike  
                })
            })
            this.forceUpdate()
        }
    }

    render() {
        return(
            <div>


                <div className="img_windowss" style={{display: "flex"}}>
                <div style={{marginTop: "250px"}}>
                    <img onClick={this.hundleLeft} className="btnPushIss tuti8s" src="/iconI/flech.png" alt=""></img>
                </div>
                    <img className="imgCar" src={this.state.imgI}></img>
                    <div className="imgCom">

                        <div style={{marginLeft: '19px', marginTop: '18px',  marginRight: '19px'}}>

                            <div style={{display: "flex"}}>
                                <img src={"/icon/logos.jpg"} className="img-circle imagess" alt="" />
                                <div className="">

                                    <div className="text-marge" style={{marginTop: '6px'}}>
                                        <a style={{color: "#696969"}} className="small">gaule_marvin</a>
                                        <p className="small" style={{marginTop: '4px'}}>Gaule Marvin</p>
                                    </div>
                                    
                                </div>
                            </div>
                            
                            <div className="dividerT"></div>

                                <div style={{display: "flex", marginBottom: "10px"}}>
                                    {this.state.like}
                                    <img src="/iconI/bousole.png" className="img_logoIs" alt=""/>
                                    <img src="/iconI/users.png" className="img_logoIs" style={{marginLeft: "180px"}} alt=""/>
                                </div>

                                <p style={{marginLeft: "8px"}} >
                                    {this.state.nbLike}
                                </p>


                                <div className="dividerTs"></div>

                                <p style={{marginLeft: "8px", color: "rgb(210, 210, 210)"}}>
                                    Ajouter un commentaire...
                                </p>

                        </div>
                    </div>
                    <div style={{marginTop: "250px"}}>
                    <img onClick={this.hundlerigth} className="btnPushIs tuti8" src="/iconI/flech.png" alt=""></img>

                    </div>
                </div>

            </div>
        )

    }

}

export default withRouter(Caroussel)


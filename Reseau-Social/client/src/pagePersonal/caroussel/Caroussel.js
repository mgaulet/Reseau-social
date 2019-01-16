import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'

import './Caroussel.css'
import '../../home/TodoFriends.css'

import Like from "../../home/like/Like"
import NbLike from "../../home/nbLike/NbLike"
import Inputs from "../../home/utils/input"
import Com from "../../home/commentary/Commentary"
import * as CommentaryActions from '../../../flux/actions/CommentaryActions.js'

class Caroussel extends Component {

    state = {
        text: '',
        imgI: '',
        nbImg: -1,
        elem: [],
        like: null,
        nbLike: null,
        input: null,
        com: null,
        // se connecter au todos store, renvoyer la todo puis remplacer this.props.url part l'id
    }

    newComponent = () => {
        let style = {height: "30px", marginTop: "15px", marginBottom: "3px", marginLeft: "15px", marginRight: "15px", width: "275px"}

        if (!this.state.elem[this.props.todos[this.props.urlImg]._id]) {
            this.state.elem[this.props.todos[this.props.urlImg]._id] = {}
            this.state.elem[this.props.todos[this.props.urlImg]._id].like = <Like styleCss={{marginTop: "4px"}} myId={this.props.todos[this.props.urlImg]._id} myLike={this.props.todos[this.props.urlImg].like} idUser={this.props.todos[this.props.urlImg].idUser}/>
            this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike = <NbLike myId={this.props.todos[this.props.urlImg]._id} myLike={this.props.todos[this.props.urlImg].like} idUser={this.props.todos[this.props.urlImg].idUser}/>
            this.state.elem[this.props.todos[this.props.urlImg]._id].input = <Inputs idImg={this.props.todos[this.props.urlImg]._id} idUser={this.props.todos[this.props.urlImg].idUser} styleCom={style}/>
            this.state.elem[this.props.todos[this.props.urlImg]._id].com = <Com com={this.props.todos[this.props.urlImg].commentary} idUser={this.props.todos[this.props.urlImg].idUser} idImg={this.props.todos[this.props.urlImg]._id}/>
        }
    }

    componentDidMount () {
        if (this.props.todos[this.props.urlImg]) {
            this.newComponent()
            this.setState({
                imgI : this.props.todos[this.props.urlImg].url,
                like: null,
                nbLike: null,
                input: null,
                com: null,
            }, () => {
                this.setState({
                    like: this.state.elem[this.props.todos[this.props.urlImg]._id].like,
                    nbLike: this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike,
                    input: this.state.elem[this.props.todos[this.props.urlImg]._id].input,
                    com: this.state.elem[this.props.todos[this.props.urlImg]._id].com,
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
                nbLike: null,
                input: null,
                com: null,
            }, () => {
                this.setState({
                    like: this.state.elem[this.props.todos[this.props.urlImg]._id].like,
                    nbLike: this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike,
                    input: this.state.elem[this.props.todos[this.props.urlImg]._id].input,
                    com: this.state.elem[this.props.todos[this.props.urlImg]._id].com,
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
                nbLike: null,
                input: null,
                com: null,
            }, () => {
                this.setState({
                    like: this.state.elem[this.props.todos[this.props.urlImg]._id].like,
                    nbLike: this.state.elem[this.props.todos[this.props.urlImg]._id].nbLike,
                    input: this.state.elem[this.props.todos[this.props.urlImg]._id].input,
                    com: this.state.elem[this.props.todos[this.props.urlImg]._id].com,
                })
            })
            this.forceUpdate()

        }
    }
    addCom = (e) => {
        CommentaryActions.firstInitCom(e.target.id)
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
                                <img src={"/usersImage/" + JSON.parse(localStorage.getItem('user')).id + "/imgProfil.png"} className="img-circle imagess" alt="" />
                                <div className="">

                                    <div className="text-marge" style={{marginTop: '6px'}}>
                                        <a style={{color: "#696969"}} className="small">{JSON.parse(localStorage.getItem('user')).lastName+"_"+JSON.parse(localStorage.getItem('user')).name}</a>
                                        <p className="small" style={{marginTop: '4px'}}>{JSON.parse(localStorage.getItem('user')).lastName+" "+JSON.parse(localStorage.getItem('user')).name}</p>
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
                                {this.state.input}
                                <p className="textSty" style={{marginLeft: "2.5%", color: "#888888", marginTop: "0px", marginBottom: "5px"}} id={this.props.todos[this.props.urlImg]._id} onClick={this.addCom}>Charger d'autre commentaires</p>
                                
                                <div style={{width: "275px", height: "300px", overflow: "auto"}}>
                                    {this.state.com}
                                </div>
                                <div className="dividerTs"></div>
                                

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


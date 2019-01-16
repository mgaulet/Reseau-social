import React, {Component} from 'react'
import {Button, Icon} from 'element-react'
import './Personal.css'
import NavBar from '../home/Insta'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import TodoImg from './todoImg/TodoImg'
import NewImg from './newImg/NewImg'
import Carousels from './caroussel/Caroussel.js'
import TodoStores from '../../flux/stores/TodoStores.js'
import  * as TodoActions from '../../flux/actions/TodoActions.js'



class Personal extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            lastName: '',
            firstIMG: false,
            imageE: false,
            floot: false,
            imgNewImg: 0,
            urlProfile: JSON.parse(localStorage.getItem('user')).id,
            todos: TodoStores.getAll(),
            dataNow: Date.now()
        }
    }


    getTodo = () => {
        this.setState({
            todos: TodoStores.getAll(),
            // boolTodos: TodoStores.getBool()
        })
    }
    hundlePushTodo = (data) => {
        TodoActions.createTodo(data)
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('user'))


        if (TodoStores.getBool())
            TodoStores.emitChange()

        if (user && user.name && user.lastName)
          this.setState({
            name: user.name,
            lastName: user.lastName
          })
        else
          this.setState({
            name: 'intru',
            lastName: 'intru'
          })


    }



    componentWillMount() {
        let user = JSON.parse(localStorage.getItem('user'))
        let thisS = this

         if (user && user.id && TodoStores.getBool() === false) {
            axios.post('/imageTodo', {
                data: user.id,
                nbImage: 3
              })
              .then(function (data) {
                    TodoActions.boolTodo()
                    thisS.hundlePushTodo(data.data.data)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        TodoStores.on('change', this.getTodo)

    }

    componentWillUnmount() {
        TodoStores.removeListener('change', this.getTodo)
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

      hundleAddTodo = () => {
        let user = JSON.parse(localStorage.getItem('user'))
        let thisS = this

         if (user && user.id) {
             let nbbb = TodoStores.getNbImage()
             
            axios.post('/pushOtherI', {
                data: user.id,
                nbImage: nbbb
              })
              .then(function (data) {
                    TodoStores.pushOtherTodo(data.data.data)
              })
              .catch(function (error) {
                console.log(error);
              });
        }
      } 



  hundleStateProfile = () => {
        this.setState({
            urlProfile: this.state.urlProfile,
            dataNow: Date.now()
        })
  }

    // ######################### RENDER () #########################
    // ######################### RENDER () #########################

    render () {
    const styleBTN = {  border: "1px solid #dbdbdb",
                        background: "#f5f5f5",
                        padding: "8px 15px",
                        fontSize: '15px',
                        fontWeight: 400,
    }
    let imageE = this.state.imageE ? (<div onClick={this.escFlootHundle}  className='imageFontShadow'></div>) : (<div></div>)
    let FirstIMG = this.state.firstIMG ? (<NewImg urlImgProfile={this.hundleStateProfile} urlImg={(this.state.imgNewImg)} deleteI={this.escFlootHundle}/>)  : (<div></div>)
    let Carousel = this.state.floot ? (<Carousels urlImg={parseInt(this.state.imgNewImg)} todos={this.state.todos} deleteI={this.escFlootHundle}/>)  : (<div></div>)
    let user = JSON.parse(localStorage.getItem('user'))

        return (
            <div>
                {imageE}
                {FirstIMG}
                {Carousel}
                <div>
                    
                        <NavBar/>
                    <div className='containerP'>

                            <div className="frtt firstDIV">
                                <div className="frtt tjbn4">

                                    <img src={`/usersImage/${this.state.urlProfile}/imgProfil.png?${this.state.dataNow}`} className="imageP" alt=""/>

                                    <div className="fCircle">
                                    </div>

                                    <div style={{marginLeft: "100px"}}>
                                        <div className="frtt">
                                            <div className='fontP '><p>{(this.state.lastName+this.state.name).toLowerCase()}</p></div>
                                            <div className='btnnt '><Button style={styleBTN}>Modifer le profil</Button></div>
                                        </div>

                                        <div className='frtt topBkgl'>
                                            <div className='pubAbAb'><p><span className='numFT'>22</span> publications </p></div>
                                            <div className='pubAbAb'> <p><span className='numFT'>30</span>  abonnés</p></div>
                                            <div className='pubAbAb'><p><span className='numFT'>84</span>  abonnements</p></div>
                                        </div>

                                        <div className='frtt topBkgl'>
                                            <span className='nameSur'>{this.state.name+' '+this.state.lastName}</span>
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

export default withRouter(Personal)
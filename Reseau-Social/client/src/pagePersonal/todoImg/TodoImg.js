import React, {Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import '../Personal.css'
import './TodoImg.css'
import { Icon } from 'semantic-ui-react'

import Like from "../../home/like/Like"
import NbLike from "../../home/nbLike/NbLike"

import TodoStores from '../../../flux/stores/TodoStores.js'
import  * as TodoActions from '../../../flux/actions/TodoActions.js'


class TodoImg extends Component {

    state = {
        selectedFile: 0,
        imageT:  [],
        newImage: null,
        gtt: 'alex',
        oHund: true,
        todos: [...TodoStores.getAll()],
        imgProfil: false
    }


    getTodo = () => {

        this.setState({
            todos: []
        }, () => {
            this.hundleSorting()
            this.setState({
                todos: [...TodoStores.getAll()]
            }, ()=> {
                this.hundleSorting()
            })
        })




    }
    
    componentWillMount() {

        TodoStores.on('change', this.getTodo)
        TodoStores.listenerCount('change')
    }

    componentWillUnmount() {
        TodoStores.removeListener('change', this.getTodo)
    }


    hundlePushTodo = (data) => {
        TodoActions.createTodo(data)
    }


    uploadHandler = (nameR) => {
        const formData = new FormData()
        let user = JSON.parse(localStorage.getItem('user'))
        formData.append('file', this.state.selectedFile, nameR + ' ' + user.id)
        formData.append('idAlex', "foflof")
        // formData.append('marvin', "gaulet xandre");
        let config = {
            onUploadProgress: progressEvent => {
                console.log("Upload ", Math.round(progressEvent.loaded / progressEvent.total * 100), "%")
            },
            headers: {
              'accept': 'application/json',
              "Content-Type": "multipart/form-data"}
            }
          axios.post('/upload', formData, config)
          .then(response => {
            this.setState({
                oHund: false
            }, ()=> {
                this.setState({
                    oHund: true,
                })     
            })
            this.messageHundle(`${user.id}/`+response.data.file.originalname)
        })
        .catch(errors => console.log(errors));
    }

    messageHundle = (rt) => {
        this.setState({
            selectedFile: 0
        },()=> {
            this.props.floot(rt)})
    }
    
    oHundle = (e) => {
        // console.log(e);
    }


    hundleDeleteI = (ent) => {
        let user = JSON.parse(localStorage.getItem('user'))
        let thisS = this

        if (user && user.id) {
           axios.post('/deleteImage', {
               data: [user.id, ent.target.id],
             })
             .then(function (data) {
               if (data.data.err) console.log(err);
               else TodoActions.deleteTodo(data.data.id)
             })
             .catch(function (error) {
               console.log(error);
             });
       }

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
                            <img src={this.state.todos[index.index].url} className="imageI" alt=""/>
                            <div id={index.index} onDoubleClickCapture={this.hundleZoom} className="overlay">
                            </div>
                                <div id={index.index}  className="flex" style={{position: "absolute", top: "10px"}}>
                                    <Like col={"#fff"} myId={this.state.todos[index.index]._id} myLike={this.state.todos[index.index].like} idUser={this.state.todos[index.index].idUser}/>
                                    <NbLike styleCss={{color: "#fff"}} myId={this.state.todos[index.index]._id} myLike={this.state.todos[index.index].like} idUser={this.state.todos[index.index].idUser}/>
                                    <Icon onClick={this.hundleDeleteI} id={this.state.todos[index.index]._id} style={{fontWeight: "100", color: "#fff", marginLeft: "30px", marginTop: "-3px"}} name='trash' size='big'/>
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

    // tab2.push(tab)
    this.setState({
        imageT: tab
    })
}

    hundlePROFILE = () => {
        this.state.imgProfil = true
    }

    fileSelectHandler = (event) => {
        
        if (event.target.files[0].type.split("/")[0] !== "image" ) {
            this.open8()
            return
        }
        let image = event.target.files[0]
        let words = "." + image.name.split(".").pop();


        this.setState({
            selectedFile: image
        },()=> {
            this.uploadHandler("tmp" + words)
        })
    }
    
    hundlePROFILE = () => {
        TodoActions.ChangeImgProfile(true)
    }
    hundleProfileFalse = () => {
        TodoActions.ChangeImgProfile(false)

    }

    render(){
        let oHundle = this.state.oHund ? (<input id="file" className="input-file" type="file" onChange={ this.fileSelectHandler }></input>) : (<div> </div>)

        return (
            <div style={{marginTop: "-45px"}}>
                <div>
                    <label htmlFor="file" className="">
                        <img src='/icon/blanc.jpeg' onClickCapture ={this.hundlePROFILE} className='imageProfil' name={'upload'} ></img>
                    </label>
                    {oHundle}
                </div>

                <div className='dwDIV2'>

                    <hr className='_5mToa'/>
                    <div className="frtt">
                    <h5 className='' style={{marginTop: '6px', marginLeft: '44%', letterSpacing: '3px'}}>PHOTOS</h5>
                        <label htmlFor="file" className="label-files">
                            <ul className="icon-list" onClickCapture={ this.hundleProfileFalse}>
                                    <li><span><Icon style={{marginTop: "3.5px", fontWeight: "100", color: "#263238"}} name='cloudversify' size='large'/></span></li>
                            </ul>
                        </label>
                        {oHundle}
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







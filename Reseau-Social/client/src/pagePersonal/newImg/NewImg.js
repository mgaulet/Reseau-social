import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import path from 'path'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import './NewImg.css'
import axios from 'axios'
import {Button, Icon} from 'element-react'


import TodoStores from '../../../flux/stores/TodoStores.js'
import  * as TodoActions from '../../../flux/actions/TodoActions.js'


import io from 'socket.io-client';
import ip from '../../../ipMachine'

const socket = io(ip);
// const socket = io('http://192.168.0.16:8080');


class NewImg extends Component {

    state = {
        text: '',
    }
    
    yoyoyo = () => {
    }

    _crop(e){
        e.preventDefault()
         this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
            let user = JSON.parse(localStorage.getItem('user'))
            const formData = new FormData();
            // chercher son blase dans mongoose
            
            if (TodoStores.getImgProfile()) {
                formData.append('file', blob, 'imgProfil.png' + ' ' + user.id)
                let config = {
                    headers: {
                    'accept': 'application/json',
                    "Content-Type": "multipart/form-data"}
                }
                axios.post('/upload', formData, config)
                .then(response => {
                    this.props.deleteI()   // efface l affichage
                    this.props.urlImgProfile()
                })
                .catch(errors => console.log(errors));
            }
            else
                socket.emit('searchName', user.id, this.state.text, (objImage, err) => {
                    if (err) throw console.log(err);
                    else {
                        formData.append('file', blob, objImage._id + objImage.type + ' ' + user.id)
                        let config = {
                            headers: {
                            'accept': 'application/json',
                            "Content-Type": "multipart/form-data"}
                        }
                        axios.post('/upload', formData, config)
                        .then(response => {
                            TodoActions.addTodo(objImage)
                            this.props.deleteI()   // efface l affichage
                        })
                        .catch(errors => console.log(errors));
                    }   
                })
         })

      }

    
      hundleInputText = (e) => {
          e.preventDefault()
          let val = e.target.value

          if (val.length < 75)
            this.setState({
                text: val
            })
      }

    render() {
        return(
            <div>
                <div className='img_window'>
                    <form onSubmit={this.yoyoyo} className="row img_wiwi">
                        <Cropper
                            ref='cropper'
                            src={'/usersImage/' + this.props.urlImg}
                            style={{height: 500, width: 500, marginTop: '10px'}}
                            aspectRatio={16 / 16}
                            guides={false}
                            />
                            <div style={{display: "flex"}}>
                            <form className="input-field col s12" onSubmit={this._crop.bind(this)}>
                                    <input onChange={this.hundleInputText} value={this.state.text}/>
                            </form>
                                <div style={{marginTop: "10px", marginRight: "5px"}}>
                                    <Button plain={true} onClick={this._crop.bind(this)} type="info">Send</Button>
                                </div>
                            </div>
                    </form>
                </div>

            </div>
        )

    }

}

export default withRouter(NewImg)






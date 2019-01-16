import React, {Component} from 'react';

import axios from 'axios'

class Inputs extends Component {

  state = {
    textMsg: '',
  }

  hundleTextMsg = (e) => {
    this.setState({
        textMsg: e.target.value
    })
}



    btnAdd = (e) => {
        e.preventDefault()
        let str = this.state.textMsg
        if (0 !== str.replace(/ /g, '').length)
            axios.post('/inputCommentary',{
                idImg: this.props.idImg,
                myId: JSON.parse(localStorage.getItem('user')).id,
                idUserImg: this.props.idUser,
                text: {
                    id: JSON.parse(localStorage.getItem('user')).id,
                    name: JSON.parse(localStorage.getItem('user')).name,
                    lastName: JSON.parse(localStorage.getItem('user')).lastName,
                    content: str,
                }
            })
            .then(elem => {
            })
            .catch(err => {
            })
        this.setState({
            textMsg: ''
        })
    }

    render() {
      return (
        <form onSubmit={this.btnAdd}>
            <input value={this.state.textMsg} onChange={this.hundleTextMsg} style={this.props.styleCom}></input>
        </form>
      )
    }
}

export default Inputs;

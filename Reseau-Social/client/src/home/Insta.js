import React, { Component } from 'react';
import './Insta.css'
import { Link, NavLink, withRouter } from 'react-router-dom'
import BarRecherche from './BarRecherche'
import {Dropdown, Transition, Button, Icon} from "semantic-ui-react";

import * as NotifActions from '../../flux/actions/NotifActions.js'
import NotifStores from '../../flux/stores/NotifStores.js'

import axios from 'axios'

class Insta extends Component {

  state = {
    tagOptions: NotifStores.getNotifs()
  }
  
  getNotif = () => {
    this.setState({
      tagOptions: NotifStores.getNotifs()
    })
  }

  componentDidMount () {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.id && NotifStores.getFirstConnect()) {

      axios.post('/getNotifs', {
        myId: user.id,
      })
      .then(function (data) {
        if (data.data.err) ;
        else {
          NotifActions.pushAllNotif(data.data.data)
        }
      })
      .catch(function (error) {
      });
    }

    NotifStores.on('pushNotif', this.getNotif)
  }

  componentWillUnmount () {
    NotifStores.removeListener('pushNotif', this.getNotif)
  }
  
  hundleDeco = () => {
    window.location.reload();
    localStorage.clear('user')
    this.props.history.push('/')
  }

  render() {

    return (
      <div className="flex-container">
        <div className="col">
            <div className="col marginL">
              <a><Link to='/home'><img src="/iconI/iconIsta.png" className="img_logo" alt=""/></Link></a>

              <a><Link to='/home'><div className="SvO5t"></div></Link></a>

              <a><Link to='/home'><img src="/iconI/instag.png" className="imgIns" alt=""/></Link></a>


            </div>

            <div style={{marginLeft: "14%", marginTop: "-67px"}}>
                <BarRecherche size="small"/>
            </div>

          <div className="col marginR">
            <a><Link to='/user'><img src="/iconI/bousole.png" className="img_logoI" alt=""/></Link></a>
            
            <Dropdown text={<img src="/iconI/coeur.png" className="img_logoI" style={{marginTop: '23px', marginRight: "-31px"}} alt=""/>}  icon=''>
                <Dropdown.Menu style={{marginTop: '10px', marginLeft: '-180px', }}>
                <Dropdown.Menu scrolling>
                    {this.state.tagOptions.map(option => <Dropdown.Item key={option.value} {...option} />)}
                </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
            <a><Link to='/user'><img src="/iconI/users.png" className="img_logoI"  alt=""/></Link></a>
            <i onClick={this.hundleDeco} className="material-icons">exit_to_app</i>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Insta)
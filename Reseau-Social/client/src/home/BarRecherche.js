import React, { Component } from 'react'
import { AutoComplete } from 'element-react';
import { Link, NavLink, withRouter } from 'react-router-dom'

import  * as FriendsActions from '../../flux/actions/FriendsActions.js'


import axios from 'axios'

import '../pagePersonal/caroussel/Caroussel.css'
import './TodoFriends.css'
import './BarRecherche.css'

class BarRecherche extends Component {
        constructor(props) {
            super(props);
          
            this.state = {
              restaurants: [
                { "value": "vue", "address": "https://github.com/vuejs/vue" },
                { "value": "element", "address": "https://github.com/ElemeFE/element" },
                { "value": "cooking", "address": "https://github.com/ElemeFE/cooking" },
                { "value": "mint-ui", "address": "https://github.com/ElemeFE/mint-ui" },
                { "value": "vuex", "address": "https://github.com/vuejs/vuex" },
                { "value": "vue-router", "address": "https://github.com/vuejs/vue-router" },
                { "value": "babel", "address": "https://github.com/babel/babel" }
              ],
              value: '',
              todosF: [],
            }
          }

          hundleDeleteFriends = (e) => {
            
            FriendsActions.deleteTodo()

            axios.post('/imageFriend2', {
              data: e.target.id,
              nbImage: 3,
              myId: JSON.parse(localStorage.getItem('user')).id,
            })
            .then(function (data) {
              if (data.data.err) {
              } else {
                FriendsActions.createFriend(data.data.friend)
                FriendsActions.createTodo(data.data.data)
            }
            })
            .catch(function (error) {
              console.log(error);
            });

          }

          componentWillMount() {
            axios.post("/getUsers")
            .then((res) => {
              if (res.err)
                console.log(res.err)
              else
                this.setState({
                  todosF: res.data.todos
                })
            })
          }

          querySearch(queryString, cb) {
            let tab = [{}]
            const { todosF } = this.state;
            let results = queryString ? todosF.filter(this.createFilter(queryString)) : todosF;
            results.forEach((res) => {
              tab.push({value:
                <div>
                <div style={{display: "flex"}}>
                    <img src={`/usersImage/${res._id}/imgProfil.png`} className="img-circle imagesstx" alt="" />
                    <div className="">

                      <div  className="text-marge" style={{marginTop: '0px', marginLeft: '4px'}}>
                      <Link to={'/friend/'+res._id}><a  style={{color: "#696969"}} className="small"><a id={res._id} onClick={this.hundleDeleteFriends}>{res.name}</a></a></Link>

                        <p className="small" style={{marginTop: '-5px'}}>{res.lastName}</p>
                      </div>
                      
                    </div>
                  </div>
                  <div className="dividersssst"></div>
                  </div>
              })
          })
            cb(tab);
          }
          
          createFilter(queryString) {
            return (todosF) => {
              return (todosF.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          }
          
          handleSelect(item) {
          
          }
          
          render() {
            return (
              <AutoComplete
                className=""
                icon=""
                placeholder="Please input"
                value={this.state.value}
                fetchSuggestions={this.querySearch.bind(this)}
                customItem={this.props.customItem}
                onSelect={this.handleSelect.bind(this)}
              ></AutoComplete>
         )
    }
}

export default withRouter(BarRecherche);



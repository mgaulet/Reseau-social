import React, { Component } from 'react';
import './customers.css';
import io from 'socket.io-client';
import ip from '../../ipMachine'

const socket = io(ip);

class Customers extends Component {
 
  state = {
    id: 4,
    customers: []
  };


  handleClick = () => {
    socket.emit('un', (tab) => { 
      let custom = this.state.customers

      if (tab) {
        custom.push(tab)

        this.setState({
          customers:  custom
        })

      }      
    })
  }

  render() {
    return (
      <div>
        <h2>Customers</h2>
        <ul>
        {this.state.customers.map(customer => 
          <li key={1}>{customer.name} {customer.lastName} {customer.email}</li>
        )}
        </ul>
        <button onClick={this.handleClick}>envoi</button>
      </div>
    );
  }
}

export default Customers;

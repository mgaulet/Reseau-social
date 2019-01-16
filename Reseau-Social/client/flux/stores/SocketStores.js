import {EventEmitter} from 'events'
import dispatcher from "../../dispatcher/dispatcherSocket"
import io from 'socket.io-client';
import ip from '../../ipMachine'

let addSocket = () => {
    return io(ip);
}

class SocketStores extends EventEmitter {
    socket = addSocket()

    oneConnection = (tab) => {
        this.socket.emit('login', tab, (boolErr) => {
            if (boolErr) {}
            else {
            }
        })
    }


    getSocketIo = () => {
        return this.socket
    }
   
   
   hundleAction = (action) => {
        if (action.type === "CREATE_TODO") {
            this.pushTodo(action.text)
        }
        else if (action.type === "SOCKETIO_CREATE") {
            this.oneConnection(action.tab)
        }
   }
}

const socketStores = new SocketStores
dispatcher.register(socketStores.hundleAction)
window.dispatcher = dispatcher
export default socketStores
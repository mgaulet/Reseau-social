import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/dispatcherFriends'


class TodoStores extends EventEmitter {
    todos = []
    boolTodos = false
    infoFriend = {name: 'inconu', lastName: 'inconu', email: 'inconu@gmail.com', _id: "293db3db"}

   nbImage = 3
   getBool = () => {
    return this.boolTodos
   }


   createFriend = (data) => {
       this.infoFriend = data
   }

   getFriend = () => {
       return this.infoFriend
   }




   getNbImage = () => {
       let nbh = this.nbImage
       this.nbImage += 3
       
       return nbh
   }
   moveBool = () => {
       this.boolTodos = true
   }

   emitChange = () => {
    this.emit('change')
   }
   pushTodo = (data) => {
        this.todos = data        // changer pour l image
        this.emit('change')
   }

   pushOtherTodo = (data) => {
        this.todos = [...this.todos, ...data]       // changer pour l image
        this.emit('change')
    }

   addTodo = (data) => {
        this.todos = [data, ...this.todos]
        this.nbImage += 1
        
        this.emit('change')
    }
   getAll = () => {
       return this.todos
   }

   deleteAll = () => {
       this.nbImage = 3
       this.todos = []
       this.emit('change')
   }

   hundleAction = (action) => {
        if (action.type === "CREATE_TODO") {
            this.pushTodo(action.text)
        }
        else if (action.type === "CREATE_FRIEND") {
            this.createFriend(action.data)
        }
        else if (action.type === "GET_FRIEND") {
            this.getFriend()
        }
        else if (action.type === "ADD_TODO") {
            this.addTodo(action.data)
        }
        else if (action.type === "BOOLT_TODO") {
            this.moveBool()
        }
        else if (action.type === "DELETEALL_FRIENDS") {
            this.deleteAll()
        }
        else if (action.type ===  "GET_TODO") {
            console.log('je c pas');
        }
   }
}

const todoStores = new TodoStores
dispatcher.register(todoStores.hundleAction)
window.dispatcher = dispatcher
export default todoStores
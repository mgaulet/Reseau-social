import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/dispatcher'

class TodoStores extends EventEmitter {
   todos = []
   boolTodos = false
   nbImage = 3
    boolProfile = false

    changeImgProfile = (data) => {
        this.boolProfile = data
    }
    getImgProfile = () => {
        return this.boolProfile
    }
   getBool = () => {
    return this.boolTodos
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
   deleteOneTodo = (id) => {
        this.nbImage -= 1
        let tab = this.todos
        this.todos = tab.filter(word => word._id != id);
        this.emit('change')
   }

   
   
   hundleAction = (action) => {
        if (action.type === "CREATE_TODO") {
            this.pushTodo(action.text)
        }
        else if (action.type === "IMGPROFILE_GET") {
            this.getImgProfile()
        }
        else if (action.type === "IMGPROFILE_CHANGE") {
            this.changeImgProfile(action.data)
        }
        else if (action.type === "ADD_TODO") {
            this.addTodo(action.data)
        }
        else if (action.type === "BOOLT_TODO") {
            this.moveBool()
        }
        else if (action.type === "DELETE_TODO") {
            this.deleteOneTodo(action.id)
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
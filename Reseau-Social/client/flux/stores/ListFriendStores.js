import {EventEmitter} from 'events'
import dispatcher from '../../dispatcher/dispatcherListFriends'


class ListFriends extends EventEmitter {
    todosFollower = [
    // [
    //     {
    //         "id": "08sf08a0sd98f",
    //         "name": "inconu",
    //         "lastName": "inconu",
    //     }
    // ]
    ]

    todosFollowed = [
        // [
        //     {
        //         "id": "08sf08a0sd98f",
        //         "name": "inconu",
        //         "lastName": "inconu",
        //     }
        // ]
        ]
    getFollowed = () => {
        return this.todosFollowed
    }
    
    getStatus = (id) => {
        let objTab = this.todosFollowed.find((element) => element.id === id)
        if (objTab && objTab.id === id)
            return 'Se Desabonner'
        else
            return "S'abonner"

    }


    getFriend = () => {
        let newtab = this.todosFollowed

        this.todosFollower.forEach((tb) => {
            if (!newtab.find((element) => element.id === tb.id))
            newtab = [...newtab, tb]
        })
        return newtab
    }

    createTodos(data) {
        this.todosFollower = data.follower
        this.todosFollowed = data.followed
        this.emit('firstIn')
    }

    pushFollower(data) {

        this.todosFollower = [...this.todosFollower, data]
        this.emit('firstIn')
    }

    pushFollowed(data) {
        this.todosFollowed = [...this.todosFollowed, data]
        
        this.emit('firstIn')
    }

    deleteFollowed(id) {
        this.todosFollowed = this.todosFollowed.filter(obj => obj.id !== id)
        this.emit('firstIn')
    }
    
    deleteFollower(id) {
        this.todosFollower = this.todosFollower.filter(obj => obj.id !== id)

        this.emit('firstIn')
    }

   hundleAction = (action) => {
        if (action.type === "CREATE_TODO") {
            this.createTodos(action.data)
        } else if (action.type === "PUSH_FOLLOWER") {
            this.pushFollower(action.data)
        } else if (action.type === "PUSH_FOLLOWED") {
            this.pushFollowed(action.data)
        } else if (action.type === "DELETE_FOLLOWED") {
            this.deleteFollowed(action.id)
        } else if (action.type === "DELETE_FOLLOWER") {
            this.deleteFollower(action.id)
        }
   }
}

const listFriends = new ListFriends
dispatcher.register(listFriends.hundleAction)
window.dispatcher = dispatcher
export default listFriends
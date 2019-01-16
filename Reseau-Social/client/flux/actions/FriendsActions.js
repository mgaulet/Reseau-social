import dispatcher from "../../dispatcher/dispatcherFriends"

    export function createTodo(text) {
        dispatcher.dispatch({
            type: "CREATE_TODO",
            text,
        })
    }

    export function createFriend(data) {
        dispatcher.dispatch({
            type: "CREATE_FRIEND",
            data,
        })
    }
    
    export function getFriend() {
        dispatcher.dispatch({
            type: "GET_FRIEND",
        })
    }



    export function addTodo(data) {
        dispatcher.dispatch({
            type: "ADD_TODO",
            data,
        })
    }

    export function boolTodo() {
        dispatcher.dispatch({
            type: "BOOLT_TODO",
        })
    }

    export function deleteTodo() {
        dispatcher.dispatch({
            type: "DELETEALL_FRIENDS",
        })
    }

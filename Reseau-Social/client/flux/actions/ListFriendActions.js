import dispatcher from "../../dispatcher/dispatcherListFriends"

    export function createTodo(data) {
        dispatcher.dispatch({
            type: "CREATE_TODO",
            data,
        })
    }

    export function pushFollower(data) {
        dispatcher.dispatch({
            type: "PUSH_FOLLOWER",
            data
        })
    }

    export function deleteFollowed(id) {
        dispatcher.dispatch({
            type: "DELETE_FOLLOWED",
            id
        })
    }

    export function deleteFollower(id) {
        dispatcher.dispatch({
            type: "DELETE_FOLLOWER",
            id
        })
    }

    export function pushFollowed(data) {
        dispatcher.dispatch({
            type: "PUSH_FOLLOWED",
            data
        })
    }
import dispatcher from "../../dispatcher/dispatcher.js"

export function createTodo(text) {
        dispatcher.dispatch({
            type: "CREATE_TODO",
            text,
        })
    }

    export function addTodo(data) {
        dispatcher.dispatch({
            type: "ADD_TODO",
            data,
        })
    }
    






    export function ChangeImgProfile(data) {
        dispatcher.dispatch({
            type: "IMGPROFILE_CHANGE",
            data
        })
    }
    export function getImgProfile() {
        dispatcher.dispatch({
            type: "IMGPROFILE_GET",
        })
    }


    export function boolTodo() {
        dispatcher.dispatch({
            type: "BOOLT_TODO",
        })
    }

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: "DELETE_TODO",
        id,
    })
}


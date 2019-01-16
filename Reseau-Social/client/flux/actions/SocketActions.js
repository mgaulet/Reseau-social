import dispatcher from "../../dispatcher/dispatcherSocket"

export function createSocketIo(tab) {
    dispatcher.dispatch({
        type: "SOCKETIO_CREATE",
        tab,
    })
}

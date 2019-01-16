import dispatcher from "../../dispatcher/dispatcherMsg"

export function pushMsg(text, idF) {
    dispatcher.dispatch({
        type: "MSG_PUSH",
        text,
        idF,
    })
}
export function pushMsgFront(text, idF) {
    dispatcher.dispatch({
        type: "MSGFRONT_PUSH",
        text,
        idF,
    })
}


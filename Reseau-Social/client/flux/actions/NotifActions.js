import dispatcher from "../../dispatcher/dispatcherNotif"

export function pushAllNotif(tab) {
    dispatcher.dispatch({
        type: "NOTIF_INITALL",
        tab,
    })
}


export function ValideOrNot(idFriend) {
    dispatcher.dispatch({
        type: "NOTIF_VALNOT",
        idFriend,
    })
}

export function pushNotif(notif) {
    dispatcher.dispatch({
        type: "NOTIF_PUSH",
        notif,
    })
}

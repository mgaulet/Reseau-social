import dispatcher from "../../dispatcher/dispatcherActus"



export function firstpushImg(tab) {
    dispatcher.dispatch({
        type: "FIRSTPUSHIMG_ACTUS",
        tab,
    })
}

export function deleteImg(idImg) {
    dispatcher.dispatch({
        type: "DELETEIMG_ACTUS",
        idImg,
    })
}
export function liveActuImg(tab) {
    dispatcher.dispatch({
        type: "LIVEIMG_ACTUS",
        tab,
    })
}


import dispatcher from "../../dispatcher/dispatcherLike"



export function firstpushImg(div, idImg) {
    dispatcher.dispatch({
        type: "STATUSLIKE_LIKE",
        div,
        idImg
    })
}


export function initDiv(idImg, div) {
    dispatcher.dispatch({
        type: "INITDIV_LIKE",
        idImg,
        div,
    })
}

export function firstInitLike(idImg ,myLike) {
    dispatcher.dispatch({
        type: "FIRSTINIT_LIKE",
        idImg,
        myLike
    })
}


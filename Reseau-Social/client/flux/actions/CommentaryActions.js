import dispatcher from "../../dispatcher/dispatcherCommentary"


export function firstInitCom(idImg ,myCom) {
    dispatcher.dispatch({
        type: "FIRSTINIT_COM",
        idImg,
        myCom
    })
}
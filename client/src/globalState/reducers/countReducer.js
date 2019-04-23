const initialState ={
    lang : ""
}

export default function reducer (state = initialState, action){
    switch(action.type){

     case "SWITCHtoENG":
    return {
        lang:"ENG"
    }   
    case "SWITCHtoAR":
    return {
        lang:"AR"
    } 
    default: 
    return state
    }
    
   
}
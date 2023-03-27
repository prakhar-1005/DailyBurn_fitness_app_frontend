import {createContext, useReducer} from 'react'
export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return {workouts:action.payload}
        
        case 'CREATE_WORKOUTS':
            return {workouts: [action.payload,...state.workouts]}  // to keep the new workout at the top

        case 'DELETE_WORKOUT':
            return {workouts: state.workouts.filter((w)=> w._id!==action.payload._id)} //removes the workout where the condition becomes false

        default: return state
    }
}

export const WorkoutsContextProvider = ({children})=>{  // destructuring the children property from the props which represents all the components that are wrapped by this component 
   
    const [state, dispatch]=useReducer(workoutsReducer,{workouts:null})

   
    return(
        <WorkoutsContext.Provider value={{...state,dispatch}}>    {/* ...state spreads the workouts here*/}
            {children}
        </WorkoutsContext.Provider>
    )
}
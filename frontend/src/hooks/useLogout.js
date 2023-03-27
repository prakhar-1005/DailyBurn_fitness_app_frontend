import { useAuthContext } from "./useAuthContext";
import {useWorkoutsContext} from './useWorkoutsContext'
export const useLogout =()=>{

    const {dispatch} = useAuthContext()
    const {dispatch : workoutsDispatch} = useWorkoutsContext()
    const logout = ()=>{

        // clear the data from the localStorage
        localStorage.removeItem('user')

        // Set the AuthContext to null
        dispatch({type:'LOGOUT'})   
        workoutsDispatch({type:'SET_WORKOUTS', payload:null})
    }

    return {logout}

}
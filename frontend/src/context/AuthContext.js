import { createContext,useEffect,useReducer } from "react";

export const AuthContext = createContext();

export const authReducer =(state,action)=>{

    switch(action.type){    // there will only be 2 cases:- first is "LOGIN" case which happens during login & also signup of user and other is "LOGOUT" that happens during the logout
        
        case 'LOGIN':     // Valid for both login and signup
            return {user:action.payload}

        case 'LOGOUT':
            return {user:null}

        default: 
            return state
    }
}

export const AuthContextProvider = ({children})=>{

    const [state,dispatch] = useReducer(authReducer,{user:null})

    // prevents the user to log in again  when the page is reloded but token is still there in the localStorage
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if(user){
            dispatch({type:'LOGIN',payload:user})
        }

    },[])

    console.log('Authcontext state' , state);

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
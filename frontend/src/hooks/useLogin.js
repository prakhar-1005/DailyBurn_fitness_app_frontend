import {useState} from 'react'
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{
    const [error ,setError] = useState(null)
    const [loading ,setLoading] = useState(null)

    const {dispatch} = useAuthContext();

    const login = async (email,password)=>{

        setError(null)
        setLoading(null)

        const response = await fetch('https://dailyburnfitnessappbackend-production.up.railway.app/api/user/login',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})  // converts the object into a json string
        })

        const json = await response.json();  // extracts the json body content

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }

        if(response.ok){

            // store the token in the localstorage
            localStorage.setItem('user' , JSON.stringify(json))

            // update the context
            dispatch({type:'LOGIN', payload:json})

            setLoading(false)  /* used to disable the login button when the request is going on (i.e. loading is true) so that another request can't be send */
        }
    }
    
    return {login,error,loading}  // return so that it can be used from the hook
}
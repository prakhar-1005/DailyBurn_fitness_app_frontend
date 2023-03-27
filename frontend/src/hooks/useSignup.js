import {useState} from 'react'
import { useAuthContext } from "./useAuthContext";

export const useSignup = ()=>{
    const [error ,setError] = useState(null)
    const [loading ,setLoading] = useState(null)

    const {dispatch} = useAuthContext()

    const signup = async(email,password)=>{

        setError(null)
        setLoading(null)
        
        const response = await fetch('https://dailyburnfitnessappbackend-production.up.railway.app/api/user/signup',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})  // converts the object into a json string
        })
        const json =await response.json()   // extracts the json body content

        if(!response.ok){
            setLoading(false)
            setError(json.error)

        } 
        if(response.ok) {

            // storing the json token to local storage
            localStorage.setItem('user' , JSON.stringify(json)) // converting it back to a json string as only strings can be stored in the loclaStorage 
            
            //update the auth context
            dispatch({type:'LOGIN', payload: json} )

            setLoading(false) /* used to disable the signup button when the request is going on (i.e. loading is true) so that another request can't be send */
        }
    }

    return {signup,loading,error}   // return so that it can be used from the hook

}
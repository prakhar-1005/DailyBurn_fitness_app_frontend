import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {

    const {workouts,dispatch}= useWorkoutsContext()

    const {user} = useAuthContext();

    // fetch the workouts when user logs in 
    useEffect(()=>{
        const fetchWorkouts = async ()=>{
            const response = await fetch('https://dailyburnfitnessappbackend-production.up.railway.app/api/workouts',{    // response will be json format data
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })   
            const json = await response.json()  // json(variable) will be be an array of objects as response is parsed 
            // console.log(Array.isArray(json));
            if(response.ok){
                // setWorkouts(json)
                dispatch({type:'SET_WORKOUTS', payload:json})
            }
        }

        if(user){
            fetchWorkouts();  // calling the function if user exists
        }

    },[dispatch,user])

  return (
    <div className='home'>
        <div className="workouts">
            {workouts && workouts.map((workout)=>(  // parenthesis as we are returning a template
                <WorkoutDetails key={workout._id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
  )
}

export default Home

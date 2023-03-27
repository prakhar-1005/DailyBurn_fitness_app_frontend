import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from "../hooks/useAuthContext";


const WorkoutForm = () => {

    const {user} = useAuthContext();
    const {dispatch} = useWorkoutsContext()

    const [title,setTitle] =useState("")
    const [reps,setReps] =useState("")
    const [load,setLoad] =useState("")
    const [error,setError] =useState(null)
    const [emptyFields,setEmptyFields] =useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!user){
          setError('You must be logged in')
          return
        }
        
        const workout = {title,load,reps}

        const response = await fetch("https://dailyburnfitnessappbackend-production.up.railway.app/api/workouts", {
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        if(response.ok){
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields([])
            console.log('Workout Added',json);
            dispatch({type:'CREATE_WORKOUTS', payload:json})
        }
    }

  return (
    <div>
      <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <label>Title:</label>
        <input type="text" className={emptyFields.includes('title') ? 'error' : ''} onChange={(e)=>setTitle(e.target.value)} value={title} />

        <label>Load (in Kg):</label>
        <input type="text" className={emptyFields.includes('load') ? 'error' : ''} onChange={(e)=>setLoad(e.target.value)} value={load} />

        <label>Reps:</label>
        <input type="text" className={emptyFields.includes('reps') ? 'error' : ''} onChange={(e)=>setReps(e.target.value)} value={reps} />

        <button>Add Workout</button>
        {error && <div className='error'> {error}</div>}
      </form>
    </div>
  )
}

export default WorkoutForm

import React, { useState } from 'react'

const useForm = (Validate) => {

 const [value,setValue] = useState({

  username:"",
  email:"",
  password:"",
  confirmpassword:"",

 })

 const [Errors,setErrors] = useState({})


 const handleChange = (e) => {
   const {name,value} = e.target


   setValue((prevValue)=>{
    return{
     ...prevValue,
     [name]:value
    }
   })
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  setErrors(Validate(value))
 }

 // setErrors(Validate(value))

 

 


  return {handleChange,value,handleSubmit,Errors}

  
}

export default useForm
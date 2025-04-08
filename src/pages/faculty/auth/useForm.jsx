import React, { useState } from 'react'

const useForm = (Validate) => {


 const [value,setValue] = useState({
  email:"",
  password:"",
  confirmPassword:"",

 })

 const [Errors,setErrors] = useState({})

  const handleChange = (e) => {
    // console.log(e.target.value, e.target.name)
    const {name,value} = e.target



    setValue((prevValue)=>{
     return{
      ...prevValue,
      [name]:value
     }
    })
  }


  const handleSubmit=(e)=>{
   e.preventDefault()

   setErrors(Validate(value))


  }




  return {handleChange,value,handleSubmit,Errors}
}

export default useForm
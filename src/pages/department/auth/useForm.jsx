import React from 'react'

const useForm = (Validate) => {

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [Errors, setErrors] = React.useState({})


  const handleChange=(e)=>{

   const{name,value} = e.target


   setValue((preValue)=>{
    return {
      ...preValue,
      [name]:value
    }
   })

   


   }

   const handleSubmit = (e) => {
     e.preventDefault()

     setErrors(Validate(value))
   }




  return{handleChange,value,handleSubmit,Errors}
}

export default useForm
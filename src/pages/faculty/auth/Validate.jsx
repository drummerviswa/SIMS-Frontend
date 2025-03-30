import React from 'react'

const Validate = (values) => {

 let errors={}

 if(!values.email.trim())
 {
  errors.email = "Email is required"
 }

 else if(!/\S+@\S+\.\S+/.test(values.email))
 {
  errors.email = "Email is invalid"
 }

 if(!values.password.trim())
 {
  errors.password = "Password is required"
 }

 else if(values.password.length > 8)
 {
  errors.password = "Password must be less than 8 characters"
 }

 if(!values.confirmPassword.trim())
 {
  errors.confirmPassword = "Confirm Password is required"
 }

 else if(values.confirmPassword !== values.password)
 {
  errors.confirmPassword = "Password does not match"
 }



  return errors
}

export default Validate
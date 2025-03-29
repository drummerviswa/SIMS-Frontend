import React from 'react'



const Validate = (value) => {

 let errors = {}


 if(!value.username.trim())
 {
  errors.username = "Username is required"

 }

 if(!value.email.trim())
 {
  errors.email = "Email is required"
 }

 else if (!/^[\w\.=-]+@[\w\.-]+\.[\w]{2,3}$/.test.value.email) 
 {

  errors.email = "Email is invalid"

 }

 if(!value.password.trim())
 {
  errors.password = "Password is required"
 }

 else if(value.password.length > 8)
 {
  errors.password = "Password must be less than 8 characters"
 }

 if (!value.confirmpassword.trim()) {
  errors.confirmpassword = "Confirm password is required"
 }

 else if(value.password != value.confirmpassword)
 {
  errors.confirmpassword = "Password does not match"
 }

 return errors

 return(
  <div>Validate</div>
 )
}

export default Validate
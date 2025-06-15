const Validate = (values) => {
  let errors = {};

  if (typeof values.username === "string") {
    if (values.username.trim() === "") {
      errors.username = "Username is required";
    } else if (values.username.length < 2) {
      errors.username = "Username must be at least 2 characters";
    }
  }

  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  } 
  // else if (values.password.length < 6) {
  //   errors.password = "Password must be at least 6 characters";
  // }

  return errors;
};

export default Validate;

export default function Validate(values) {
  const errors = {};

  // Email validation
  if (!values.email || values.email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  // Password validation
  if (!values.password || values.password.trim() === "") {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Confirm Password (only if it's being used)
  if (typeof values.confirmpassword === "string") {
    if (values.confirmpassword.trim() === "") {
      errors.confirmpassword = "Confirm password is required";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Passwords do not match";
    }
  }

  // Username (if present)
  if (typeof values.username === "string") {
    if (values.username.trim() === "") {
      errors.username = "Username is required";
    }
  }

  return errors;
}

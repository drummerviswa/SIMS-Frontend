import { useState } from "react";
import API from "../../../utils/API";

const useForm = (Validate, submitCallback, endpoint) => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [Errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validate(value);
    setErrors(validationErrors);
    console.log("Validation Errors:", validationErrors);
    console.log("Form Values:", value);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const payload = {
          email: value.email,
          password: value.password,
        };
        
        const response = await API.post(endpoint, payload);
        console.log("Submitting:", isSubmitting);
        if (submitCallback) submitCallback(response.data);
      } catch (error) {
        console.error(error);
        setErrors({ api: error.response?.data?.message || "Server error" });
      } finally {
        setIsSubmitting(false);
      }
    }else{
      console.log("Validation Errors:", validationErrors);
      setErrors(validationErrors);
      console.log("Form Values:", value);
    }
  };

  return { handleChange, value, handleSubmit, Errors, isSubmitting };
};

export default useForm;

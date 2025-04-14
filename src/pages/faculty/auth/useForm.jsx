import { useState } from "react";
import API from "../../../utils/API";

const useForm = (Validate, submitCallback, endpoint) => {
  const [value, setValue] = useState({
    username: "",
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

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        console.log("Submitting data:", value);
        console.log("Endpoint:", endpoint);

        const response = await API.post(endpoint, value);
        if (submitCallback) submitCallback(response.data);
        console.log("Response:", response.data);
      } catch (error) {
        console.error(error);
        setErrors({
          api: error.response?.data?.message || "Server error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return { handleChange, value, handleSubmit, Errors, isSubmitting };
};

export default useForm;

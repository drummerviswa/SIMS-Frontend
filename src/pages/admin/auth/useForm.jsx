import { useState } from "react";
import API from "../../../utils/API";

const useForm = (Validate, submitCallback, endpoint) => {
  const [regvalue, setRegValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
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
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validate(regvalue);
    setErrors(validationErrors);
    console.log("Validation Errors:", validationErrors);
    console.log("Form Values:", regvalue);
    // Check if there are no validation errors
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: regvalue.name,
          email: regvalue.email,
          password: regvalue.password,
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
    } else {
      console.log("Validation Errors:", validationErrors);
      setErrors(validationErrors);
      console.log("Form Values:", regvalue);
    }
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
    } else {
      console.log("Validation Errors:", validationErrors);
      setErrors(validationErrors);
      console.log("Form Values:", value);
    }
  };

  return {
    handleChange,
    handleRegisterChange,
    handleRegisterSubmit,
    value,
    regvalue,
    handleSubmit,
    Errors,
    isSubmitting,
  };
};

export default useForm;

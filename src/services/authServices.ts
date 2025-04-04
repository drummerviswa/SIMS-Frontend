import API from "../utils/API";

export const loginAdmin = async (email, password) => {
  try {
    const response = await API.post("/admin/login", { email, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", "admin");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginFaculty = async (email, password) => {
  try {
    const response = await API.post("/faculty/login", { email, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", "faculty");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginDepartment = async (email, password) => {
  try {
    const response = await API.post("/department/login", { email, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", "department");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await API.post("/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  } catch (error) {
    throw error.response.data;
  }
};

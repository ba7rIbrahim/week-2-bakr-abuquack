import axios from "axios"
import { LoginFormData, SignupFormData } from "../types/authType"

axios.defaults.withCredentials = true;

export const signupAPI = async (formData: SignupFormData) => {
  const response = await axios.post('/api/signup', formData, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  return response.data
}

export const loginAPI = async (formData: LoginFormData) => {
  const response = await axios.post('/api/login', formData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export const getMeAPI = async () => {
  const response = await axios.get('/api/me');
  return response.data
}


export const logoutAPI = async () => {
  return await axios.post('/api/logout');
}
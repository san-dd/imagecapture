import axios from 'axios'

const base_url="http://localhost:8080"

export const register = newUser => {
  return axios
    .post(`${base_url}/register`, {
      name: newUser.first_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered',response.data)
      localStorage.setItem('usertoken', response.data.token)
      return {success:true,}
    })
    .catch(err=>{
      const { response } = err;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.msg);
      return {success:false,msg:errorObject.data.msg}
    })
}

export const login = user => {
  console.log(user)
  return axios
    .post(`${base_url}/login`, {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log(response.data)
      localStorage.setItem('usertoken', response.data.token)
      return {success:true,data:response.data}
    })
    .catch(err => {
      const { response } = err;
      const { request, ...errorObject } = response; // take everything but 'request'
      console.log(errorObject.data.msg);
      return {success:false,msg:errorObject.data.msg}
    })
}

export const getProfile = token => {
  return axios
    .get(`${base_url}/user`, {
      headers: { "x-auth-token": token}
    })
    .then(response => {
      console.log(response.data.name)
      return {success:true,data:response.data}
    })
    .catch(err => {
        const { response } = err;
        const { request, ...errorObject } = response; // take everything but 'request'
        console.log(errorObject.data.msg);
        return {success:false,msg:errorObject.data.msg}
    })
}

export const uploadImage = async file => {
  const form_data = new FormData();
  form_data.append("file", file);
  const request_config = {
    method: "post",
    url: `${base_url}/upload`,
    headers: {
        "x-auth-token": localStorage.usertoken,
        "Content-Type": "multipart/form-data"
    },
    data: form_data
  };
  return axios(request_config);
  // Connect to a seaweedfs instance
};
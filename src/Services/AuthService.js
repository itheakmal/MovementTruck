import { login } from "./networkRequests";

const AuthService = {
    loginService: async (email, password) => {
      // handle login logic here
      const data = await login({email, password})
      return data
      // if (status === 'error') {
      //   return false
      // } else {
      //   return response;
      // }
      // console.log('first1: ', response)
      // console.log('status1: ', status)
      // return user data if login is successful
    },
  };
  
  export default AuthService;
  
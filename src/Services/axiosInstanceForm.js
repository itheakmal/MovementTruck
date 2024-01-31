import axios from 'axios';
// Create an instance of Axios with a base URL and common headers
const axiosInstanceForm = axios.create({
  baseURL: 'https://www.app.tctran.com.au/en/webservices/',
  // baseURL: 'https://demo.tctran.com.au/en/webservices/',
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

// Get the navigation object from the useNavigation hook
// const navigation = useNavigation();

// Add an interceptor to handle 401 Unauthorized responses and navigate to the login screen
axiosInstanceForm.interceptors.response.use(null, error => {
  if (error.response?.status === 401) {
    // navigation.navigate('Login');
    console.log('401');
  }
  return Promise.reject(error);
});

// Export the axios instance so it can be used in other components of the app
export default axiosInstanceForm;

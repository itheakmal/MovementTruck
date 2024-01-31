import axiosInstance from './axiosInstance';
import axiosInstanceForm from './axiosInstanceForm';

// login request
export const login = async loginObj => {
  console.log('loginObj', loginObj);
  try {
    const {data} = await axiosInstance.get(
      `/login?email=${loginObj.email}&password=${loginObj.password}`,
    );
    console.log('Login successful:', data);
    return data;
  } catch (error) {
    console.error('Login error :', JSON.stringify(error.message));
    throw error;
  }
};

// Get driver vehicle
export const getVehicle = async driverID => {
  console.log('driverID', driverID);
  const form_data = new FormData();
  form_data.append('driver_id', driverID);
  console.log(form_data);
  try {
    const {data} = await axiosInstanceForm.post(`/getDriverVehicle`, form_data);
    console.log('getVehicle successful:', data);
    return data;
  } catch (error) {
    console.error('getVehicle error:', JSON.stringify(error.message));
    throw error;
  }
};

// driverJobs request
export const driverJobs = async ID => {
  console.log('ID', ID);
  try {
    const {data} = await axiosInstance.get(`/Get_driver_jobs?driver_id=${ID}`);
    console.log('Get_driver_jobs successful:', data);
    return data;
  } catch (error) {
    console.error('driverJobs error:', JSON.stringify(error.message));
    throw error;
  }
};

// get checklist request
export const getChecklist = async () => {
  try {
    const {data} = await axiosInstance.post(`/getCheckLists`);
    console.log('getCheckLists successful:', data);
    if (data.status === 'success') {
      console.log('data', data);
      return data.response;
    } else {
      data.response.driver_checklist = [];
      data.response.vehicle_checklist = [];
      return data.response;
    }
  } catch (error) {
    console.error('getChecklist error:', JSON.stringify(error.message));
    throw error;
  }
};

// get Vehicles request
export const getVehicles = async () => {
  try {
    const {data, status} = await axiosInstance.post(`/getVehicles`);
    console.log('getVehicles successful:', data);
    console.log('status successful:', status);
    if (data.status === 'success') {
      return data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Login error:', JSON.stringify(error.message));
    throw error;
  }
};

// verify Registration Number request
export const numberVerify = async number => {
  try {
    // change the api endpoint here
    const form_data = new FormData();
    form_data.append('register_number', number);
    console.log('form_data', form_data);
    const {data} = await axiosInstanceForm.post(
      `/getVehicleByNumber`,
      form_data,
    );
    // const data = 12345
    console.log('verify Registration Number successful:', data);
    if (data.status === 'success') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login error:', JSON.stringify(error.message));
    throw error;
  }
};
// createNewCheckList request
export const submitCheckList = async list => {
  try {
    // change the api endpoint here
    const form_data = new FormData();
    form_data.append('driver_id', list.driver_id);
    form_data.append('driver_checklist', list.checklistDriver);
    form_data.append('vehicle_checklist', list.checklistVehicle);
    form_data.append('vehicle_id', list.vehicle_id);
    form_data.append('accreditation_number', list.accreditation_number);
    form_data.append('register_number', list.registrationNumber);
    form_data.append('odometer', list.odometer);
    form_data.append('signature', list.signature);
    console.log('list', list);
    console.log('form_data', form_data);
    const {data} = await axiosInstanceForm.post(
      `/createNewCheckList`,
      form_data,
    );
    // const data = 12345
    console.log('createNewCheckList successful:', data);
    if (data.status === 'success') {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Login error:', JSON.stringify(error.message));
    throw error;
  }
};

// registration request
export const register = async regObj => {
  // console.log(regObj.name, regObj.email)
  try {
    const {data} = await axiosInstance.post('/register', regObj);
    console.log('Registration successful:', data);
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// change Acknowledge Status request
export const changeAcknowledgeStatus = async statusObj => {
  // console.log('statusObj', statusObj.jobID)
  // console.log(regObj.name, regObj.email)
  try {
    const {data} = await axiosInstance.post(
      `/changeAcknowledgeStatus?acknowledged=${statusObj.acknowledged}&job_id=${statusObj.job_id}`,
    );
    // const {response, status} = data
    console.log('changeAcknowledgeStatus :', data);
    return data;
  } catch (error) {
    console.error('changeAcknowledgeStatus :', error);
    throw error;
  }
};

// change Acknowledge Status request
export const changeJobStatus = async statusObj => {
  // console.log('statusObj', statusObj.jobID)
  // console.log(regObj.name, regObj.email)
  try {
    const {data} = await axiosInstance.post(
      `/changeStatus?status=${statusObj.status}&job_id=${statusObj.job_id}`,
    );
    // const {response, status} = data
    console.log('status :', data);
    return data;
  } catch (error) {
    console.error('status :', error);
    throw error;
  }
};

export const getRequest = async endpoint => {
  try {
    // Get the token from the local storage
    const token = localStorage.getItem('token');
    // Check if the token exists and is valid
    if (token) {
      // Set the authorization header with the token
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      // Make the GET request and get the data from the response
      const {data} = await axiosInstance.get(endpoint);
      // Return the data
      return data;
    } else {
      // Throw an error if the token is missing or invalid
      // throw new Error("Token is missing or invalid");
      console.log('Missing token, you will be redirected to login');
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error('getRequest error:', error);
    throw error;
  }
};

// A function to make a POST request to an endpoint with authorization and data
export const postRequest = async (endpoint, data) => {
  try {
    // Get the token from the local storage
    const token = localStorage.getItem('token');
    // Check if the token exists and is valid
    if (token) {
      // Set the authorization header with the token
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      // Make the POST request and get the response
      const response = await axiosInstance.post(endpoint, data);
      // Return the response
      return response;
    } else {
      // Throw an error if the token is missing or invalid
      throw new Error('Token is missing or invalid');
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error('postRequest error:', error);
    throw error;
  }
};

export const putRequest = async (endpoint, data) => {
  try {
    // Get the token from the local storage
    const token = localStorage.getItem('token');
    // Check if the token exists and is valid
    if (token) {
      // Set the authorization header with the token
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      // Make the PUT request and get the response
      const response = await axiosInstance.put(endpoint, data);
      // Return the response
      return response;
    } else {
      // Throw an error if the token is missing or invalid
      throw new Error('Token is missing or invalid');
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error('putRequest error:', error);
    throw error;
  }
};

// A function to make a DELETE request to an endpoint with authorization
export const deleteRequest = async endpoint => {
  try {
    // Get the token from the local storage
    const token = localStorage.getItem('token');
    // Check if the token exists and is valid
    if (token) {
      // Set the authorization header with the token
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
      // Make the DELETE request and get the response
      const response = await axiosInstance.delete(endpoint);
      // Return the response
      return response;
    } else {
      // Throw an error if the token is missing or invalid
      throw new Error('Token is missing or invalid');
    }
  } catch (error) {
    // Log the error and rethrow it
    console.error('deleteRequest error:', error);
    throw error;
  }
};

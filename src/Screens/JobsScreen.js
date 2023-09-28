import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import StyledTable from '../Components/StyledTable';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../Components/Button';
import ButtonTable from '../Components/ButtonTable';
import { driverJobs } from '../Services/networkRequests';

const JobsScreen = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    console.log('useeefcet')
    async function fetchJobs() {
      const { response, status } = await driverJobs(user.id)
      if (status === 'error') {
        // setError(response)
        console.log('error')
      } else if (status === 'success') {
        console.log('response', response)
        const formatedJobs = response.jobs.map(job => ([job.id, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, job.acknowledged, job.job_status]))

        setJobs(formatedJobs)

      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {

  }, [jobs])
  // sample data for user jobs
  // const jobs = [
  //   { id: 1, date: '2023-08-16', origin: 'Lahore', destination: 'Karachi', status: 'In Progress' },
  //   { id: 2, date: '2023-08-17', origin: 'Karachi', destination: 'Islamabad', status: 'Completed' },
  //   { id: 3, date: '2023-08-18', origin: 'Islamabad', destination: 'Peshawar', status: 'Pending' },
  // ];
  // const Button = ({ children, onPress }) => (
  //   <TouchableOpacity style={styles.button} onPress={onPress}>
  //     <Text style={styles.buttonText}>{children}</Text>
  //   </TouchableOpacity>
  // );
  const handlePress = (arg) => {
    console.log(arg)
  }
  const _jobs = [
    ['1', '2', '3', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
    ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
    ['1', '2', '3', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
    ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
    ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
    ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })]
  ];

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  // const onRefresh = useCallback(() => {
  //   // Implement your data fetching logic here.
  //   // Typically, you would make an API call to fetch updated data.
  //   // After fetching data, update the 'data' state and set 'refreshing' to false.

  //   // For example, you can simulate a delay with setTimeout:
  //   setTimeout(() => {
  //     setData([
  //       ['2', '2', '3', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
  //       ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
  //       ['1', '2', '3', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
  //       ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
  //       ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })],
  //       ['a', 'b', 'c', 'a', 'b', 'b', 'b', 'b', ButtonTable({ children: 'Accept', onPress: () => handlePress('u') })]
  //     ]); // Replace 'updatedData' with your refreshed data
  //     setRefreshing(false);
  //   }, 1000); // Adjust the delay as needed
  // }, []);
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } >
        <Text style={styles.landingTitle}>Welcome, {user.email}</Text>
        <StyledTable headers={['Job Number', 'Client Name', 'Pickup Time', 'Pickup Address', 'Drop off Time', 'Drop off Address', 'Reason', 'Acknowledged', 'Job Status']} data={jobs.length ? jobs : []} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsScreen;

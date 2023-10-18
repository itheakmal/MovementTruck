import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, RefreshControl, View } from 'react-native';
import StyledTable from '../Components/StyledTable';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../Components/Button';
import ButtonTable from '../Components/ButtonTable';
import { changeAcknowledgeStatus, driverJobs } from '../Services/networkRequests';

const JobsScreen = () => {
  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([])
  const [statusChange, setStatusChange] = useState("")
  const [jobStatus, setJobStatus] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    async function fetchJobs() {
      const { response, status } = await driverJobs(user.id)
      if (status === 'error') {
        // setError(response)
        console.log('error')
      } else if (status === 'success') {
        console.log('response', response)
        const formatedJobs = response.jobs.map(job => {

          return [job.id, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, job.acknowledged === 'No' ? ButtonTable({ children: 'Yes', onPress: () => handlePress(job.id) }) : job.acknowledged, job.job_status]
        }
        )

        setJobs(formatedJobs)

      }
    }
    fetchJobs()
    setTimeout(() => (setJobStatus("")), 3000)

  }, [statusChange])


  const handlePress = async (id) => {
    console.log(id)
    const data = await changeAcknowledgeStatus({ acknowledged: 'Yes', job_id: id })
    setJobStatus(data.response)
    console.log('data.response', data.response)
    if (data.status === 'error') {

    } else {
      setStatusChange(!statusChange)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    async function fetchJobs() {
      const { response, status } = await driverJobs(user.id)
      if (status === 'error') {
        // setError(response)
        console.log('error')
      } else if (status === 'success') {
        console.log('response', response)
        const formatedJobs = response.jobs.map(job => ([job.id, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, job.acknowledged === 'No' ? ButtonTable({ children: "Yes", onPress: () => handlePress(job.id) }) : job.acknowledged, job.job_status]))

        setJobs(formatedJobs)

      }
    }
    fetchJobs()

    // setTimeout(() => {
    setRefreshing(false);
    // }, 2000);
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
    <SafeAreaView>

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } >
        {/* <View style={styles.sized}>
          <Text style={styles.screenTitle}>Welcome, {user.email}</Text>
        </View> */}
        <View style={styles.jobsWrapper}>
          {!!(jobStatus) && <View style={styles.jobStatus}><Text style={styles.jobStatusText}>{jobStatus}</Text></View>}
          <StyledTable data={jobs.length ? jobs : []} headers={['Job Number', 'Client Name', 'Pickup Time', 'Pickup Address', 'Drop off Time', 'Drop off Address', 'Reason', 'Acknowledged', 'Job Status']} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsScreen;

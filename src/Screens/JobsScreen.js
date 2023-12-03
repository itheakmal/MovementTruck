import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ScrollView, Text, SafeAreaView, TouchableOpacity, RefreshControl, View } from 'react-native';
import StyledTable from '../Components/StyledTable';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../Components/Button';
import ButtonTable from '../Components/ButtonTable';
import { changeAcknowledgeStatus, changeJobStatus, driverJobs } from '../Services/networkRequests';
import Sound from 'react-native-sound';
import ButtonAcknowledge from '../Components/ButtonAcknowledge';
// import Button from '../Components/Button';
import moment from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';
import ButtonTableStatus from '../Components/ButtonTableStatus';
import MyView from '../Components/MyView';

const JobsScreen = () => {
  const navigation = useNavigation();

  const { user } = useContext(UserContext);
  const [jobs, setJobs] = useState([])
  const [jobCcolors, setJobColors] = useState([])
  const [statusChange, setStatusChange] = useState("")
  const [dateToday, setdateToday] = useState("")
  const [jobStatus, setJobStatus] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  function randomNumber() {
    return Math.floor(Math.random() * 6);
  }
  useEffect(() => {

    async function fetchJobs() {
      const { response, status } = await driverJobs(user.id)
      if (status === 'error') {
        // setError(response)
        console.log('error')
      } else if (status === 'success') {
        console.log('response', response)
        setdateToday(response.today_date)
        /**
         * FDD835 yellow
         * A1887F brown
         * F06292 pink
         * 43A047 green
         * 4FC3F7 blue
         * 9575CD purpule
         * E53935 red
         */
        
        const themeColors = ['#FDD835', '#A1887F', '#F06292', '#43A047', '#4FC3F7', '#9575CD', '#E53935']
        const _jColors = []
        const _jColorsN = []
        const _jobsStatusColors = []
        const formatedJobs = response.jobs.map((job, index) => {

          switch (+job.job_number) {
            case 1.00:
              _jColorsN.push(themeColors[0])
              break;
            case 1.00:
              _jColorsN.push(themeColors[1])
              break;
            case 1.00:
              _jColorsN.push(themeColors[0])
              break;
            case 1.00:
              _jColorsN.push(themeColors[0])
              break;
            case 1.00:
              _jColorsN.push(themeColors[0])
              break;
            case 1.00:
              _jColorsN.push(themeColors[0])
              break;
            case 1.00:
              _jColorsN.push(themeColors[0])
              break;
          
            default:
              break;
          }



          let tempColor = ''
          if (index < themeColors.length) {
            tempColor = themeColors[index]
          } else {
            tempColor = themeColors[randomNumber()]
          }
          const _jobStatusColor = { pickupTime: job.pickup_time, color: tempColor }
          if (index !== 0) {
            const colorDecision = _jobsStatusColors.find(item => item.pickupTime === _jobStatusColor.pickupTime)
            console.log({ colorDecision })
            if (colorDecision) {
              _jobStatusColor.color = colorDecision.color
            }
          }
          _jColors.push(_jobStatusColor.color)
          _jobsStatusColors.push(_jobStatusColor)

          if (job.job_status === 'Cancelled') {

            return [<Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.job_number}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.client_name}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.pickup_time}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.pickup_address}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.drop_off_time}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.drop_off_address}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.reason}</Text>,
            acknowledgButton(job.acknowledged, job.id),
            statusButton(job.job_status, job.acknowledged, job.id)]
          } else {

            return [job.job_number, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, acknowledgButton(job.acknowledged, job.id), statusButton(job.job_status, job.acknowledged, job.id)]
          }
        }
        )
        if (response.play_sound === 'yes') {
          // Load the sound file
          const sound = new Sound('sound_effect.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('Failed to load the sound', error);
              return;
            }
            // Play the sound once
            sound.play((success) => {
              if (success) {
                console.log('Sound played successfully');
              } else {
                console.log('Failed to play the sound');
              }
            }, { numberOfLoops: 0 });
          });
        }
        setJobColors(_jColors)
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
  const handleJobStatusPress = async (status, id) => {
    console.log(id)
    console.log(status)
    status = status === 'Dropped' ? 'Completed' : status
    const data = await changeJobStatus({ status: status, job_id: id })
    setJobStatus(data.response)
    console.log('data.response', data.response)
    if (data.status === 'error') {

    } else {
      setStatusChange(!statusChange)
    }
  }

  const acknowledgButton = (acknowledgedStatus, jobID) => {
    if (acknowledgedStatus === 'No') {
      return ButtonAcknowledge({ children: "Acknowldge", onPress: () => handlePress(jobID) })
    } else {
      return acknowledgedStatus
    }
  }
  const statusButton = (jobStatus, acknowledgedStatus, jobID) => {
    let buttonText = null;
    let buttonColor = null;
    switch (jobStatus.toLowerCase()) {
      case 'open':
        buttonText = 'Picked'
        buttonColor = 'buttonTableColorBlue'
        break;
        case 'picked':
        case 'pciked':
          buttonText = 'Dropped',
          buttonColor = 'buttonTableColorRed'
        break;
      case 'dropped':
        buttonText = 'Completed'
        break;
      case 'unassigned':
        buttonText = 'Unassigned'
        break;
      default:
        buttonText = 'Unknown'
        break;
    }
    console.log('buttonColor', buttonColor)
    if (jobStatus.toLowerCase() === 'cancelled' || jobStatus.toLowerCase() === 'completed' || acknowledgedStatus.toLowerCase() === 'no' || jobStatus.toLowerCase() === 'unassigned') {
      return jobStatus
    } else {
      return ButtonTableStatus({ children: buttonText, onPress: () => handleJobStatusPress(buttonText, jobID), buttonTableBackground: buttonColor })
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
        // const formatedJobs = response.jobs.map(job => ([job.job_number, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, acknowledgButton(job.acknowledged, job.id), statusButton(job.job_status, job.acknowledged, job.id)]))
        const formatedJobs = response.jobs.map(job => {
          if (job.job_status === 'Cancelled') {

            return [<Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.job_number}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.client_name}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.pickup_time}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.pickup_address}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.drop_off_time}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.drop_off_address}</Text>,
            <Text style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: '#333' }}>{job.reason}</Text>,
            acknowledgButton(job.acknowledged, job.id),
            statusButton(job.job_status, job.acknowledged, job.id)]
          } else {

            return [job.job_number, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, acknowledgButton(job.acknowledged, job.id), statusButton(job.job_status, job.acknowledged, job.id)]
          }
        })
        if (response.play_sound === 'yes') {
          // Load the sound file
          const sound = new Sound('sound_effect.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('Failed to load the sound', error);
              return;
            }
            // Play the sound once
            sound.play((success) => {
              if (success) {
                console.log('Sound played successfully');
              } else {
                console.log('Failed to play the sound');
              }
            }, { numberOfLoops: 0 });
          });
        }
        setJobs(formatedJobs)

      }
    }
    fetchJobs()
    setTimeout(() => (setJobStatus("")), 3000)

    // setTimeout(() => {
    setRefreshing(false);
    // }, 2000);
  }, [statusChange]);
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
        <View style={styles.sized}>
          {/* <Text style={styles.screenTitle}>My Tripsheet, {user.username}, {moment().tz('Australia/Sydney').format('d MMMM Y')}</Text> */}
          <Text style={styles.screenTitle}>My Tripsheet, {user.username}, {dateToday}</Text>
          <ButtonTable onPress={() => navigation.navigate('Login')}>Logout</ButtonTable>
        </View>
        <View style={styles.jobsWrapper}>
          {!!(jobStatus) && <View style={styles.jobStatus}><Text style={styles.jobStatusText}>{jobStatus}</Text></View>}
          <StyledTable color={jobCcolors.length ? jobCcolors : []} data={jobs} headers={['Job', 'Client Name', 'Pickup Time', 'Pickup Address', 'Drop off Time', 'Drop off Address', 'Reason', 'Acknowledged', 'Job Status']} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsScreen;

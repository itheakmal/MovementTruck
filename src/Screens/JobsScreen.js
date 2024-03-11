/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  View,
  StatusBar,
} from 'react-native';
import StyledTable from '../Components/StyledTable';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../Components/Button';
import ButtonTable from '../Components/ButtonTable';
import {
  changeAcknowledgeStatus,
  changeJobStatus,
  driverJobs,
} from '../Services/networkRequests';
import Sound from 'react-native-sound';
import ButtonAcknowledge from '../Components/ButtonAcknowledge';
// import Button from '../Components/Button';
import moment from 'moment-timezone';
import {useNavigation} from '@react-navigation/native';
import ButtonTableStatus from '../Components/ButtonTableStatus';
import MyView from '../Components/MyView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobsScreen = () => {
  const navigation = useNavigation();

  const {user} = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [jobCcolors, setJobColors] = useState([]);
  const [statusChange, setStatusChange] = useState('');
  const [dateToday, setdateToday] = useState('');
  const [jobStatus, setJobStatus] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  function randomNumber() {
    return Math.floor(Math.random() * 6);
  }

  console.log('jobs', jobs?.jobs?.length);

  useEffect(() => {
    fetchJobs();
    setTimeout(() => setJobStatus(''), 3000);
  }, [statusChange]);

  async function fetchJobs() {
    const {response, status} = await driverJobs(user.id);

    // const status = 'success';
    // const response = {
    //   jobs: [
    //     {
    //       id: '2073859',
    //       job_number: '1.00',
    //       client_name: 'Zoe Dunlop Marchant',
    //       pickup_time: '07 : 10 : AM',
    //       pickup_address: '148 Koornalla Crescent Mt Elisa',
    //       drop_off_time: '08 : 50 : AM',
    //       drop_off_address: '8 Edithvale Rd, Edithvale',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073860',
    //       job_number: '2.00',
    //       client_name: 'Brodie Vearing',
    //       pickup_time: '07 : 50 : AM',
    //       pickup_address: '34 James Ave, Aspendale',
    //       drop_off_time: '08 : 45 : AM',
    //       drop_off_address: 'Thames',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC1C1',
    //     },
    //     {
    //       id: '2073861',
    //       job_number: '3.00',
    //       client_name: 'Jackson Wakefield',
    //       pickup_time: '08 :15 : AM',
    //       pickup_address: '37 Cedric Street Mordialloc',
    //       drop_off_time: '08 : 50 : AM',
    //       drop_off_address: '8 Edithvale Rd, Edithvale',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073862',
    //       job_number: '4.00',
    //       client_name: 'Denis Ward',
    //       pickup_time: '08 : 20 : AM',
    //       pickup_address: '13 Steedman St, Mordialloc',
    //       drop_off_time: '08 : 45 : AM',
    //       drop_off_address: 'Thames',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC1C1',
    //     },
    //     {
    //       id: '2073863',
    //       job_number: '5.00',
    //       client_name: 'Violette Cooke',
    //       pickup_time: '09 : 00 : AM',
    //       pickup_address: '18 Branagan Dr, Aspendale Gardens',
    //       drop_off_time: '09 : 15 : AM',
    //       drop_off_address: 'Thames',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC125',
    //     },
    //     {
    //       id: '2073864',
    //       job_number: '6.00',
    //       client_name: 'Keone Prout',
    //       pickup_time: '09 : 30 : AM',
    //       pickup_address: '7 Fraser Ave, Edithvale',
    //       drop_off_time: '09 : 45 : AM',
    //       drop_off_address: 'BFL SPRINGERS',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#E0EEE0',
    //     },
    //     {
    //       id: '2073865',
    //       job_number: '7.00',
    //       client_name: 'Billie Kaye Harris (241985)',
    //       pickup_time: '09 : 30 : AM',
    //       pickup_address: '7 Fraser Ave, Edithvale',
    //       drop_off_time: '09 : 45 : AM',
    //       drop_off_address: 'BFL SPRINGERS',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#E0EEE0',
    //     },
    //     {
    //       id: '2073866',
    //       job_number: '8.00',
    //       client_name: 'Steven Fretwell',
    //       pickup_time: '10 : 00 : AM',
    //       pickup_address: 'Springers ',
    //       drop_off_time: '10 : 20 : AM',
    //       drop_off_address: 'Grocery Shopping',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073867',
    //       job_number: '9.00',
    //       client_name: 'Natasha Mussared',
    //       pickup_time: '10 : 00 : AM',
    //       pickup_address: 'Springers ',
    //       drop_off_time: '10 : 20 : AM',
    //       drop_off_address: 'Grocery Shopping',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073869',
    //       job_number: '11.00',
    //       client_name: 'Steven Fretwell',
    //       pickup_time: '11 : 00 : AM',
    //       pickup_address: 'Grocery Shopping',
    //       drop_off_time: '11 : 10 : AM',
    //       drop_off_address: 'Springers ',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073870',
    //       job_number: '12.00',
    //       client_name: 'Natasha Mussared',
    //       pickup_time: '11 : 00 : AM',
    //       pickup_address: 'Grocery Shopping',
    //       drop_off_time: '11 : 10 : AM',
    //       drop_off_address: 'Springers ',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073872',
    //       job_number: '14.00',
    //       client_name: 'Luke Vladicic',
    //       pickup_time: '12 : 30 : PM',
    //       pickup_address: 'Thames',
    //       drop_off_time: '12 : 45 : PM',
    //       drop_off_address: 'GESAC',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC125',
    //     },
    //     {
    //       id: '2073873',
    //       job_number: '15.00',
    //       client_name: 'Daniel Scope',
    //       pickup_time: '12 : 30 : PM',
    //       pickup_address: 'Thames',
    //       drop_off_time: '12 : 45 : PM',
    //       drop_off_address: 'GESAC',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC125',
    //     },
    //     {
    //       id: '2073874',
    //       job_number: '16.00',
    //       client_name: 'Emily Skahill',
    //       pickup_time: '12 : 30 : PM',
    //       pickup_address: 'Thames',
    //       drop_off_time: '12 : 45 : PM',
    //       drop_off_address: 'GESAC',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC125',
    //     },
    //     {
    //       id: '2073875',
    //       job_number: '17.00',
    //       client_name: 'Daniel Scope',
    //       pickup_time: '02 : 15 : PM',
    //       pickup_address: 'GESAC',
    //       drop_off_time: '02 : 30 : PM',
    //       drop_off_address: 'Thames',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC125',
    //     },
    //     {
    //       id: '2073876',
    //       job_number: '18.00',
    //       client_name: 'Emily Skahill',
    //       pickup_time: '02 : 15 : PM',
    //       pickup_address: 'GESAC',
    //       drop_off_time: '02 : 30 : PM',
    //       drop_off_address: 'Thames',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#FFC125',
    //     },
    //     {
    //       id: '2073877',
    //       job_number: '19.00',
    //       client_name: 'Alexander Clark',
    //       pickup_time: '02 : 40 : PM',
    //       pickup_address: 'THAMES',
    //       drop_off_time: '03 : 05 : PM',
    //       drop_off_address: '22 Sixth St, Parkdale',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#C1C1C1',
    //     },
    //     {
    //       id: '2073878',
    //       job_number: '20.00',
    //       client_name: 'Jackson Wakefield',
    //       pickup_time: '02 : 45 : PM',
    //       pickup_address: '8 Edithvale Rd, Edithvale',
    //       drop_off_time: '03 : 10 : PM',
    //       drop_off_address: '37 Cedric Street Mordialloc',
    //       reason: '',
    //       acknowledged: '',
    //       job_status: 'Open',
    //       color_code: '#54FF9F',
    //     },
    //     {
    //       id: '2073871',
    //       job_number: '13.00',
    //       client_name: 'Mathew Redmond',
    //       pickup_time: '11 : 00 : AM',
    //       pickup_address: 'Grocery Shopping',
    //       drop_off_time: '11 : 10 : AM',
    //       drop_off_address: 'Springers',
    //       reason:
    //         '148 Koornalla Crescent Mt Elisa 148 Koornalla Crescent Mt Elisa',
    //       acknowledged: 'No',
    //       job_status: 'Cancelled',
    //       color_code: '#54FF9F',
    //     },
    //   ],
    //   vehicle_id: '26',
    //   today_date: '09 March 2024',
    //   play_sound: 'yes',
    // };
    if (status === 'error') {
      // setError(response)
      console.log('error');
    } else if (status === 'success') {
      console.log('response', response);
      setdateToday(response.today_date);
      /**
       * FDD835 yellow
       * A1887F brown
       * F06292 pink
       * 43A047 green
       * 4FC3F7 blue
       * 9575CD purpule
       * E53935 red
       * #54FF9F
#FFC1C1
#FFC125
#E3A869
#CAE1FF
#E0EEE0
       */
      // console.log('first  vresponse', response);

      response.jobs.sort((a, b) => {
        // Custom sorting function to move "Unassigned" jobs to the end
        // console.log('a', a);
        // console.log('b', b);
        const statusA = a.job_status.toLowerCase();
        const statusB = b.job_status.toLowerCase();

        if (statusA === 'unassigned' && statusB !== 'unassigned') {
          return 1;
        } else if (statusA !== 'unassigned' && statusB === 'unassigned') {
          return -1;
        } else {
          return 0;
        }
      });

      setJobs(response);
      // console.log('  vresponse', response);

      const themeColors = [
        '#54FF9F',
        '#FFC1C1',
        '#FFC125',
        '#E3A869',
        '#CAE1FF',
        '#E0EEE0',
        '#E53935',
      ];
      const _jColors = [];
      // const _jColorsN = [];
      // const _jobsStatusColors = [];

      const colorsArray = response.jobs.map(item =>
        item?.color_code ? item?.color_code : themeColors[randomNumber()],
      );

      console.log('colorsArray', colorsArray);

      // const formatedJobs = response.jobs.map((job, index) => {
      //   console.log('+job.job_number', +job.job_number);
      //   // switch (+job.job_number) {
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[0]);
      //   //     break;
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[1]);
      //   //     break;
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[0]);
      //   //     break;
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[0]);
      //   //     break;
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[0]);
      //   //     break;
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[0]);
      //   //     break;
      //   //   case 1.0:
      //   //     _jColorsN.push(themeColors[0]);
      //   //     break;

      //   //   default:
      //   //     break;
      //   // }

      //   // console.log('formatedJobs', formatedJobs);

      //   // let tempColor = ''
      //   // if (index < themeColors.length) {
      //   //   tempColor = job.color_code ? job.color_code : themeColors[index]
      //   // } else {
      //   //   tempColor = job.color_code ? job.color_code : themeColors[randomNumber()]
      //   // }
      //   // const _jobStatusColor = { pickupTime: job.pickup_time, color: tempColor }
      //   // if (index !== 0) {
      //   //   const colorDecision = _jobsStatusColors.find(item => item.pickupTime === _jobStatusColor.pickupTime)
      //   //   console.log({ colorDecision })
      //   //   if (colorDecision) {
      //   //     _jobStatusColor.color = colorDecision.color
      //   //   }
      //   // }
      //   _jColors.push(
      //     job.color_code ? job.color_code : themeColors[randomNumber()],
      //   );
      //   // _jobsStatusColors.push(_jobStatusColor)

      //   // if (
      //   //   job.job_status.toLowerCase() === 'cancelled' ||
      //   //   job.job_status.toLowerCase() === 'unassigned'
      //   // ) {
      //   //   console.log('Which is running 1');
      //   //   return [
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.job_number}
      //   //     </Text>,
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.client_name}
      //   //     </Text>,
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.pickup_time}
      //   //     </Text>,
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.pickup_address}
      //   //     </Text>,
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.drop_off_time}
      //   //     </Text>,
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.drop_off_address}
      //   //     </Text>,
      //   //     <Text
      //   //       style={{
      //   //         textDecorationLine: 'line-through',
      //   //         textDecorationStyle: 'solid',
      //   //         color: '#333',
      //   //       }}>
      //   //       {job.reason}
      //   //     </Text>,
      //   //     acknowledgButton(job.acknowledged, job.id),
      //   //     statusButton(job.job_status, job.acknowledged, job.id),
      //   //   ];
      //   // } else {
      //   //   return [
      //   //     job.job_number,
      //   //     job.client_name,
      //   //     job.pickup_time,
      //   //     job.pickup_address,
      //   //     job.drop_off_time,
      //   //     job.drop_off_address,
      //   //     job.reason,
      //   //     acknowledgButton(job.acknowledged, job.id),
      //   //     statusButton(job.job_status, job.acknowledged, job.id),
      //   //   ];
      //   // }
      // });

      // console.log('formatedJobs', formatedJobs);
      if (response.play_sound === 'yes') {
        // Load the sound file
        const sound = new Sound(
          'sound_effect.mp3',
          Sound.MAIN_BUNDLE,
          error => {
            if (error) {
              console.log('Failed to load the sound', error);
              return;
            }
            // Play the sound once
            sound.play(
              success => {
                if (success) {
                  console.log('Sound played successfully');
                } else {
                  console.log('Failed to play the sound');
                }
              },
              {numberOfLoops: 0},
            );
          },
        );
      }
      setJobColors(_jColors);

      // setJobs(formatedJobs);
    }
  }

  const handlePress = async id => {
    console.log(id);
    const data = await changeAcknowledgeStatus({
      acknowledged: 'Yes',
      job_id: id,
    });
    setJobStatus(data.response);
    console.log('data.response', data.response);
    if (data.status === 'error') {
    } else {
      setStatusChange(!statusChange);
    }
  };
  const handleJobStatusPress = async (status, id) => {
    console.log(id);
    console.log(status);
    status = status === 'Dropped' ? 'Completed' : status;
    const data = await changeJobStatus({status: status, job_id: id});
    setJobStatus(data.response);
    console.log('data.response', data.response);
    if (data.status === 'error') {
    } else {
      setStatusChange(!statusChange);
    }
  };

  const acknowledgButton = (acknowledgedStatus, jobID) => {
    if (acknowledgedStatus === 'No') {
      return ButtonAcknowledge({
        children: 'Acknowldge',
        onPress: () => handlePress(jobID),
      });
    } else {
      return acknowledgedStatus;
    }
  };
  const statusButton = (jobStatus, acknowledgedStatus, jobID) => {
    let buttonText = null;
    let buttonColor = null;
    switch (jobStatus.toLowerCase()) {
      case 'open':
        buttonText = 'Picked';
        buttonColor = 'buttonTableColorBlue';
        break;
      case 'picked':
      case 'pciked':
        (buttonText = 'Dropped'), (buttonColor = 'buttonTableColorRed');
        break;
      case 'dropped':
        buttonText = 'Completed';
        break;
      case 'unassigned':
        buttonText = 'Unassigned';
        break;
      default:
        buttonText = 'Unknown';
        break;
    }
    console.log('buttonColor', buttonColor);
    if (
      jobStatus.toLowerCase() === 'cancelled' ||
      jobStatus.toLowerCase() === 'completed' ||
      acknowledgedStatus.toLowerCase() === 'no' ||
      jobStatus.toLowerCase() === 'unassigned'
    ) {
      return jobStatus;
    } else {
      return ButtonTableStatus({
        children: buttonText,
        onPress: () => handleJobStatusPress(buttonText, jobID),
        buttonTableBackground: buttonColor,
      });
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // async function fetchJobs() {
    //   const {response, status} = await driverJobs(user.id);
    //   if (status === 'error') {
    //     // setError(response)
    //     console.log('error');
    //   } else if (status === 'success') {
    //     console.log('response', response);
    //     response.jobs.sort((a, b) => {
    //       // Custom sorting function to move "Unassigned" jobs to the end
    //       console.log('a', a);
    //       console.log('b', b);
    //       const statusA = a.job_status.toLowerCase();
    //       const statusB = b.job_status.toLowerCase();

    //       if (statusA === 'unassigned' && statusB !== 'unassigned') {
    //         return 1;
    //       } else if (statusA !== 'unassigned' && statusB === 'unassigned') {
    //         return -1;
    //       } else {
    //         return 0;
    //       }
    //     });
    //     // const formatedJobs = response.jobs.map(job => ([job.job_number, job.client_name, job.pickup_time, job.pickup_address, job.drop_off_time, job.drop_off_address, job.reason, acknostatusButtonwledgButton(job.acknowledged, job.id), (job.job_status, job.acknowledged, job.id)]))
    //     const formatedJobs = response.jobs.map(job => {
    //       if (
    //         job.job_status.toLowerCase() === 'cancelled' ||
    //         job.job_status.toLowerCase() === 'unassigned'
    //       ) {
    //         return [
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.job_number}
    //           </Text>,
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.client_name}
    //           </Text>,
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.pickup_time}
    //           </Text>,
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.pickup_address}
    //           </Text>,
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.drop_off_time}
    //           </Text>,
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.drop_off_address}
    //           </Text>,
    //           <Text
    //             style={{
    //               textDecorationLine: 'line-through',
    //               textDecorationStyle: 'solid',
    //               color: '#333',
    //             }}>
    //             {job.reason}
    //           </Text>,
    //           acknowledgButton(job.acknowledged, job.id),
    //           statusButton(job.job_status, job.acknowledged, job.id),
    //         ];
    //       } else {
    //         return [
    //           job.job_number,
    //           job.client_name,
    //           job.pickup_time,
    //           job.pickup_address,
    //           job.drop_off_time,
    //           job.drop_off_address,
    //           job.reason,
    //           acknowledgButton(job.acknowledged, job.id),
    //           // statusButton(job.job_status, job.acknowledged, job.id),
    //         ];
    //       }
    //     });
    //     if (response.play_sound === 'yes') {
    //       // Load the sound file
    //       const sound = new Sound(
    //         'sound_effect.mp3',
    //         Sound.MAIN_BUNDLE,
    //         error => {
    //           if (error) {
    //             console.log('Failed to load the sound', error);
    //             return;
    //           }
    //           // Play the sound once
    //           sound.play(
    //             success => {
    //               if (success) {
    //                 console.log('Sound played successfully');
    //               } else {
    //                 console.log('Failed to play the sound');
    //               }
    //             },
    //             {numberOfLoops: 0},
    //           );
    //         },
    //       );
    //     }
    //     setJobs(formatedJobs);
    //   }
    // }
    fetchJobs();

    setTimeout(() => setJobStatus(''), 3000);

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

  // console.log('jobs>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>jobs', jobs);
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#001b5a" barStyle="dark-content" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.sized}>
          {/* <Text style={styles.screenTitle}>My Tripsheet, {user.username}, {moment().tz('Australia/Sydney').format('d MMMM Y')}</Text> */}
          <Text style={styles.screenTitle}>
            {/* My Tripsheet, {user.username}, {dateToday} */}
            {`My Tripsheet, ${user.username},\n${dateToday}`}
          </Text>
          <ButtonTable
            onPress={async () => {
              navigation.replace('Login');
              // await AsyncStorage.removeItem('checklistCompletedDate');
              // return true;
            }}>
            Logout
          </ButtonTable>
        </View>

        <View style={styles.jobsWrapper}>
          {!!jobStatus && (
            <View style={styles.jobStatus}>
              <Text style={styles.jobStatusText}>{jobStatus}</Text>
            </View>
          )}

          {jobs?.jobs?.length > 0 ? (
            jobs?.jobs?.map((item, index) => {
              const lineThrought =
                item.job_status.toLowerCase() === 'cancelled' ||
                item.job_status.toLowerCase() === 'unassigned';
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: item.color_code,
                    padding: 10,
                    marginTop: 10,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '500',
                        textDecorationLine: lineThrought
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item?.client_name}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#000',
                        fontSize: 14,
                        fontWeight: '700',
                        textDecorationLine: lineThrought
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item?.job_number}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text
                      style={{
                        color: '#e32a27',
                        fontSize: 14,
                        fontWeight: '600',
                        textDecorationLine: lineThrought
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item?.pickup_time}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#000',
                        fontSize: 14,
                        fontWeight: '800',
                      }}>
                      Pickup
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#000',
                        fontSize: 14,
                        fontWeight: '400',
                        textDecorationLine: lineThrought
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item?.pickup_address}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text
                      style={{
                        color: '#e32a27',
                        fontSize: 14,
                        fontWeight: '600',
                        textDecorationLine: lineThrought
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item?.drop_off_time}
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#000',
                        fontSize: 14,
                        fontWeight: '800',
                      }}>
                      DropOff
                    </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                        color: '#000',
                        fontSize: 14,
                        fontWeight: '400',
                        textDecorationLine: lineThrought
                          ? 'line-through'
                          : 'none',
                      }}>
                      {item?.drop_off_address}
                    </Text>
                  </View>

                  {item?.reason && (
                    <View style={{marginTop: 10, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          fontWeight: '800',
                        }}>
                        Reason
                      </Text>

                      <Text
                        style={{
                          marginLeft: 10,
                          color: '#000',
                          fontSize: 14,
                          fontWeight: '400',
                          textDecorationLine: lineThrought
                            ? 'line-through'
                            : 'none',
                        }}>
                        {item?.reason}
                      </Text>
                    </View>
                  )}

                  {/* {item.acknowledged === 'No' && (
                    <View
                      style={{
                        marginTop: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          fontWeight: '600',
                        }}>
                        Acknowledged
                      </Text>
                      <Text style={{height: 32}}>
                        {acknowledgButton(item.acknowledged, item.id)}
                      </Text>
                    </View>
                  )} */}

                  <View style={{marginTop: 8, alignSelf: 'flex-end'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{height: 32, marginRight: 20}}>
                        {acknowledgButton(item.acknowledged, item.id)}
                      </Text>
                      <Text
                        style={{
                          height: 32,
                          width: 80,
                          marginTop: item.acknowledged === 'No' ? 5 : 0,
                        }}>
                        {statusButton(
                          item.job_status,
                          item.acknowledged,
                          item.id,
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={{color: '#000', fontSize: 18, fontWeight: '600'}}>
                {'No more jobs for today'}
              </Text>
            </View>
          )}
          {/* <StyledTable
            color={jobCcolors.length ? jobCcolors : []}
            data={jobs}
            headers={[
              'Job',
              'Client Name',
              'Pickup Time',
              'Pickup Address',
              'Drop off Time',
              'Drop off Address',
              'Reason',
              'Acknowledged',
              'Job Status',
            ]}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsScreen;

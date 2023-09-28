import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import JobsScreen from './JobsScreen'
import CheckListScreen from './CheckListScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';

const SwitchScreen = () => {
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    const checkChecklistCompletion = async () => {
      const currentDate = moment().tz('Australia/Sydney').format('YYYY-MM-DD');
      // const currentDate = moment().format('YYYY-MM-DD');
      const lastCompletedDate = await AsyncStorage.getItem('checklistCompletedDate');
      setShowChecklist(currentDate !== lastCompletedDate);
    };
    checkChecklistCompletion();
  }, [])
  
  if (!showChecklist) {
    return (
      <CheckListScreen setShowChecklist={setShowChecklist} />
    );
  }
  return (
    <JobsScreen />
  )
}

export default SwitchScreen



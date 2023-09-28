import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';

const App = () => {
  const [showChecklist, setShowChecklist] = React.useState(false);

  React.useEffect(() => {
    const checkChecklistCompletion = async () => {
      // Get the current date in AEDT
      const currentDate = moment().tz('Australia/Sydney').format('YYYY-MM-DD');

      // Get the date when the user last completed the checklist
      const lastCompletedDate = await AsyncStorage.getItem('checklistCompletedDate');

      // Show the checklist if it hasn't been completed today
      setShowChecklist(currentDate !== lastCompletedDate);
    };

    checkChecklistCompletion();
  }, []);

  const handleChecklistCompletion = async () => {
    // Get the current date in AEDT
    const currentDate = moment().tz('Australia/Sydney').format('YYYY-MM-DD');

    // Store the date when the user completed the checklist
    await AsyncStorage.setItem('checklistCompletedDate', currentDate);

    // Hide the checklist
    setShowChecklist(false);
  };

  if (showChecklist) {
    return (
      <View>
        {/* Render your checklist here */}
        <Text>Checklist</Text>
        <Button title="Complete Checklist" onPress={handleChecklistCompletion} />
      </View>
    );
  }

  return (
    <View>
      {/* Render your app here */}
      <Text>App</Text>
    </View>
  );
};

export default App;

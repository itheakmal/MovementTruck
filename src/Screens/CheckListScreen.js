import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import StyledTable from '../Components/StyledTable';
import UserContext from '../Contexts/UserContext';
import styles from '../Utils/Styles';
import Button from '../Components/Button';
import { useNavigation } from '@react-navigation/native';
import ButtonTable from '../Components/ButtonTable';
import Input from '../Components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list'

import moment from 'moment-timezone';

import { getChecklist, getVehicles, numberVerify, submitCheckList } from '../Services/networkRequests';

const CheckListScreen = (props) => {
  const { user } = useContext(UserContext);
  const [checklist, setChecklist] = useState({})
  const [checklistDriver, setChecklistDriver] = useState([])
  const [checklistVehicle, setChecklistVehicle] = useState([])
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [driverCheckAll, setDriverCheckAll] = useState(false)
  const [oldregistration, setOldregistration] = useState(user?.registration)
  const [driverCheck, setDriverCheck] = useState({
    fatigue: false,
    drugs: false,
    alchohal: false
  })
  const [truckCheckAll, setTruckCheckAll] = useState(false)
  const [truckCheck, setTruckCheck] = useState({
    fluid: false,
    tread: false,
    brake: false,
    lights: false,
    windscreen: false,
    wipers: false,
    camera: false,
    belts: false,
    hydraulic: false,
    horn: false
  })
  const [formFields, setFormFields] = useState({
    registrationNumber: 0,
    odometer: '',
    signature: '',
    confirm: true
  })
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const data = await getChecklist()
      const vehiclesData = await getVehicles()
      // console.log('vehiclesData', vehiclesData)
      const temp = vehiclesData.map((item, index)=>{
        if (user?.registration === item.car_number_plate) {
          console.log('current', current)
          setCurrent({key:item.id, value: item.car_number_plate})
        }
        return {key:item.id, value: item.car_number_plate}
      })
      // console.log('temp', temp)
      setData(temp)
      // console.log(data)
      const vehicle_checklist = data.vehicle_checklist.map((item, index) => ({ title: item, id: index, value: false }))
      const driver_checklist = data.driver_checklist.map((item, index) => ({ title: item, id: index, value: false }))
      setChecklist({ vehicle_checklist, driver_checklist })
      setChecklistDriver(driver_checklist)
      setChecklistVehicle(vehicle_checklist)
      // console.log('driver_checklist', s)
    }
    fetchData()
    // formFields.registrationNumber= user.registration
    setFormFields((prev) => ({ ...prev, registrationNumber: user?.registration }))
    console.log('user', user)
  }, [])

  const handleChecklistCompletion = async () => {
    const currentDate = moment().tz('Australia/Sydney').format('YYYY-MM-DD');
    await AsyncStorage.setItem('checklistCompletedDate', currentDate);
    console.log('currentDate', currentDate)
    props.setShowChecklist(false);
  };
  const handleSubmit = async () => {
    // Handle form submission here
    // let notChecked = []
    console.log('driverCheck========>', checklistDriver)
    console.log('checklistVehicle', checklistVehicle)
    const notCheckedDriver = Object.values(checklistDriver).filter(item => !item)
    const notCheckedTruck = Object.values(checklistVehicle).filter(item => !item)
    // const notCheckedTruck = truckCheck.filter(item=>!item)
    if (notCheckedDriver.length) {
      alert('Please select all Driver checkboxes')
      return
    }
    if (notCheckedTruck.length) {
      alert('Please select all Truck checkboxes')
      return
    }

    if (oldregistration !== formFields.registrationNumber) {
      // call the api here to verify the number
      if (formFields.registrationNumber !== '') {
        // const isVerified = await numberVerify(formFields.registrationNumber)
        // if (!isVerified) {
        //   alert('Registration Number is not verified')
        //   return
        // }
      } else {
        alert('Registration Number is required')
        return
      }

    }
    if (!formFields.confirm || formFields.odometer === '' || formFields.signature === '') {
      alert('Please fill in all the fields')
      return
    }

    const formSubmit = await submitCheckList({ checklistDriver:checklistDriver.map(item=>item.title), checklistVehicle:checklistVehicle.map(item=>item.title), ...formFields, driver_id: user.id, vehicle_id: user.vehicle_id, accreditation_number: user.accreditation_number })
    if (formSubmit) {

      handleChecklistCompletion()
    } else {
      alert('Some error occured, please try again')
      return
    }
    // navigation.navigate('Jobs');

  };
  const handleCheckAll = (arg) => {
    // Handle form submission here
    if (arg) {
      const newState = checklistDriver.map(obj => {
        return { ...obj, value: !driverCheckAll };
      });
      setChecklistDriver(newState);
      setDriverCheckAll(!driverCheckAll)
      // setDriverCheck({
      //   fatigue: !driverCheckAll,
      //   drugs: !driverCheckAll,
      //   alchohal: !driverCheckAll
      // })
    } else {
      const newState = checklistVehicle.map(obj => {
        return { ...obj, value: !truckCheckAll };
      });
      setChecklistVehicle(newState);
      setTruckCheckAll(!truckCheckAll)
    }
  };

  const handleCheckSingle = (param, newValue, driver = false) => {
    if (driver) {
      const newState = checklistDriver.map(obj => {
        if (obj.id === param) {
          return { ...obj, value: newValue };
        }
        return obj;
      });
      setChecklistDriver(newState);
    } else {
      const newState = checklistVehicle.map(obj => {
        if (obj.id === param) {
          return { ...obj, value: newValue };
        }
        return obj;
      });
      setChecklistVehicle(newState)
    }
  };

  const onChangeOdometer = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("please enter numbers only");
        return
      }
    }
    setFormFields((prev) => ({ ...prev, odometer: newText }));
  }

  return (
    <SafeAreaView style={styles.checkListcontainer}>
      <ScrollView>
        {/* <View style={styles.checkListWrapper}> */}
        <Text style={styles.title}>Welcome, {user?.username}</Text>
        <View style={styles.checklistHeading}>
          <Text style={styles.checklistHeadingText}>Drivers Check List:</Text>
          <ButtonTable children={'Select All'} onPress={() => handleCheckAll(true)} />
        </View>
        {!!(checklistDriver) && checklistDriver?.map(checklistItem => (
          <View key={checklistItem.id} style={styles.checkboxWrap}>
            <CheckBox
              tintColors={{
                true: 'red',
                false: 'black'
              }}
              disabled={false}
              value={checklistItem.value}
              onValueChange={(newValue) => handleCheckSingle(checklistItem.id, newValue, true)}
            />
            <Text style={styles.checkboxText}>{checklistItem.title}</Text>
          </View>
        ))}
        <View style={styles.checklistHeading}>
          <Text style={styles.checklistHeadingText}>Vehicle Check List:</Text>
          <ButtonTable children={'Select All'} onPress={() => handleCheckAll(false)} />
        </View>

        {!!(checklistVehicle) && checklistVehicle?.map(checklistItem => (
          <View key={checklistItem.id} style={styles.checkboxWrap}>
            <CheckBox
              tintColors={{
                true: 'red',
                false: 'black'
              }}
              disabled={false}
              value={checklistItem.value}
              onValueChange={(newValue) => handleCheckSingle(checklistItem.id, newValue)}
            />
            <Text style={styles.checkboxText}>{checklistItem.title}</Text>
          </View>
        ))}


        <View style={styles.sectionStarter}>
          <Text style={styles.label}>Driver’s Full Name</Text>
          <Input
            // onChangeText={setEmail}
            value={user?.username}
            style={styles.input}
            editable={false}
            disabled
          />
        </View>
        <View>
          <Text style={styles.label}>Driver’s Accreditation Number</Text>
          <Input
            // onChangeText={setEmail}
            value={user?.accreditation_number.toString()}
            style={styles.input}
            editable={false}
            disabled
          />
        </View>
        <View>
          <Text style={styles.label}>Vehicle Registration Number </Text>
          <SelectList
            inputStyles={{color: '#333'}}
            dropdownTextStyles={{color: '#333'}}
            setSelected={(val) => setFormFields((prev) => ({ ...prev, registrationNumber: val }))}
            data={data}
            save="value"
            defaultOption={current}
            // style={styles.input}
          />
          {/* <Input
            onChangeText={(text) => setFormFields((prev) => ({ ...prev, registrationNumber: text }))}
            value={formFields.registrationNumber.toString()}
            style={styles.input}
            keyboardType='numeric'
          /> */}
        </View>
        <View>
          <Text style={styles.label}>Vehicle Odometer</Text>
          <Input
            onChangeText={(text) => onChangeOdometer(text)}
            value={formFields.username}
            style={styles.input}
            maxLength={7}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Text style={styles.label}>Signature</Text>
          <Input
            onChangeText={(text) => setFormFields((prev) => ({ ...prev, signature: text }))}
            value={formFields.username}
            style={styles.input}
          />
        </View>
        <View style={styles.checkboxWrap}>
          <CheckBox
            tintColors={{
              true: 'red',
              false: 'black'
            }}
            disabled={false}
            value={formFields.confirm}
            onValueChange={(newVal) => setFormFields((prev) => ({ ...prev, confirm: newVal }))}
          />
          <Text style={styles.checkboxText}>{`I confirm that all the information I have provide is correct.`}</Text>
        </View>
        <View>
          <Button children="Submit" onPress={handleSubmit} />
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckListScreen;

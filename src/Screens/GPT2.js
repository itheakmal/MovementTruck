import React from 'react';
import { View, Text, TextInput, Switch, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Form = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [termsAccepted, setTermsAccepted] = React.useState(false);

  const handleSubmit = () => {
    // Handle form submission here
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text>Age:</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        keyboardType="numeric"
      />

      <Text>Gender:</Text>
      <Picker
        selectedValue={gender}
        onValueChange={setGender}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          value={termsAccepted}
          onValueChange={setTermsAccepted}
        />
        <Text>I accept the terms and conditions</Text>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Form;

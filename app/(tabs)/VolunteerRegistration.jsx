import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location'; // Import Expo Location API
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for the calendar icon
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the location icon

const VolunteerRegistration = () => {
  const navigation = useNavigation();

  // States for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [nearestMTR, setNearestMTR] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle date change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Fetch and set current location when location icon is pressed
  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;

      // Perform reverse geocoding to get the address
      let [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (address) {
        const formattedAddress = `${address.name || ''}, ${address.street || ''}, ${address.city || ''}, ${address.region || ''}, ${address.country || ''}`.trim();
        setLocation(formattedAddress);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again.');
      console.log(error);
    }
  };

  const handleSubmit = () => {
    // Add form submission logic here
    console.log('Form Submitted:', { name, email, location, startDate, nearestMTR });
    Alert.alert('Success', 'Registration submitted successfully!');
    // You can navigate to another screen or reset the form here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with Logo and Text */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>SCDC SMART</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Volunteering Registration Credentials</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Location Input with Icon */}
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.inputField}
          placeholder="Location of Volunteering"
          placeholderTextColor="#888"
          value={location}
          onChangeText={setLocation}
          editable={true} // Make it editable again
        />
        <TouchableOpacity onPress={fetchLocation} style={styles.iconContainer}>
          <Ionicons name="location-outline" size={24} color="#19235E" />
        </TouchableOpacity>
      </View>

      {/* Date Picker Input with Calendar Icon */}
      <View style={styles.inputWithIcon}>
        <TextInput
          style={styles.inputField}
          placeholder="When did you start volunteering?"
          placeholderTextColor="#888"
          value={startDate.toLocaleDateString()}
          editable={false} // Keep this read-only; user can use the icon to open date picker
        />
        <TouchableOpacity onPress={showDatepicker} style={styles.iconContainer}>
          <Icon name="calendar" size={24} color="#19235E" />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Nearest MTR Station"
        placeholderTextColor="#888"
        value={nearestMTR}
        onChangeText={setNearestMTR}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#DDE4CB',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 20,
    marginTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#19235E',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#19235E',
    marginBottom: 30,
    marginTop: 80,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    textAlign: 'left'
  },
  iconContainer: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  submitButton: {
    width: '90%',
    backgroundColor: '#19235E',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#19235E',
    fontWeight: '500',
  },
});

export default VolunteerRegistration;

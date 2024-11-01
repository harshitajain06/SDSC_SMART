import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const SelectSport = () => {
  const [selectedSport, setSelectedSport] = useState('');
  const navigation = useNavigation();

  const handleNavigation = (type) => {
    if (selectedSport) {
      navigation.navigate('SportVideos', { sport: selectedSport, type });
    } else {
      alert('Please select a sport!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo and Heading */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://your-logo-url.com/logo.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.title}>Volunteer Learning System</Text>
      </View>

      {/* Dropdown to Select Sport */}
      <Text style={styles.label}>Select the Sport</Text>
      <Picker
        selectedValue={selectedSport}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedSport(itemValue)}
        dropdownIconColor="#007bff" // Change icon color for dropdown
      >
        <Picker.Item label="Select a sport" value="" />
        <Picker.Item label="Football" value="Football" />
        <Picker.Item label="Basketball" value="Basketball" />
        <Picker.Item label="Tennis" value="Tennis" />
        <Picker.Item label="Cricket" value="Cricket" />
      </Picker>

      {/* Navigation Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('howToPlay')}>
        <Text style={styles.buttonText}>How to Play + Rules</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleNavigation('howToAssist')}>
        <Text style={styles.buttonText}>How to Assist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -50
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SelectSport;

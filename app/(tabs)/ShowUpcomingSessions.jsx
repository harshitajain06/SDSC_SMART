// src/components/UpcomingSessions.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Legend from './Legend'; // Import the Legend component

const SESSION_TYPES = [
  { label: 'ROUTINE VOLUNTEERING STILL AVAILABLE', value: 'ROUTINE_AVAILABLE' },
  { label: 'Change in schedule', value: 'CHANGE_SCHEDULE' },
  { label: 'New Competitions', value: 'NEW_COMPETITIONS' },
  { label: 'Other Volunteering', value: 'OTHER_VOLUNTEERING' },
  { label: 'ROUTINE VOLUNTEERING OVERBOOKED', value: 'ROUTINE_OVERBOOKED' },
];

const SESSION_COLORS = {
  ROUTINE_AVAILABLE: 'blue',
  CHANGE_SCHEDULE: 'red',
  NEW_COMPETITIONS: 'green',
  OTHER_VOLUNTEERING: 'yellow',
  ROUTINE_OVERBOOKED: 'orange',
};

const ShowUpcomingSessions = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch sessions from Firestore
  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      const sessionsCol = collection(db, 'sessions');
      const sessionsSnapshot = await getDocs(sessionsCol);
      let marks = {};

      sessionsSnapshot.forEach((doc) => {
        const data = doc.data();
        const date = data.date; // Expected format: 'YYYY-MM-DD'
        const type = data.sessionType;
        marks[date] = {
          selected: true,
          marked: true,
          selectedColor: SESSION_COLORS[type],
          dots: [
            {
              key: type,
              color: SESSION_COLORS[type],
            },
          ],
        };
      });

      setMarkedDates(marks);
    } catch (error) {
      console.log('Error fetching sessions:', error);
    }
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.headerText}>SCDC SMART</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Upcoming Sessions</Text>

      {/* Loading Indicator */}
      {isLoading && <ActivityIndicator size="large" color="#19235E" />}

      {/* Calendar */}
      <Calendar
        markedDates={markedDates}
        markingType={'multi-dot'}
        theme={{
          selectedDayBackgroundColor: '#19235E',
          todayTextColor: '#19235E',
          arrowColor: '#19235E',
          dotColor: '#19235E',
          selectedDotColor: '#fff',
          selectedDayTextColor: '#fff',
          calendarBackground: '#DDE4CB',
          textSectionTitleColor: '#19235E',
          dayTextColor: '#000',
          monthTextColor: '#19235E',
          textDisabledColor: '#d9e1e8',
        }}
      />

      {/* Legend */}
      <Legend sessionTypes={SESSION_TYPES} sessionColors={SESSION_COLORS} />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#DDE4CB',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#19235E',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    color: '#19235E',
    textAlign: 'center',
  },
});

export default ShowUpcomingSessions;

// src/components/UpcomingAnnouncements.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../../config/firebase'; // Adjust the import path according to your project structure
import { collection, getDocs } from "firebase/firestore";

const UpcomingAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                // Reference to the announcements collection
                const announcementsRef = collection(db, 'announcements');
                const querySnapshot = await getDocs(announcementsRef);
                
                const fetchedAnnouncements = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                setAnnouncements(fetchedAnnouncements);
            } catch (error) {
                console.error("Error fetching announcements: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#19235E" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upcoming Announcements</Text>
            {announcements.length === 0 ? (
                <Text style={styles.noAnnouncementsText}>No announcements available.</Text>
            ) : (
                <FlatList
                    data={announcements}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.announcementContainer}>
                            <Text style={styles.announcementText}>{item.text}</Text>
                            <Text style={styles.dateText}>{new Date(item.createdAt).toLocaleString()}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DDE4CB',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#DDE4CB',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        color: '#19235E',
        textAlign: 'center',
        marginTop: 50,
    },
    noAnnouncementsText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#19235E',
    },
    announcementContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    announcementText: {
        fontSize: 16,
        color: '#19235E',
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
});

export default UpcomingAnnouncements;

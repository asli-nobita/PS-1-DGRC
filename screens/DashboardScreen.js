import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import CHOActivityScreen from './CHOActivityScreen';
import ClaimReportScreen from './ClaimReportScreen';
import AboutScreen from './AboutScreen';
import MyProfileScreen from './MyProfileScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import FeedbackScreen from './FeedbackScreen';
import ContactUsScreen from './ContactUsScreen';
import CustomAlert from './CustomModal'; 
import { callApi, apiConfig } from '../utils/api'; // Import API utilities

const Drawer = createDrawerNavigator();

// HomeContent component now accepts userId and fullName as props
function HomeContent({ userId, fullName }) {
    const navigation = useNavigation();
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchDashboardSummary = async () => {
            if (!userId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                // Call the API to get dashboard summary
                const response = await callApi(`${apiConfig.dashboardSummary}?userId=${userId}`, 'GET');

                if (response.status && response.data) {
                    setSummary(response.data);
                } else {
                    setAlertTitle('Error');
                    setAlertMessage(response.message || 'Failed to load dashboard summary.');
                    setAlertVisible(true);
                }
            } catch (error) {
                console.error('Dashboard summary fetch error:', error);
                setAlertTitle('Error');
                setAlertMessage(error.data?.message || error.message || 'An unexpected error occurred loading dashboard data.');
                setAlertVisible(true);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardSummary();
    }, [userId]); // Re-fetch if userId changes

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerWrapper}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.menuIcon} onPress={() => navigation.openDrawer()}>
                        <Icon name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Dashboard</Text>
                    <Icon name="bell-outline" size={24} color="#fff" style={styles.notificationIcon} />
                </View>

                <Text style={styles.greeting}>Namaste🙏</Text>
                {/* Display dynamic user name */}
                <Text style={styles.userName}>{fullName || 'User'}</Text>
            </View>

            <View style={styles.sliderCard}>
                {/* CORRECTED: Use require() for local image paths */}
                <Image source={require('../assets/emblem.jpeg')} style={styles.sliderImage} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />
            ) : (
                <View>
                    <View style={styles.statsRow}>
                        <View style={[styles.statBox, { backgroundColor: '#67C6E3' }]}>
                            {/* CORRECTED: Use require() for local image paths */}
                            <Image source={require('../assets/emblem.jpeg')} style={styles.statIcon} />
                            <Text style={styles.statTitle}>Total Claim Submitted</Text>
                            <Text style={styles.statValue}>{summary?.totalClaimSubmitted || 0}</Text>
                        </View>
                        <View style={[styles.statBox, { backgroundColor: '#B0F2B4' }]}>
                            {/* CORRECTED: Use require() for local image paths */}
                            <Image source={require('../assets/emblem.jpeg')} style={styles.statIcon} />
                            <Text style={styles.statTitle}>Total Claim Accepted</Text>
                            <Text style={styles.statValue}>{summary?.totalClaimAccepted || 0}</Text>
                        </View>
                    </View>

                    <View style={styles.statsRow}>
                        <View style={[styles.statBox, { backgroundColor: '#FFD89C' }]}>
                            {/* CORRECTED: Use require() for local image paths */}
                            <Image source={require('../assets/emblem.jpeg')} style={styles.statIcon} />
                            <Text style={styles.statTitle}>Total Claim Pending</Text>
                            <Text style={styles.statValue}>{summary?.totalClaimPending || 0}</Text>
                        </View>
                    </View>
                </View>
            )}

            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
            />
        </ScrollView>
    );
}

// DashboardScreen now accepts userId, fullName, onLogout, onNavigate
export default function DashboardScreen({ userId, fullName, onLogout, onNavigate }) {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: { backgroundColor: '#003f7f' },
                drawerActiveTintColor: '#FFD700',
                drawerInactiveTintColor: '#fff',
                headerShown: false,
            }}
            drawerContent={(props) => (
                <ScrollView style={styles.drawerContainer}>
                    <View style={styles.drawerHeader}>
                        {/* CORRECTED: Use require() for local image paths */}
                        <Image source={require('../assets/HealthBihar.jpeg')} style={styles.drawerLogo} />
                        <Text style={styles.drawerGreeting}>Welcome 🙏</Text>
                        {/* Display dynamic user name in drawer */}
                        <Text style={styles.drawerName}>{fullName || 'User'}</Text>
                    </View>

                    {["Home", "CHO Activity", "Claim Report", "About", "My Profile", "Change Password", "Contact Us", "Feedback"].map((label, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={styles.drawerItem}
                            onPress={() => onNavigate(label)} // Use onNavigate prop for consistent navigation
                        >
                            <Text style={styles.drawerItemText}>{label}</Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => onLogout(props.navigation)} // Call onLogout prop with navigation object
                    >
                        <Icon name="logout" size={20} color="#fff" style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        >
            {/* Pass userId and fullName to HomeContent */}
            <Drawer.Screen name="Home">
                {(props) => <HomeContent {...props} userId={userId} fullName={fullName} />}
            </Drawer.Screen>
            <Drawer.Screen name="CHO Activity" component={CHOActivityScreen} />
            <Drawer.Screen name="Claim Report" component={ClaimReportScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen name="My Profile" component={MyProfileScreen} />
            <Drawer.Screen name="Change Password" component={ChangePasswordScreen} />
            <Drawer.Screen name="Contact Us" component={ContactUsScreen} options={{ title: 'Contact Us' }} />
            <Drawer.Screen name="Feedback" component={FeedbackScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#EAF6FF' },
    headerWrapper: {
        backgroundColor: '#00C6FF',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerTop: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    menuIcon: {
        backgroundColor: '#143F6B',
        padding: 8,
        borderRadius: 10,
    },
    notificationIcon: {
        backgroundColor: '#143F6B',
        padding: 8,
        borderRadius: 10,
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
    greeting: { fontSize: 16, color: '#fff', marginTop: 10 },
    userName: { fontSize: 18, color: '#FFD700', fontWeight: 'bold' },

    sliderCard: {
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 15,
        backgroundColor: '#d1c4e9',
        alignItems: 'center',
        paddingVertical: 25,
        elevation: 5,
    },
    sliderImage: { width: 120, height: 120, resizeMode: 'contain' },

    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        flexWrap: 'wrap',
    },
    statBox: {
        width: '40%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 4,
    },
    statIcon: { width: 40, height: 40, marginBottom: 10 },
    statTitle: { fontSize: 14, color: '#143F6B', textAlign: 'center', marginBottom: 5 },
    statValue: { fontSize: 18, fontWeight: 'bold', color: '#333' },

    drawerContainer: { backgroundColor: '#003f7f', flex: 1, paddingHorizontal: 20 },
    drawerHeader: { alignItems: 'center', marginVertical: 20 },
    drawerLogo: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
    drawerGreeting: { color: '#fff', fontSize: 16 },
    drawerName: { color: '#FFD700', fontSize: 18, fontWeight: 'bold' },
    drawerItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#005fa3',
        borderRadius: 10,
        marginVertical: 5,
    },
    drawerItemText: { color: '#fff', fontSize: 16 },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#002244',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row', // For icon and text
        justifyContent: 'center',
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutText: { color: '#fff', fontWeight: 'bold' },
});

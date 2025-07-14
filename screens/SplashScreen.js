import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Define styles immediately after imports to ensure availability
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#143F6B', // Dark blue background from PPT
        paddingBottom: 50, // Space for the footer
    },
    logo: {
        width: 150, // Adjusted to fit the PPT's logo size better
        height: 150, // Adjusted to fit the PPT's logo size better
        marginBottom: 30,
        resizeMode: 'contain', // Ensures the image scales correctly within bounds
    },
    appTitle: {
        color: '#fff',
        fontSize: 28, // Slightly larger for prominence
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        color: '#fff',
        fontSize: 16, // Slightly larger for readability
        marginTop: 6,
        textAlign: 'center',
        marginBottom: 50, // Space between subtitle and footer
    },
    footerContainer: {
        position: 'absolute', // Position at the bottom
        bottom: 20,
        alignItems: 'center',
        width: '100%',
    },
    footerText: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.8, // Slightly faded for footer
        lineHeight: 18, // Spacing between lines
    },
});

export default function SplashScreen({ onFinish }) {
    useEffect(() => {
        // Simulate splash screen duration
        const timer = setTimeout(() => {
            // Call the onFinish callback provided by the parent (App.js)
            // This tells App.js to proceed to the next screen (e.g., Welcome or Dashboard)
            onFinish();
        }, 3000); // Display splash for 3 seconds

        return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    }, [onFinish]); // Dependency array: re-run effect if onFinish function changes

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.appTitle}>Health Services App</Text>
            <Text style={styles.subtitle}>Empowering Wellness Nationwide</Text>
            <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Device ID: TP1A.220624.014</Text>
                <Text style={styles.footerText}>App Version: 1.0.0</Text>
                <Text style={styles.footerText}>National Informatics Centre (NIC), Bihar</Text>
            </View>
        </View>
    );
}

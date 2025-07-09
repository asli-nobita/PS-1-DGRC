import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView, // Use SafeAreaView for better layout on iOS
} from 'react-native';

export default function WelcomeScreen({ onGetStarted, onJoinUs }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>
                <Image
                    source={{ uri: '../assets/welcome-icon.png' }} 
                    style={styles.welcomeIcon}
                />
                <Text style={styles.welcomeText}>WELCOME</Text>
            </View>

            <View style={styles.middleText}>
                <Text style={styles.heading}>Welcome to the CHO Mobile Application!</Text>
                <Text style={styles.subHeading}>Empowering Communities &{'\n'}Enabling Change.</Text>
            </View>

            <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
                <Text style={styles.getStartedText}>GET STARTED →</Text>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>
                    Don't have an account?{' '}
                    <Text style={styles.joinText} onPress={onJoinUs}>Click here to join us</Text>
                </Text>
                <Text style={styles.nicText}>Services Provided by NIC Bihar</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAF6FF', // Light blue background from PPT
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContent: {
        alignItems: 'center',
        marginTop: '10%', // Adjusted for better vertical centering
        marginBottom: 30,
    },
    welcomeIcon: {
        width: 150, // Adjusted for better visual balance
        height: 150, // Adjusted for better visual balance
        marginBottom: 10,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#143F6B',
    },
    middleText: {
        alignItems: 'center',
        marginBottom: 40, // Increased margin for spacing
    },
    heading: {
        fontSize: 18, // Adjusted for readability
        color: '#143F6B',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    subHeading: {
        fontSize: 16,
        color: '#D72638',
        textAlign: 'center',
        lineHeight: 24, // Added line height for multiline text
    },
    getStartedButton: {
        backgroundColor: '#D72638',
        paddingVertical: 15, // Increased padding for a larger button
        paddingHorizontal: 40, // Increased padding for a larger button
        borderRadius: 25, // More rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6, // Increased shadow radius
        elevation: 8, // Android shadow
        marginBottom: 50, // Increased margin
    },
    getStartedText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18, // Larger text
    },
    bottomContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
    },
    bottomText: {
        fontSize: 14, // Adjusted for readability
        color: '#333',
        marginBottom: 5,
    },
    joinText: {
        color: '#143F6B',
        fontWeight: 'bold',
    },
    nicText: {
        fontSize: 12, // Adjusted for readability
        color: '#999',
    },
});

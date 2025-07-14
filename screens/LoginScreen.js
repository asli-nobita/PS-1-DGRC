import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator, // For loading spinner
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For session management
import { callApi, apiConfig } from '../utils/api'; // Correct import for named exports
import CustomAlert from './CustomModal'; // Importing the custom alert component

export default function LoginScreen({ onLoginSuccess, onForgotPassword, onRegister, navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [alertVisible, setAlertVisible] = useState(false); // State for custom alert visibility
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleLogin = async () => {
        setLoading(true); // Start loading
        try {
            // Call the API using the imported helper function
            const response = await callApi(apiConfig.login, 'POST', {
                Username: username, // Matches your C# LoginRequest model
                Password: password, // Matches your C# LoginRequest model
            });

            // Check the 'status' property from your ApiResponse<T>
            if (response.status && response.data) {
                // Store user data in AsyncStorage upon successful login
                await AsyncStorage.setItem('userId', response.data.userId);
                await AsyncStorage.setItem('username', response.data.username);
                await AsyncStorage.setItem('fullName', response.data.fullName);
                await AsyncStorage.setItem('userToken', response.data.token); // Store the token if you use JWT

                // Call the parent's onLoginSuccess callback to handle navigation
                onLoginSuccess(response.data.userId, response.data.fullName);
            } else {
                // This block might be redundant if callApi already throws on status:false
                // But it's good for explicit handling if the API returns status:false without an HTTP error
                setAlertTitle('Login Failed');
                setAlertMessage(response.message || 'Invalid credentials. Please try again.');
                setAlertVisible(true);
            }
        } catch (error) {
            // Handle API call errors (network issues, 4xx/5xx responses, or status:false from API)
            console.error('Login error:', error);
            setAlertTitle('Error');
            // Access error.data.message if available, otherwise fallback to error.message
            setAlertMessage(error.data?.message || error.message || 'An unexpected error occurred during login.');
            setAlertVisible(true);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: '../assets/logo.png' }} 
                style={styles.logo}
            />

            <Text style={styles.title}>
                Let’s get you <Text style={{ color: '#D72638' }}>Logged in</Text> 👋
            </Text>
            <Text style={styles.subtitle}>Enter your information below 👇</Text>

            <View style={styles.inputCard}> {/* Added a card for inputs as per PPT design */}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none" // Important for usernames/emails
                />

                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        placeholderTextColor="#666"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry // Hides password characters
                    />
                    <TouchableOpacity style={styles.eyeIcon}>
                        {/* You can replace this with an actual eye icon component (e.g., from react-native-vector-icons) */}
                        <Text>👁️</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={onForgotPassword} style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" /> // Show spinner when loading
                    ) : (
                        <Text style={styles.buttonText}>LOG IN</Text>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onRegister}>
                <Text style={styles.registerText}>
                    Don't have an account?{' '}
                    <Text style={{ color: '#143F6B', fontWeight: 'bold' }}>Register</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                <Text style={styles.welcomeLink}>
                    ← Back to Welcome
                </Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Services Provided by NIC Bihar</Text>

            {/* Custom Alert Modal */}
            <CustomAlert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#EAF6FF', // Light blue background from PPT
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150, // Adjusted for better fit
        height: 150, // Adjusted for better fit
        marginBottom: 20,
        resizeMode: 'contain', // Ensures the image scales correctly
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#143F6B',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 30, // Increased margin for spacing
    },
    inputCard: {
        backgroundColor: '#fff',
        borderRadius: 15, // Rounded corners for the card
        padding: 20,
        width: '100%',
        maxWidth: 400, // Max width for larger screens
        shadowColor: '#000', // Shadow for card effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Android shadow
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#f8f8f8', // Slightly different background for input fields
        padding: 12,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        color: '#333',
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        color: '#333',
    },
    eyeIcon: {
        padding: 10,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end', // Align to the right
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#D72638', // Red color for forgot password
        fontSize: 13,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#D72638',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#D72638', // Button shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    registerText: {
        marginTop: 20,
        fontSize: 14,
        color: '#333',
    },
    welcomeLink: {
        marginTop: 10,
        fontSize: 13,
        color: '#555',
        textDecorationLine: 'underline',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        fontSize: 12,
        color: '#666',
    },
    // --- Custom Alert Styles ---
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    },
    alertContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    alertMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    alertButton: {
        backgroundColor: '#D72638', // Red color for alert button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    alertButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

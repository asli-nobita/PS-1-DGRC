import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator, // For loading spinner
    Modal, // For custom alert
} from 'react-native';
import { callApi, apiConfig } from '../utils/api';

// --- Custom Alert Modal Component (can be moved to a separate file like components/CustomAlert.js) ---
// This is duplicated here for self-containment, but ideally would be a shared component.
const CustomAlert = ({ visible, title, message, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertTitle}>{title}</Text>
                    <Text style={styles.alertMessage}>{message}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.alertButton}>
                        <Text style={styles.alertButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default function RegisterScreen({ onRegisterSuccess, onLogin, navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // Added as per API model
    const [mobileNumber, setMobileNumber] = useState(''); // Added as per API model
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [alertVisible, setAlertVisible] = useState(false); // State for custom alert visibility
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleRegister = async () => {
        setLoading(true); // Start loading
        try {
            // Call the API using the imported helper function
            const response = await callApi(apiConfig.register, 'POST', {
                Username: username,
                Password: password,
                FullName: fullName, // Required by API
                Email: email,
                MobileNumber: mobileNumber, // Required by API
            });

            // Check the 'status' property from your ApiResponse<T>
            if (response.status) {
                setAlertTitle('Registration Successful');
                setAlertMessage(response.message || 'Account created successfully!');
                setAlertVisible(true);
                // Call the parent's onRegisterSuccess callback to handle navigation (e.g., back to Login)
                onRegisterSuccess();
            } else {
                // This block might be redundant if callApi already throws on status:false
                setAlertTitle('Registration Failed');
                setAlertMessage(response.message || 'Could not create account. Please try again.');
                setAlertVisible(true);
            }
        } catch (error) {
            // Handle API call errors (network issues, 4xx/5xx responses, or status:false from API)
            console.error('Registration error:', error);
            setAlertTitle('Error');
            setAlertMessage(error.data?.message || error.message || 'An unexpected error occurred during registration.');
            setAlertVisible(true);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://placehold.co/377x150/007bff/ffffff?text=APP+LOGO' }} // Placeholder for your logo
                style={styles.logo}
            />

            <Text style={styles.title}>
                Let’s get you <Text style={{ color: '#143F6B' }}>Registered</Text> 👋
            </Text>
            <Text style={styles.subtitle}>Fill your details to create an account 👇</Text>

            <View style={styles.inputCard}> {/* Added a card for inputs as per PPT design */}
                <TextInput
                    style={styles.input}
                    placeholder="Full Name" // Added as per API model
                    placeholderTextColor="#666"
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile Number" // Added as per API model
                    placeholderTextColor="#666"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="numeric"
                    maxLength={10}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#666"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" /> // Show spinner when loading
                    ) : (
                        <Text style={styles.buttonText}>REGISTER</Text>
                    )}
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={onLogin}>
                <Text style={styles.loginText}>
                    Already have an account?{' '}
                    <Text style={{ color: '#D72638', fontWeight: 'bold' }}>Login</Text>
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
    button: {
        backgroundColor: '#143F6B', // Changed to blue as per PPT for Register button
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#143F6B', // Button shadow
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
    loginText: {
        marginTop: 20,
        fontSize: 14,
        color: '#333',
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        fontSize: 12,
        color: '#666',
    },
    // --- Custom Alert Styles (Duplicated for self-containment) ---
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

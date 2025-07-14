import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure this package is installed

// Import your screen components
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPassword';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import ResetPasswordScreen from './screens/ResetPassword';
import DashboardScreen from './screens/DashboardScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import CHOActivityScreen from './screens/CHOActivityScreen';
import ClaimReportScreen from './screens/ClaimReportScreen';
import AboutScreen from './screens/AboutScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import TeamDetailsScreen from './screens/TeamDetailsScreen';
import ListOfAshaAnmScreen from './screens/ListofAshaAnmScreen';
import InsertActivityScreen from './screens/InsertActivityScreen';
import FinalSubmissionScreen from './screens/FinalSubmissionScreen';
import ContactUsScreen from './screens/ContactUsScreen';


const Stack = createStackNavigator();

export default function App() {
    const [initialRoute, setInitialRoute] = useState('Splash');
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [loggedInFullName, setLoggedInFullName] = useState(null);
    const [appIsReady, setAppIsReady] = useState(false); // To control when navigation container mounts

    // States for Forgot Password flow
    const [forgotPasswordUserId, setForgotPasswordUserId] = useState(null);
    const [forgotPasswordOtp, setForgotPasswordOtp] = useState(null);

    useEffect(() => {
        async function prepareApp() {
            try {
                // Check login status from AsyncStorage
                const userId = await AsyncStorage.getItem('userId');
                const fullName = await AsyncStorage.getItem('fullName');

                if (userId && fullName) {
                    setLoggedInUserId(userId);
                    setLoggedInFullName(fullName);
                    setInitialRoute('Dashboard'); // If logged in, go to Dashboard
                } else {
                    setInitialRoute('Welcome'); // Otherwise, go to Welcome
                }
            } catch (e) {
                console.warn("Failed to load login status:", e);
                // Fallback to Welcome if something goes wrong
                setInitialRoute('Welcome');
            } finally {
                // Tell the app to render the main UI after a short delay for splash screen effect
                // Even if splash screen has its own timer, this ensures state is set
                setTimeout(() => {
                    setAppIsReady(true);
                }, 1000); // Give a small buffer after initial check for smoother transition
            }
        }

        prepareApp();
    }, []);

    // --- Callbacks for screen interactions ---

    const handleLoginSuccess = useCallback((userId, fullName, navigation) => {
        setLoggedInUserId(userId);
        setLoggedInFullName(fullName);
        if (navigation) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        }
    }, []);

    const handleLogout = useCallback(async (navigation) => {
        await AsyncStorage.clear(); // Clear all stored user data
        setLoggedInUserId(null);
        setLoggedInFullName(null);
        if (navigation) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, []);

    const handleRegisterSuccess = useCallback((navigation) => {
        if (navigation) {
            navigation.navigate('Login'); // After successful registration, go to Login
        }
    }, []);

    const handleWelcomeGetStarted = useCallback((navigation) => {
        if (navigation) {
            navigation.navigate('Login');
        }
    }, []);

    const handleWelcomeJoinUs = useCallback((navigation) => {
        if (navigation) {
            navigation.navigate('Register');
        }
    }, []);

    // Forgot Password Flow
    const handleForgotPasswordOtpSent = useCallback((userId, navigation) => {
        setForgotPasswordUserId(userId);
        if (navigation) {
            navigation.navigate('OTPVerificationScreen'); // Navigate to OTP verification screen
        }
    }, []);

    const handleOtpVerified = useCallback((userId, otp, navigation) => {
        setForgotPasswordUserId(userId);
        setForgotPasswordOtp(otp);
        if (navigation) {
            navigation.navigate('ResetPassword'); // Navigate to Reset Password screen
        }
    }, []);

    const handlePasswordResetSuccess = useCallback((navigation) => {
        setForgotPasswordUserId(null);
        setForgotPasswordOtp(null);
        if (navigation) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, []);

    // Change Password Flow (with OTP)
    const handleSendOtpForChangePassword = useCallback((userId, navigation) => {
        // This callback would trigger the API call to send OTP for change password
        // and then navigate to a specific OTP verification screen for change password
        // For simplicity, we'll assume the ChangePasswordScreen handles its own OTP sending/verification internally
        if (navigation) {
            // You might navigate to a dedicated OTP screen for change password if the flow is separate from forgot password
            // For now, ChangePasswordScreen will manage its own OTP logic based on its internal state
        }
    }, []);

    const handlePasswordChanged = useCallback((navigation) => {
        if (navigation) {
            navigation.goBack(); // Go back to profile or dashboard after changing password
        }
    }, []);

    const handleFeedbackSubmitted = useCallback((navigation) => {
        if (navigation) {
            navigation.goBack(); // Go back to previous screen after submitting feedback
        }
    }, []);

    // General navigation handler for drawer/menu items
    const handleNavigateFromDashboard = useCallback((screenName, navigation) => {
        if (navigation) {
            navigation.navigate(screenName);
        }
    }, []);


    // Only render NavigationContainer once app is ready
    if (!appIsReady) {
        // SplashScreen will handle its own timer and then call setAppIsReady(true)
        return <SplashScreen onFinish={() => setAppIsReady(true)} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>

                {/* Auth Flow Screens */}
                <Stack.Screen name="Splash" options={{ headerShown: false }}>
                    {(props) => <SplashScreen {...props} onFinish={() => setAppIsReady(true)} />}
                </Stack.Screen>

                <Stack.Screen name="Welcome" options={{ headerShown: false }}>
                    {(props) => <WelcomeScreen {...props} onGetStarted={() => handleWelcomeGetStarted(props.navigation)} onJoinUs={() => handleWelcomeJoinUs(props.navigation)} />}
                </Stack.Screen>

                <Stack.Screen name="Login" options={{ title: 'Login', headerShown: false }}>
                    {(props) => <LoginScreen {...props} onLoginSuccess={(userId, fullName) => handleLoginSuccess(userId, fullName, props.navigation)} onForgotPassword={() => props.navigation.navigate('ForgotPassword')} onRegister={() => handleWelcomeJoinUs(props.navigation)} />}
                </Stack.Screen>

                <Stack.Screen name="Register" options={{ title: 'Register', headerShown: false }}>
                    {(props) => <RegisterScreen {...props} onRegisterSuccess={() => handleRegisterSuccess(props.navigation)} onLogin={() => handleWelcomeGetStarted(props.navigation)} />}
                </Stack.Screen>

                {/* Forgot Password Flow */}
                <Stack.Screen name="ForgotPassword" options={{ title: 'Forgot Password' }}>
                    {(props) => <ForgotPasswordScreen {...props} onOtpSent={(userId) => handleForgotPasswordOtpSent(userId, props.navigation)} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>
                <Stack.Screen name="OTPVerificationScreen" options={{ title: 'OTP Verification' }}>
                    {(props) => <OTPVerificationScreen {...props} userId={forgotPasswordUserId} onOtpVerified={(userId, otp) => handleOtpVerified(userId, otp, props.navigation)} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>
                <Stack.Screen name="ResetPassword" options={{ title: 'Reset Password' }}>
                    {(props) => <ResetPasswordScreen {...props} userId={forgotPasswordUserId} otp={forgotPasswordOtp} onPasswordResetSuccess={() => handlePasswordResetSuccess(props.navigation)} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                {/* Main App Screens (after login) */}
                <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
                    {(props) => <DashboardScreen {...props} userId={loggedInUserId} fullName={loggedInFullName} onLogout={() => handleLogout(props.navigation)} onNavigate={(screenName) => handleNavigateFromDashboard(screenName, props.navigation)} />}
                </Stack.Screen>

                <Stack.Screen name="Feedback" options={{ title: 'Feedback' }}>
                    {(props) => <FeedbackScreen {...props} userId={loggedInUserId} onFeedbackSubmitted={() => handleFeedbackSubmitted(props.navigation)} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="CHO Activity" options={{ title: 'CHO Activity' }}>
                    {(props) => <CHOActivityScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="Claim Report" options={{ title: 'Claim Report' }}>
                    {(props) => <ClaimReportScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="About" options={{ title: 'About' }}>
                    {(props) => <AboutScreen {...props} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="My Profile" options={{ title: 'My Profile' }}>
                    {(props) => <MyProfileScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="Change Password" options={{ title: 'Change Password' }}>
                    {(props) => <ChangePasswordScreen {...props} userId={loggedInUserId} onPasswordChanged={() => handlePasswordChanged(props.navigation)} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="Team Details" options={{ title: 'Team Details' }}>
                    {(props) => <TeamDetailsScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="ListOfAshaAnm" options={{ title: 'ASHA & ANM List' }}>
                    {(props) => <ListOfAshaAnmScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="Insert Activity" options={{ title: 'Insert Activity' }}>
                    {(props) => <InsertActivityScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="Final Submission" options={{ title: 'Final Submission' }}>
                    {(props) => <FinalSubmissionScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

                <Stack.Screen name="Contact Us" options={{ title: 'Contact Us' }}>
                    {(props) => <ContactUsScreen {...props} onBack={() => props.navigation.goBack()} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

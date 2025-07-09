import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure this package is installed

// Import your screen components
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
// You'll add imports for Dashboard, ClaimReport, MyProfile, etc., here as you create them
// import DashboardScreen from './screens/DashboardScreen';
// import ClaimReportScreen from './screens/ClaimReportScreen';
// import MyProfileScreen from './screens/MyProfileScreen';
// import ChangePasswordScreen from './screens/ChangePasswordScreen';
// import FeedbackScreen from './screens/FeedbackScreen';
// import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
// import OtpVerificationScreen from './screens/OtpVerificationScreen';
// import ResetPasswordScreen from './screens/ResetPasswordScreen';


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
                // Simulate any initial loading or data fetching for the splash screen
                // For example, checking login status from AsyncStorage
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
                console.warn(e);
                // Fallback to Welcome if something goes wrong
                setInitialRoute('Welcome');
            } finally {
                // Tell the app to render the main UI
                setAppIsReady(true);
            }
        }

        prepareApp();
    }, []);

    const handleLoginSuccess = useCallback((userId, fullName) => {
        setLoggedInUserId(userId);
        setLoggedInFullName(fullName);
        // Use navigation.navigate if you have a ref to navigator, or simply update state
        // For simplicity with react-navigation, we'll navigate directly here
        // In a real app, you might use a navigation service or context
        // For now, we'll rely on the Stack.Navigator's initialRouteName update
        // Or, if already mounted, use navigation.reset
        // For this example, we'll use a simple navigate from the screen itself
        // which will be handled by the screen's onLoginSuccess prop
    }, []);

    const handleLogout = useCallback(async (navigation) => {
        await AsyncStorage.clear(); // Clear all stored user data
        setLoggedInUserId(null);
        setLoggedInFullName(null);
        // Navigate back to Login or Welcome screen
        if (navigation) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        }
    }, []);

    const handleRegisterSuccess = useCallback((navigation) => {
        // After successful registration, navigate to Login
        if (navigation) {
            navigation.navigate('Login');
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

    const handleForgotPasswordOtpSent = useCallback((userId, navigation) => {
        setForgotPasswordUserId(userId);
        if (navigation) {
            navigation.navigate('OtpVerification');
        }
    }, []);

    const handleOtpVerified = useCallback((userId, otp, navigation) => {
        setForgotPasswordUserId(userId);
        setForgotPasswordOtp(otp);
        if (navigation) {
            navigation.navigate('ResetPassword');
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

    const handlePasswordChanged = useCallback((navigation) => {
        if (navigation) {
            navigation.goBack(); // Go back to profile or dashboard
        }
    }, []);

    const handleFeedbackSubmitted = useCallback((navigation) => {
        if (navigation) {
            navigation.goBack(); // Go back to previous screen
        }
    }, []);


    // Only render NavigationContainer once app is ready
    if (!appIsReady) {
        // We'll manage the splash screen display directly within the App component
        // or let SplashScreen handle its own timer and then call setAppIsReady
        // For now, we'll use a simple loading state.
        // The SplashScreen component itself will handle the timer and call onFinish
        return <SplashScreen onFinish={() => setAppIsReady(true)} />;
    }


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Splash" options={{ headerShown: false }}>
                    {(props) => <SplashScreen {...props} onFinish={() => setAppIsReady(true)} />}
                </Stack.Screen>

                <Stack.Screen name="Welcome" options={{ headerShown: false }}>
                    {(props) => <WelcomeScreen {...props} onGetStarted={() => handleWelcomeGetStarted(props.navigation)} onJoinUs={() => handleWelcomeJoinUs(props.navigation)} />}
                </Stack.Screen>

                <Stack.Screen name="Login" options={{ title: 'Login', headerShown: false }}>
                    {(props) => <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} onForgotPassword={() => props.navigation.navigate('ForgotPassword')} onRegister={() => handleWelcomeJoinUs(props.navigation)} />}
                </Stack.Screen>

                <Stack.Screen name="Register" options={{ title: 'Register', headerShown: false }}>
                    {(props) => <RegisterScreen {...props} onRegisterSuccess={() => handleRegisterSuccess(props.navigation)} onLogin={() => handleWelcomeGetStarted(props.navigation)} />}
                </Stack.Screen>

                {/* Example of how you would add other screens */}
                {/* <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
          {(props) => <DashboardScreen {...props} userId={loggedInUserId} fullName={loggedInFullName} onLogout={() => handleLogout(props.navigation)} onNavigate={(screenName) => props.navigation.navigate(screenName)} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="ClaimReport" options={{ title: 'Claim Report' }}>
          {(props) => <ClaimReportScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="MyProfile" options={{ title: 'My Profile' }}>
          {(props) => <MyProfileScreen {...props} userId={loggedInUserId} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="ChangePassword" options={{ title: 'Change Password' }}>
          {(props) => <ChangePasswordScreen {...props} userId={loggedInUserId} onPasswordChanged={() => handlePasswordChanged(props.navigation)} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="Feedback" options={{ title: 'Feedback' }}>
          {(props) => <FeedbackScreen {...props} userId={loggedInUserId} onFeedbackSubmitted={() => handleFeedbackSubmitted(props.navigation)} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="ForgotPassword" options={{ title: 'Forgot Password' }}>
          {(props) => <ForgotPasswordScreen {...props} onOtpSent={(userId) => handleForgotPasswordOtpSent(userId, props.navigation)} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="OtpVerification" options={{ title: 'OTP Verification' }}>
          {(props) => <OtpVerificationScreen {...props} userId={forgotPasswordUserId} onOtpVerified={(userId, otp) => handleOtpVerified(userId, otp, props.navigation)} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

                {/* <Stack.Screen name="ResetPassword" options={{ title: 'Reset Password' }}>
          {(props) => <ResetPasswordScreen {...props} userId={forgotPasswordUserId} otp={forgotPasswordOtp} onPasswordResetSuccess={() => handlePasswordResetSuccess(props.navigation)} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen> */}

            </Stack.Navigator>
        </NavigationContainer>
    );
}

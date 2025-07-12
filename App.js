import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPassword from './screens/ForgotPassword';
import OTPScreen from './screens/OTPScreen';     // Screen 2
import ResetPassword from './screens/ResetPassword';
import Dashboard from './screens/DashboardScreen';     // Screen 3
import FeedbackScreen from './screens/FeedbackScreen';
import CHOActivityScreen from './screens/CHOActivityScreen';
import ClaimReportScreen from './screens/ClaimReportScreen';
import AboutScreen from './screens/AboutScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import TeamDetailsScreen from './screens/TeamDetailsScreen';
import ListOfAshaAnmScreen from './screens/ListofAshaAnmScreen';
import InsertActivityScreen from './screens/InsertActivityScreen';
import OTPVerificationScreen from './screens/OTPVerificationScreen';
import FinalSubmissionScreen from './screens/FinalSubmissionScreen';
import ContactUsScreen from './screens/ContactUsScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword}/>
        <Stack.Screen name="Dashboard" component={Dashboard}  />
        <Stack.Screen name="Feedback" component={FeedbackScreen}  />
        <Stack.Screen name="CHO Activity" component={CHOActivityScreen} />
        <Stack.Screen name="Claim Report" component={ClaimReportScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="My Profile" component={MyProfileScreen} />
        <Stack.Screen name="Change Password" component={ChangePasswordScreen} />
        <Stack.Screen name="Team Details" component={TeamDetailsScreen} />
        <Stack.Screen name="ListOfAshaAnm" component={ListOfAshaAnmScreen} />
        <Stack.Screen name="InsertActivity" component={InsertActivityScreen} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
        <Stack.Screen name="FinalSubmission" component={FinalSubmissionScreen} />
        <Stack.Screen name="Contact Us" component={ContactUsScreen} />
        

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image
} from 'react-native';

export default function OTPVerificationScreen({ route, navigation }) {
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const { hsc, year, month, activity, source, numerator, denominator, percentage } = route.params;



  useEffect(() => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
    console.log('Generated OTP:', otp);
    Alert.alert('✅ Successful Submission', `Your OTP for final submission is: ${otp}`);
  }, []);

  const handleVerify = () => {
    if (otpInput === generatedOtp) {
      Alert.alert('✅ OTP Verified', 'Your data has been finalized.');
      navigation.navigate('FinalSubmission', route.params);
    } else {
      Alert.alert('❌ Invalid OTP', 'Please enter the correct 6-digit OTP.');
    }
  };

  return (
    <View style={styles.container}>
      {/* OTP Graphic */}
      <Image
        source={require('../assets/OTPicon.png')} // Add your own OTP icon in assets
        style={styles.otpImage}
      />

      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>Please enter the 4-digit OTP sent to you</Text>

      <TextInput
        style={styles.otpInput}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otpInput}
        onChangeText={setOtpInput}
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  otpImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B22222',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  otpInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding: 15,
    fontSize: 18,
    letterSpacing: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#B22222',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3,
  },
  verifyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

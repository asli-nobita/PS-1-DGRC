import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <Image source={require('../assets/welcome-icon.png')} style={styles.welcomeIcon} />
        <Text style={styles.welcomeText}>WELCOME</Text>
      </View>

      <View style={styles.middleText}>
        <Text style={styles.heading}>Welcome to the CHO Mobile Application!</Text>
        <Text style={styles.subHeading}>Empowering Communities &{'\n'}Enabling Change.</Text>
      </View>

      <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.getStartedText}>Login ➤</Text>
      </TouchableOpacity>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>
          Don't have an account?{' '}
          <Text style={styles.joinText} onPress={() => navigation.navigate('Register')}>Click here to join us</Text>
        </Text>
        <Text style={styles.nicText}>Services Provided by NIC Bihar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF6FF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContent: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: 30
  },
  welcomeIcon: {
    width: 199,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#143F6B'
  },
  middleText: {
    alignItems: 'center',
    marginBottom: 20
  },
  heading: {
    fontSize: 16,
    color: '#143F6B',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8
  },
  subHeading: {
    fontSize: 16,
    color: '#D72638',
    textAlign: 'center'
  },
  getStartedButton: {
    backgroundColor: '#D72638',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30
  },
  getStartedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  bottomContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20
  },
  bottomText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5
  },
  joinText: {
    color: '#143F6B',
    fontWeight: 'bold'
  },
  nicText: {
    fontSize: 10,
    color: '#999'
  }
});

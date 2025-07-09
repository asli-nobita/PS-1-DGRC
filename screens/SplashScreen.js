import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => navigation.replace('Welcome'), 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.appTitle}>Health Services App</Text>
      <Text style={styles.subtitle}>Empowering Wellness Nationwide</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#143F6B' },
  logo: { width: 377, height: 150, marginBottom: 30 },
  appTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: '#fff', fontSize: 14, marginTop: 6 },
});

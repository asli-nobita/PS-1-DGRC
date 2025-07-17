import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function CallUsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Go Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>⬅</Text>
        </TouchableOpacity>

        {/* Logo & Title */}
        <Image source={require('../assets/HealthBihar.jpeg')} style={styles.logo} />
        <Text style={styles.title}>Call Us</Text>
      </View>

      {/* Content */}
      <View style={styles.body}>
        <Text style={styles.infoText}>
          📞 For any queries, please reach out to your nearest health center or call the district health office.{"\n\n"}
          Our support team is available during working hours to assist ANM, ASHA and CHO workers.
        </Text>
        <Text style={styles.contactNumber}>Toll-Free: 1800-123-4567</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6FF', padding: 16 },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 0,
    padding: 10,
  },
  backText: {
    fontSize: 22,
    color: '#143F6B',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003f7f',
  },
  body: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  contactNumber: {
    fontSize: 18,
    color: '#B22222',
    fontWeight: 'bold',
  },
});

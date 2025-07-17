import React from 'react';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, ScrollView } from 'react-native';

export default function ContactUsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      
      <Image source={require('../assets/contact.jpeg')} style={styles.icon} />
      <Text style={styles.heading}>Contact Us</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📞 Support Helpline</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:1800123456')}>
          <Text style={styles.link}>1800-123-456</Text>
        </TouchableOpacity>

        <Text style={styles.label}>📧 NIC (Technical Support)</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:nicsupport@bihar.gov.in')}>
          <Text style={styles.link}>nicsupport@bihar.gov.in</Text>
        </TouchableOpacity>

        <Text style={styles.label}>🏥 Health Dept (Claim Related Support)</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:healthclaims@bihar.gov.in')}>
          <Text style={styles.link}>healthclaims@bihar.gov.in</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>
        We are here to assist you with any queries or technical issues.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF6FF',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 10,
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#003f7f',
    marginRight: 6,
  },
  backText: {
    fontSize: 18,
    color: '#003f7f',
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003f7f',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B22222',
    marginTop: 15,
  },
  link: {
    fontSize: 15,
    color: '#1E90FF',
    marginTop: 4,
  },
  footer: {
    textAlign: 'center',
    fontSize: 13,
    color: '#555',
    marginTop: 10,
    fontStyle: 'italic',
  },
});

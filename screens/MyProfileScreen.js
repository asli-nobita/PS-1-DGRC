import React from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


export default function MyProfileScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#143F6B', '#d11a2a']} // Gradient from blue to red
      style={styles.gradientContainer}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Profile</Text>
          <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Contact Us')}>
            <Icon name="help-outline" size={20} color="#fff" />
            <Text style={styles.helpText}>Need Help</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <Image source={require('../assets/UserIcon.jpeg')} style={styles.profileImage} />
        <Text style={styles.welcome}>Welcome !</Text>
        <Text style={styles.username}>Shivy</Text>

        {/* User Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>User Details:</Text>
          <Text style={styles.detail}><Text style={styles.label}>Name:</Text> <Text style={styles.link}>Shivy</Text></Text>
          <Text style={styles.detail}><Text style={styles.label}>District Name:</Text> <Text style={styles.link}>ARARIA</Text></Text>
          <Text style={styles.detail}><Text style={styles.label}>Block Name:</Text> <Text style={styles.link}>Araria</Text></Text>
          <Text style={styles.detail}><Text style={styles.label}>HSC Name:</Text> <Text style={styles.link}>Araria RS</Text></Text>
        </View>

        {/* Help Section */}
        <View style={[styles.card, { backgroundColor: '#fff0f0' }]}>
          <Text style={styles.connectTitle}>Stay connected with us...</Text>
          <TouchableOpacity style={styles.helpButtonMain} onPress={() => navigation.navigate('Write Us')}>
            <Text style={styles.helpButtonText}>Need Help 🙋‍♂️</Text>
          </TouchableOpacity>
          <Text style={styles.connectNote}>
            "Stay ahead with personalized updates on the latest offers, trending products,
            and health insights delivered right to your inbox!"
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#fff',
  },
  backButton: {
    padding: 8,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    padding: 10,
  },
  welcome: {
    fontSize: 18,
    color: '#fff',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#b22222',
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  link: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  connectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d11a2a',
    marginBottom: 10,
    textAlign: 'center',
  },
  helpButtonMain: {
    backgroundColor: '#143F6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  helpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  connectNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});



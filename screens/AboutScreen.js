import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // if you're using Expo
// import Ionicons from 'react-native-vector-icons/Ionicons'; // use this if not on Expo

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#003f7f" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Image source={require('../assets/HealthBihar.jpeg')} style={styles.logo} />
          <Text style={styles.title}>About Us</Text>
        </View>
      </View>

      {/* Section: Bihar Health Department */}
      <View style={styles.section}>
        <Text style={styles.heading}>🏥 Bihar Health Department</Text>
        <Text style={styles.paragraph}>
          The Health Department of Bihar is committed to providing accessible, affordable, and
          quality healthcare services to the people of the state. With initiatives focused on maternal
          health, child health, disease prevention, and digital health transformation, Bihar continues
          to strengthen its healthcare infrastructure at all levels.
        </Text>
      </View>

      {/* Section: CHO Workers */}
      <View style={styles.section}>
        <Text style={styles.heading}>🧑‍⚕️ Community Health Officers (CHOs)</Text>
        <Text style={styles.paragraph}>
          CHOs are trained health professionals deployed at Health & Wellness Centres (HWCs) across
          Bihar. They provide basic outpatient care, conduct screenings, manage common ailments,
          and support awareness programs. CHOs bridge the gap between rural communities and
          essential healthcare.
        </Text>
      </View>

      {/* Section: ANM and ASHA */}
      <View style={styles.section}>
        <Text style={styles.heading}>👩‍⚕️ ANM and ASHA Workers</Text>
        <Text style={styles.paragraph}>
          ANMs (Auxiliary Nurse Midwives) and ASHAs (Accredited Social Health Activists) are
          frontline warriors in rural health. They are responsible for maternal and child health services,
          vaccinations, family planning, and community outreach. Their contributions are critical to
          achieving public health goals.
        </Text>
      </View>

      <Text style={styles.footer}>Government of Bihar · Health Department</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6FF', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  headerContent: {
    alignItems: 'center',
    flex: 1
  },
  logo: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#003f7f' },
  section: { marginBottom: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', color: '#B22222', marginBottom: 8 },
  paragraph: { fontSize: 14, color: '#333', lineHeight: 22 },
  footer: {
    textAlign: 'center', marginTop: 30, fontSize: 12, color: '#555', fontStyle: 'italic'
  }
});

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FinalSubmissionScreen({ route, navigation }) {
  //const navigation = useNavigation();
  const { hsc, year, month, activity, source, numerator, denominator, percentage } = route.params;


  // These props should ideally come from previous screen
 

  return (
    <View style={styles.container}>
      {/* Header with Check icon */}
      <View style={styles.headerBox}>
        <Text style={styles.headerText}>Details Submitted</Text>
        <Image source={require('../assets/CheckIcon.jpeg')} style={styles.checkIcon} />
      </View>

      {/* Submitted data card */}
      <View style={styles.card}>
        <Text style={styles.label}><Text style={styles.bold}>HSC Name:</Text> {hsc}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Financial Year:</Text> {year}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Month:</Text> {month}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Activity Description:</Text> {activity}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Source of Verification:</Text> {source}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Denominator:</Text> {denominator}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Numerator:</Text> {numerator}</Text>
        <Text style={styles.label}><Text style={styles.bold}>Work Percentage:</Text> {percentage}</Text>
      </View>

      {/* Home button */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Dashboard')}>
        <Image source={require('../assets/home_icon.png')} style={styles.homeIcon} />
        <Text style={styles.homeText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6FF', padding: 20, alignItems: 'center' },
  headerBox: {
    flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30
  },
  headerText: {
    fontSize: 22, fontWeight: 'bold', color: '#003f7f', marginRight: 10
  },
  checkIcon: { width: 40, height: 40 },
  card: {
    width: '100%', backgroundColor: '#fff', borderRadius: 12, padding: 16,
    elevation: 4, shadowColor: '#000', shadowOpacity: 0.1, marginBottom: 30
  },
  label: { fontSize: 14, color: '#000', marginVertical: 6 },
  bold: { fontWeight: 'bold', color: '#B22222' },
  homeButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#003f7f',
    paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10
  },
  homeIcon: {
    width: 24,
    height: 24,
    borderWidth: 1,
    backgroundColor: 'yellow',
  },
  homeText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

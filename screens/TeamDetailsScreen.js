import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function TeamDetailsScreen({ route, navigation }) {
  //const navigation = useNavigation();
  //const route = useRoute();
  const { hsc, year, month } = route.params;

  // Simulated data — replace with real API data as needed
  const totalAsha = 1;
  const totalANM = 1;
  const totalCHO = 1;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {hsc} <Text style={{ color: '#FFD700' }}>Team Details</Text>
        </Text>
        <Image source={require('../assets/UserIcon.jpeg')} style={styles.headerIcon} />
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <Text style={styles.info}><Text style={styles.icon}>🏥</Text> HSC Name: <Text style={styles.link}>{hsc}</Text></Text>
        <Text style={styles.info}><Text style={styles.icon}>📅</Text> Financial Year: <Text style={styles.link}>{year}</Text></Text>
        <Text style={styles.info}><Text style={styles.icon}>🗓️</Text> Month: <Text style={styles.link}>{month}</Text></Text>
        <Text style={styles.info}><Text style={styles.icon}>✔️</Text> Status: <Text style={{ color: 'green' }}>Active</Text></Text>

        <Text style={styles.info}><Text style={styles.icon}>👩‍⚕️</Text> Total Asha: <Text style={styles.link}>{totalAsha}</Text></Text>
        <Text style={styles.info}><Text style={styles.icon}>🧑‍⚕️</Text> Total ANM: <Text style={styles.link}>{totalANM}</Text></Text>
        <Text style={styles.info}><Text style={styles.icon}>👨‍⚕️</Text> Total CHO: <Text style={styles.link}>{totalCHO}</Text></Text>

        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => navigation.navigate('ListOfAshaAnm' , {
            hsc,
            year,
            month
          })}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6FF', padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003f7f',
    padding: 12,
    borderRadius: 10,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerIcon: { width: 40, height: 40, borderRadius: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  info: { fontSize: 14, marginBottom: 10, color: '#000' },
  icon: { fontSize: 16 },
  link: { fontWeight: 'bold', color: '#1E90FF' },
  selectButton: {
    marginTop: 20,
    backgroundColor: '#003f7f',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

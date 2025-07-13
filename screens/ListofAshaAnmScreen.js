import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ListOfAshaAnmScreen({ route, navigation }) {
  //const navigation = useNavigation();
  const { hsc, year, month } = route.params;


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>List Of <Text style={{ color: '#FFD700' }}>ASHA & ANM</Text></Text>
        <Image source={require('../assets/UserIcon.jpeg')} style={styles.headerIcon} />
      </View>

      {/* ANM Card */}
      <View style={styles.card}>
        <Text style={styles.listTitle}>📋 List Of <Text style={{ color: 'red', fontWeight: 'bold' }}>ANM</Text></Text>
        <Text style={styles.listItem}>👤 Name: POOJA SINGH _ ANM09000001</Text>
      </View>

      {/* ASHA Card */}
      <View style={styles.card}>
        <Text style={styles.listTitle}>📋 List Of <Text style={{ color: 'red', fontWeight: 'bold' }}>ASHA</Text></Text>
        <Text style={styles.listItem}>👤 Name: AFSARI KHATOON _ A09016627</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InsertActivity', {
            hsc,
            year,
            month
        })}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6FF', padding: 16 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#003f7f', padding: 12, borderRadius: 10,
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerIcon: { width: 40, height: 40, borderRadius: 20 },
  card: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginTop: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 2
  },
  listTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  listItem: { fontSize: 14, color: '#000' },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'space-around', marginTop: 30
  },
  button: {
    backgroundColor: '#003f7f', paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

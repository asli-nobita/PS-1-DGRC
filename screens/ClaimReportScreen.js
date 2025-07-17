import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // back arrow icon

export default function ClaimReportScreen({ navigation }) {
  const [yearVisible, setYearVisible] = useState(false);
  const [monthVisible, setMonthVisible] = useState(false);

  const [reportTitle, setReportTitle] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = () => {
    if (!reportTitle || !selectedYear || !selectedMonth || !budget) {
      alert('Please fill all fields');
      return;
    }
    alert('✅ Claim Submitted Successfully');
    // You can send this data to a backend API here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#003f7f" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Claim Report</Text>
      </View>

      <Image source={require('../assets/claimreport.jpeg')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Report Title"
        value={reportTitle}
        onChangeText={setReportTitle}
      />

      {/* Financial Year Dropdown */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setYearVisible(true)}>
        <Text>{selectedYear || 'Select Financial Year'}</Text>
      </TouchableOpacity>
      <Modal transparent visible={yearVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {["2020-2021", "2021-2022", "2022-2023", "2023-2024", "2024-2025"].map((year, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedYear(year);
                  setYearVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text>{year}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Month Dropdown */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setMonthVisible(true)}>
        <Text>{selectedMonth || 'Select Month'}</Text>
      </TouchableOpacity>
      <Modal transparent visible={monthVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((month, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedMonth(month);
                  setMonthVisible(false);
                }}
                style={styles.modalItem}
              >
                <Text>{month}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Enter Budget"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Claim</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAF6FF',
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003f7f',
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  dropdown: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#B22222',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    elevation: 5,
  },
  modalItem: {
    paddingVertical: 10,
  },
});

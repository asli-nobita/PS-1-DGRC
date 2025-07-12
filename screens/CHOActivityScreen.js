import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CHOActivityScreen() {
  const navigation = useNavigation();

  const [selectedHSC, setSelectedHSC] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  const [showHSCModal, setShowHSCModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [showMonthModal, setShowMonthModal] = useState(false);

  const HSC_LIST = ['Araria RS', 'Araria US'];
  const YEAR_LIST = ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'];
  const MONTH_LIST = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleNext = () => {
    if (selectedHSC && selectedYear && selectedMonth) {
      navigation.navigate('Team Details', {
        hsc: selectedHSC,
        year: selectedYear,
        month: selectedMonth
      });
    } else {
      alert('Please select all fields');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CHO Activity</Text>
        <Image source={require('../assets/UserIcon.jpeg')} style={styles.headerIcon} />
      </View>

      {/* CHO Details */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Name: <Text style={styles.link}>Shivy</Text></Text>
        <Text style={styles.cardLabel}>District Name: <Text style={styles.link}>ARARIA</Text></Text>
        <Text style={styles.cardLabel}>Block Name: <Text style={styles.link}>Araria</Text></Text>
        <Text style={styles.cardLabel}>HSC Name: <Text style={styles.link}>{selectedHSC || 'N/A'}</Text></Text>
      </View>

      {/* Dropdown Fields */}
      <Text style={styles.dropdownLabel}>HSC List</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowHSCModal(true)}>
        <Text>{selectedHSC || 'Select HSC'}</Text>
      </TouchableOpacity>

      <Text style={styles.dropdownLabel}>Financial Year List</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowYearModal(true)}>
        <Text>{selectedYear || 'Select Financial Year'}</Text>
      </TouchableOpacity>

      <Text style={styles.dropdownLabel}>Financial Month List</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowMonthModal(true)}>
        <Text>{selectedMonth || 'Select Month'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      {/* Modals */}
      {[{ visible: showHSCModal, setVisible: setShowHSCModal, label: 'Select HSC', data: HSC_LIST, setter: setSelectedHSC },
        { visible: showYearModal, setVisible: setShowYearModal, label: 'Select Financial Year', data: YEAR_LIST, setter: setSelectedYear },
        { visible: showMonthModal, setVisible: setShowMonthModal, label: 'Select Financial Month', data: MONTH_LIST, setter: setSelectedMonth }]
        .map(({ visible, setVisible, label, data, setter }, idx) => (
          <Modal
            key={idx}
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => setVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{label}</Text>
                  <TouchableOpacity onPress={() => setVisible(false)}>
                    <Text style={styles.modalClose}>❌</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setter(item);
                        setVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EAF6FF', padding: 16 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#003f7f', padding: 12, borderRadius: 10,
  },
  headerTitle: { color: '#FFD700', fontSize: 18, fontWeight: 'bold' },
  headerIcon: { width: 40, height: 40, borderRadius: 20 },
  card: {
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginVertical: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 3,
  },
  cardLabel: { fontSize: 14, marginBottom: 4 },
  bold: { fontWeight: 'bold', color: '#000' },
  link: { color: '#1E90FF', fontWeight: 'bold' },
  dropdownLabel: { marginTop: 10, fontWeight: 'bold', color: '#d11a2a' },
  dropdown: {
    borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8,
    marginBottom: 10, backgroundColor: '#fff'
  },
  nextButton: {
    backgroundColor: '#003f7f', padding: 14, borderRadius: 10,
    alignItems: 'center', marginTop: 20
  },
  nextButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalContainer: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center'
  },
  modalBox: {
    backgroundColor: '#fff', borderRadius: 12, width: '80%', maxHeight: '60%', padding: 16
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10
  },
  modalTitle: { fontSize: 16, fontWeight: 'bold', color: '#003f7f' },
  modalClose: { fontSize: 18 },
  modalItem: { paddingVertical: 10 },
  modalItemText: { fontSize: 16, textAlign: 'center' },
});

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function InsertActivityScreen({ route, navigation }) {
  //const navigation = useNavigation();
  const [sourceVisible, setSourceVisible] = useState(false);
  const [selectedSource, setSelectedSource] = useState('');
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [remarks, setRemarks] = useState('');
  const { hsc, year, month } = route.params;


  const calculatePercentage = () => {
    const num = parseFloat(numerator);
    const den = parseFloat(denominator);
    if (isNaN(num) || isNaN(den) || den === 0) return '0%';
    return `${((num / den) * 100).toFixed(2)}%`;
  };
  const percentage = calculatePercentage();


  const handleSave = () => {
    if (!selectedSource || !numerator || !denominator) {
      Alert.alert('Validation Error', 'Please fill all required fields.');
      return;
    }
    navigation.navigate('OTPVerification' , {
        hsc,
        year,
        month,
        activity: 'Proportion of pregnant women who received ANC on scheduled date out of the total registered pregnancies due for ANC in the month\n\nगर्भवती माहिलाएं जिन्हें प्रसवपूर्व जांच निर्धारित तिथि पर मिली है, का कुल पंजीकृत गर्भावस्थाओं से प्रतिशत',
        source: selectedSource,
        denominator,
        numerator,
        percentage
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insert <Text style={{ color: '#FFD700' }}>Activity</Text></Text>
        <Image source={require('../assets/UserIcon.jpeg')} style={styles.headerIcon} />
      </View>

      {/* CHO Info */}
      <View style={styles.card}>
        <Text style={styles.label}>Name: <Text style={styles.value}>Shivy</Text></Text>
        <Text style={styles.label}>District Name: <Text style={styles.value}>ARARIA</Text></Text>
        <Text style={styles.label}>Block Name: <Text style={styles.value}>Araria</Text></Text>
        <Text style={styles.label}>HSC Name: <Text style={styles.value}>Araria RS</Text></Text>
      </View>

      {/* Indicator */}
      <TouchableOpacity
        style={styles.indicatorBox}
        onPress={() => Alert.alert(
          'Indicator',
          'Proportion of pregnant women who received ANC on scheduled date out of the total registered pregnancies due for ANC in the month\n\nगर्भवती माहिलाएं जिन्हें प्रसवपूर्व जांच निर्धारित तिथि पर मिली है, का कुल पंजीकृत गर्भावस्थाओं से प्रतिशत'
        )}
      >
        <Text style={styles.indicatorText}>Activity Description ⓘ</Text>
      </TouchableOpacity>

      {/* Source Dropdown */}
      <TouchableOpacity style={styles.dropdown} onPress={() => setSourceVisible(true)}>
        <Text>{selectedSource || 'Select Source of Verification'}</Text>
      </TouchableOpacity>

      <Modal transparent visible={sourceVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Source of Verification</Text>
              <TouchableOpacity onPress={() => setSourceVisible(false)}>
                <Text style={styles.modalClose}>❌</Text>
              </TouchableOpacity>
            </View>
            {['RCH Portal', 'RCH register', 'Sub center register'].map((src, idx) => (
              <TouchableOpacity key={idx} style={styles.modalItem} onPress={() => {
                setSelectedSource(src);
                setSourceVisible(false);
              }}>
                <Text>{src}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Inputs */}
      <TextInput
        placeholder="Denominator"
        keyboardType="numeric"
        value={denominator}
        onChangeText={setDenominator}
        style={styles.input}
      />
      <TextInput
        placeholder="Numerator"
        keyboardType="numeric"
        value={numerator}
        onChangeText={setNumerator}
        style={styles.input}
      />
       
      <Text style={styles.label}>Work Percentage: {calculatePercentage()}</Text>

      {/* Remarks */}
      <TextInput
        placeholder="Enter Remarks..."
        multiline
        numberOfLines={3}
        style={[styles.input, { height: 80 }]}
        value={remarks}
        onChangeText={setRemarks}
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save & Next 📝</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff', padding: 16, borderRadius: 10, marginTop: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 2
  },
  label: { fontSize: 14, marginTop: 10, fontWeight: 'bold' },
  value: { fontWeight: 'normal', color: '#1E90FF' },
  dropdown: {
    borderWidth: 1, borderColor: '#ccc', backgroundColor: '#fff', borderRadius: 8,
    padding: 12, marginVertical: 10
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12,
    backgroundColor: '#fff', marginBottom: 10
  },
  indicatorBox: {
  backgroundColor: '#e0fbe0', 
  padding: 12,
  borderRadius: 10,
  marginVertical: 10,
  alignItems: 'center'
},
indicatorText: {
  color: 'green',            
  fontWeight: 'bold',
  fontSize: 15
},
  modalBox: { backgroundColor: '#fff', borderRadius: 10, width: '80%', padding: 16 },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
},
  modalTitle: { fontWeight: 'bold', fontSize: 16 },
  modalClose: { fontSize: 18 },
  modalItem: { paddingVertical: 10 },
  saveButton: {
    backgroundColor: '#B22222', paddingVertical: 14, borderRadius: 10,
    alignItems: 'center', marginTop: 10
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

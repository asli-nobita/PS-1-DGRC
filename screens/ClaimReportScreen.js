import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // ← Import Ionicons for back arrow

const FieldRow = ({ label, value }) => (
  <View style={styles.fieldRow}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

export default function AshaAnmScreen({ navigation }) {
  const [anmName, setAnmName] = useState('');
  const [ashaName, setAshaName] = useState('');
  const [visible, setVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');

  const openModal = (name) => {
    if (!name.trim()) return;
    setCurrentName(name.trim());
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setCurrentName('');
  };

  return (
    <View style={styles.root}>
      {/* ░░ Header with back icon ░░ */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          List Of <Text style={styles.headerHighlight}>ASHA & ANM</Text>
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ░░ ANM Card ░░ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📝 <Text style={{ fontWeight: '700' }}>List Of </Text>
            <Text style={{ color: '#d32f2f', fontWeight: '700' }}>ANM</Text>
          </Text>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>👤 Name:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter ANM name"
              placeholderTextColor="#9ea7b3"
              value={anmName}
              onChangeText={setAnmName}
            />
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => openModal(anmName)}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* ░░ ASHA Card ░░ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            📝 <Text style={{ fontWeight: '700' }}>List Of </Text>
            <Text style={{ color: '#1565c0', fontWeight: '700' }}>ASHA</Text>
          </Text>

          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>👤 Name:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Enter ASHA name"
              placeholderTextColor="#9ea7b3"
              value={ashaName}
              onChangeText={setAshaName}
            />
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() => openModal(ashaName)}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ░░ Popup Modal ░░ */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentName}</Text>
            <ScrollView style={styles.fieldsWrapper}>
              <FieldRow label="Financial year" value="" />
              <FieldRow label="District" value="" />
              <FieldRow label="Block" value="" />
              <FieldRow label="HSC" value="" />
              <FieldRow label="Denominator" value="" />
              <FieldRow label="Numerator" value="" />
              <FieldRow label="Remarks" value="" />
            </ScrollView>
            <TouchableOpacity
              style={[styles.submitBtn, { backgroundColor: '#616161', marginTop: 12 }]}
              onPress={closeModal}
            >
              <Text style={styles.submitText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ░░ Styles ░░
const ACCENT_BLUE = '#2072f4';
const BG_GRADIENT_TOP = '#0d47a1';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#eef5ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: BG_GRADIENT_TOP,
  },
  headerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  headerHighlight: {
    color: '#ffeb3b',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: ACCENT_BLUE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#37474f',
    marginRight: 6,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd4e2',
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#000',
  },
  submitBtn: {
    alignSelf: 'flex-end',
    backgroundColor: ACCENT_BLUE,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  fieldsWrapper: {
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  fieldValue: {
    fontSize: 16,
    color: '#777',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WriteUsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backArrow}>←</Text>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Write Us</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAF6FF' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#143F6B',
    marginRight: 6,
  },
  backText: {
    fontSize: 18,
    color: '#143F6B',
  },
  text: { fontSize: 20, fontWeight: 'bold', color: '#143F6B' },
});

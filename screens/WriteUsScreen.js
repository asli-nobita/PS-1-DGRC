import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WriteUsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Write Us</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAF6FF' },
  text: { fontSize: 20, fontWeight: 'bold', color: '#143F6B' },
});

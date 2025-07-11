import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChangePasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Change Password Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EAF6FF' },
  text: { fontSize: 20, fontWeight: 'bold', color: '#143F6B' },
});

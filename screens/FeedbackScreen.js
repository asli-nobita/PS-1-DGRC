import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert
} from 'react-native';

export default function FeedbackScreen() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === '') {
      Alert.alert('Please rate the app and enter your feedback.');
      return;
    }
    Alert.alert('Thank you!', 'Your feedback has been submitted.');
    setRating(0);
    setFeedback('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Card */}
      <View style={styles.topCard}>
        <Image source={require('../assets/UserIcon.jpeg')} style={styles.profileIcon} />
        <Text style={styles.topCardText}>Government Feedback Portal - We Value Your Feedback</Text>
      </View>

      {/* Star Rating */}
      <Text style={styles.sectionLabel}>How would you rate our app ?</Text>
      <View style={styles.starsRow}>
        {stars.map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, { color: star <= rating ? '#FFD700' : '#ccc' }]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Feedback Input */}
      <Text style={styles.sectionLabel}>Any comments or suggestions ?</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your feedback here...."
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    padding: 16,
  },
  topCard: {
    backgroundColor: '#004080',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  topCardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 6,
  },
  input: {
    width: '90%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B22222',
    paddingVertical: 14,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

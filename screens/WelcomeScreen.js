import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🍽️ Meal App</Text>
        <Text style={styles.subtitle}>Simple meals from your pantry</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Turn random ingredients into delicious meals!
        </Text>
        <Text style={styles.howItWorks}>How it works:</Text>
        <View style={styles.stepContainer}>
          <Text style={styles.step}>1. Scan your pantry items</Text>
          <Text style={styles.step}>2. View your ingredients</Text>
          <Text style={styles.step}>3. Get simple meal ideas</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pantry')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#636e72',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 20,
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 40,
  },
  howItWorks: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 15,
  },
  stepContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  step: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 12,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#00b894',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

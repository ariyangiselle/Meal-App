import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function PaywallScreen({ navigation }) {
  const handleSubscribe = (plan) => {
    // In a real app, this would integrate with payment processing
    alert(`Subscription selected: ${plan}\nThis would connect to a payment processor.`);
  };

  const handleRestore = () => {
    // In a real app, this would restore purchases
    alert('Restore purchases would be implemented here.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🔒</Text>
        <Text style={styles.title}>Free Trial Ended</Text>
        <Text style={styles.subtitle}>
          You've used all 3 free scans!
        </Text>
      </View>

      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Premium Benefits:</Text>
        <View style={styles.benefit}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>Unlimited ingredient scanning</Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>Advanced meal suggestions</Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>Save favorite meals</Text>
        </View>
        <View style={styles.benefit}>
          <Text style={styles.checkmark}>✓</Text>
          <Text style={styles.benefitText}>No ads</Text>
        </View>
      </View>

      <View style={styles.plansContainer}>
        <TouchableOpacity
          style={[styles.planCard, styles.popularPlan]}
          onPress={() => handleSubscribe('Monthly - $4.99')}
        >
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>MOST POPULAR</Text>
          </View>
          <Text style={styles.planName}>Monthly</Text>
          <Text style={styles.planPrice}>$4.99</Text>
          <Text style={styles.planDuration}>per month</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.planCard}
          onPress={() => handleSubscribe('Yearly - $39.99')}
        >
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>SAVE 33%</Text>
          </View>
          <Text style={styles.planName}>Yearly</Text>
          <Text style={styles.planPrice}>$39.99</Text>
          <Text style={styles.planDuration}>per year</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
        <Text style={styles.restoreText}>Restore Purchases</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back to Pantry</Text>
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        Subscriptions auto-renew unless cancelled 24 hours before period ends.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
  },
  benefitsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 15,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    fontSize: 20,
    color: '#00b894',
    marginRight: 12,
    fontWeight: 'bold',
  },
  benefitText: {
    fontSize: 16,
    color: '#2d3436',
  },
  plansContainer: {
    marginBottom: 20,
    gap: 15,
  },
  planCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dfe6e9',
    position: 'relative',
  },
  popularPlan: {
    borderColor: '#00b894',
    borderWidth: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#00b894',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  saveBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: '#0984e3',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
  },
  saveText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 5,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00b894',
    marginTop: 10,
  },
  planDuration: {
    fontSize: 14,
    color: '#636e72',
    marginTop: 5,
  },
  restoreButton: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  restoreText: {
    color: '#0984e3',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    color: '#636e72',
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: '#636e72',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
});

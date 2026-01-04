import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useTrialContext } from '../contexts/TrialContext';

export default function PantryScreen({ navigation }) {
  const { scansRemaining, hasScansRemaining } = useTrialContext();
  const [pantryItems, setPantryItems] = useState([
    { id: '1', name: 'Bread', emoji: '🍞' },
    { id: '2', name: 'Tomato', emoji: '🍅' },
    { id: '3', name: 'Mayo', emoji: '🥫' },
    { id: '4', name: 'Sweet Potato', emoji: '🍠' },
  ]);

  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      setPantryItems([
        ...pantryItems,
        { id: Date.now().toString(), name: newItem, emoji: '🥘' },
      ]);
      setNewItem('');
    }
  };

  const removeItem = (id) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.removeButton}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pantry</Text>
      
      {!hasScansRemaining && (
        <TouchableOpacity 
          style={styles.upgradeBar}
          onPress={() => navigation.navigate('Paywall')}
        >
          <Text style={styles.upgradeText}>
            🔒 Trial ended - Tap to upgrade for unlimited scans
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.addItemContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add an item..."
          value={newItem}
          onChangeText={setNewItem}
          onSubmitEditing={addItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pantryItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            if (!hasScansRemaining) {
              navigation.navigate('Paywall');
            } else {
              navigation.navigate('Scanner');
            }
          }}
        >
          <Text style={styles.buttonText}>
            📷 Scan Items {hasScansRemaining ? `(${scansRemaining} left)` : '(Trial Ended)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.suggestButton}
          onPress={() => navigation.navigate('MealSuggestions', { pantryItems })}
          disabled={pantryItems.length === 0}
        >
          <Text style={styles.buttonText}>
            Get Meal Ideas ({pantryItems.length})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d3436',
    marginTop: 60,
    marginBottom: 20,
  },
  upgradeBar: {
    backgroundColor: '#fdcb6e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  upgradeText: {
    color: '#2d3436',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  addItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#00b894',
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emoji: {
    fontSize: 24,
    marginRight: 15,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
  },
  removeButton: {
    color: '#d63031',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  buttonContainer: {
    gap: 10,
  },
  scanButton: {
    backgroundColor: '#0984e3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  suggestButton: {
    backgroundColor: '#00b894',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

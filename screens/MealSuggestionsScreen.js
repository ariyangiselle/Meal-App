import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function MealSuggestionsScreen({ route, navigation }) {
  const { pantryItems = [] } = route.params || {};

  // Generate meal suggestions based on pantry items
  const mealSuggestions = useMemo(() => {
    const items = pantryItems.map(item => item.name.toLowerCase());
    const suggestions = [];

    // Simple meal logic based on combinations
    if (items.includes('bread') && items.includes('tomato')) {
      suggestions.push({
        id: '1',
        name: 'Tomato Toast',
        emoji: '🍞🍅',
        description: 'Sliced tomatoes on toasted bread',
        ingredients: ['Bread', 'Tomato'],
      });
    }

    if (items.includes('bread') && items.includes('mayo')) {
      suggestions.push({
        id: '2',
        name: 'Mayo Sandwich',
        emoji: '🥪',
        description: 'Simple mayo sandwich',
        ingredients: ['Bread', 'Mayo'],
      });
    }

    if (items.includes('bread') && items.includes('tomato') && items.includes('mayo')) {
      suggestions.push({
        id: '3',
        name: 'Tomato Mayo Sandwich',
        emoji: '🥪🍅',
        description: 'Tomato sandwich with mayo',
        ingredients: ['Bread', 'Tomato', 'Mayo'],
      });
    }

    if (items.includes('sweet potato')) {
      suggestions.push({
        id: '4',
        name: 'Roasted Sweet Potato',
        emoji: '🍠',
        description: 'Oven-roasted or microwaved sweet potato',
        ingredients: ['Sweet Potato'],
      });
    }

    if (items.includes('tomato')) {
      suggestions.push({
        id: '5',
        name: 'Fresh Tomato Slices',
        emoji: '🍅',
        description: 'Sliced fresh tomatoes',
        ingredients: ['Tomato'],
      });
    }

    // Default suggestion if no matches
    if (suggestions.length === 0 && pantryItems.length > 0) {
      suggestions.push({
        id: '99',
        name: 'Simple Snack',
        emoji: '🥘',
        description: `Try eating your ${pantryItems[0].name} as is!`,
        ingredients: [pantryItems[0].name],
      });
    }

    return suggestions;
  }, [pantryItems]);

  const renderMeal = ({ item }) => (
    <View style={styles.mealCard}>
      <Text style={styles.mealEmoji}>{item.emoji}</Text>
      <View style={styles.mealInfo}>
        <Text style={styles.mealName}>{item.name}</Text>
        <Text style={styles.mealDescription}>{item.description}</Text>
        <View style={styles.ingredientsContainer}>
          {item.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientTag}>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Ideas</Text>
      <Text style={styles.subtitle}>
        Based on {pantryItems.length} item{pantryItems.length !== 1 ? 's' : ''} in your pantry
      </Text>

      {mealSuggestions.length > 0 ? (
        <FlatList
          data={mealSuggestions}
          renderItem={renderMeal}
          keyExtractor={item => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🥘</Text>
          <Text style={styles.emptyText}>
            Add some items to your pantry to get meal suggestions!
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Pantry')}
        >
          <Text style={styles.buttonText}>← Back to Pantry</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.buttonText}>📷 Scan More Items</Text>
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#636e72',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealEmoji: {
    fontSize: 48,
    marginRight: 15,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3436',
    marginBottom: 5,
  },
  mealDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 10,
    lineHeight: 20,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  ingredientTag: {
    backgroundColor: '#dfe6e9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ingredientText: {
    fontSize: 12,
    color: '#2d3436',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    gap: 10,
  },
  backButton: {
    backgroundColor: '#636e72',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#0984e3',
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

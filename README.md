# Meal App

A React Native mobile app that helps users create simple meals based on ingredients in their pantry.

## Features

- **Welcome Screen**: Introduction to the app
- **Pantry Items/Suggested Meals**: View your pantry items and get meal suggestions
- **Scanner Screen**: Scan ingredients using your camera
- **Meal Suggestions**: Get simple meal ideas based on your pantry items

## Setup Instructions

### Prerequisites

1. Install Node.js (v18 or higher): https://nodejs.org/
2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```

### Installation

1. Navigate to the project directory:
   ```bash
   cd meal-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm start
   ```

2. Run on your device:
   - **iOS**: Press `i` in the terminal or run `npm run ios`
   - **Android**: Press `a` in the terminal or run `npm run android`
   - **Web**: Press `w` in the terminal or run `npm run web`
   - **Expo Go**: Scan the QR code with the Expo Go app on your phone

## Project Structure

```
meal-app/
├── App.js                 # Main app entry point with navigation
├── screens/
│   ├── WelcomeScreen.js          # Welcome screen
│   ├── PantryScreen.js           # Pantry items and suggested meals
│   ├── ScannerScreen.js          # Camera scanner for ingredients
│   └── MealSuggestionsScreen.js  # Meal suggestions display
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── babel.config.js       # Babel configuration
```

## Notes

- The app suggests simple meals, NOT detailed recipes
- Camera permissions are required for the scanner feature
- Meal suggestions are generated based on available pantry items

## License

MIT

## Contributing

test contribution from Imran

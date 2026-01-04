import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useTrialContext } from '../contexts/TrialContext';

export default function ScannerScreen({ navigation }) {
  const { scansRemaining, hasScansRemaining, decrementScans } = useTrialContext();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (!hasScansRemaining) {
      navigation.navigate('Paywall');
      return;
    }

    setScanned(true);
    const remaining = await decrementScans();
    
    Alert.alert(
      'Item Scanned!',
      `Detected: ${data}\n\nScans remaining: ${remaining}`,
      [
        {
          text: 'Add to Pantry',
          onPress: () => {
            // In a real app, this would add to the pantry
            navigation.navigate('Pantry');
          },
        },
        { text: 'Scan Again', onPress: () => setScanned(false) },
      ]
    );
    
    if (remaining === 0) {
      setTimeout(() => {
        navigation.navigate('Paywall');
      }, 2000);
    }
  };

  const handleManualAdd = () => {
    Alert.alert(
      'Manual Entry',
      'What did you scan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Item',
          onPress: () => navigation.navigate('Pantry'),
        },
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Camera Access</Text>
        <Text style={styles.message}>
          Please enable camera permissions in your device settings to scan items.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.topOverlay}>
            <Text style={styles.title}>Scan Pantry Items</Text>
            <Text style={styles.instructions}>
              Point your camera at a barcode or food item
            </Text>
            <View style={styles.trialBadge}>
              <Text style={styles.trialText}>
                {scansRemaining} scan{scansRemaining !== 1 ? 's' : ''} remaining
              </Text>
            </View>
          </View>

          <View style={styles.scanArea}>
            <View style={styles.corner} style={[styles.corner, styles.topLeft]} />
            <View style={styles.corner} style={[styles.corner, styles.topRight]} />
            <View style={styles.corner} style={[styles.corner, styles.bottomLeft]} />
            <View style={styles.corner} style={[styles.corner, styles.bottomRight]} />
          </View>

          <View style={styles.bottomOverlay}>
            <TouchableOpacity
              style={styles.manualButton}
              onPress={handleManualAdd}
            >
              <Text style={styles.buttonText}>✏️ Enter Manually</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  trialBadge: {
    backgroundColor: '#00b894',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },
  trialText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scanArea: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#00b894',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 15,
  },
  manualButton: {
    backgroundColor: '#0984e3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  backButton: {
    backgroundColor: '#636e72',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#00b894',
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

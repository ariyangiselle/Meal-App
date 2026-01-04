import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrialContext = createContext();

export const useTrialContext = () => {
  const context = useContext(TrialContext);
  if (!context) {
    throw new Error('useTrialContext must be used within TrialProvider');
  }
  return context;
};

export const TrialProvider = ({ children }) => {
  const [scansRemaining, setScansRemaining] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrialData();
  }, []);

  const loadTrialData = async () => {
    try {
      const savedScans = await AsyncStorage.getItem('scansRemaining');
      if (savedScans !== null) {
        setScansRemaining(parseInt(savedScans, 10));
      }
    } catch (error) {
      console.error('Error loading trial data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const decrementScans = async () => {
    const newCount = Math.max(0, scansRemaining - 1);
    setScansRemaining(newCount);
    try {
      await AsyncStorage.setItem('scansRemaining', newCount.toString());
    } catch (error) {
      console.error('Error saving scan count:', error);
    }
    return newCount;
  };

  const resetTrial = async () => {
    setScansRemaining(3);
    try {
      await AsyncStorage.setItem('scansRemaining', '3');
    } catch (error) {
      console.error('Error resetting trial:', error);
    }
  };

  const hasScansRemaining = scansRemaining > 0;

  return (
    <TrialContext.Provider
      value={{
        scansRemaining,
        hasScansRemaining,
        decrementScans,
        resetTrial,
        isLoading,
      }}
    >
      {children}
    </TrialContext.Provider>
  );
};

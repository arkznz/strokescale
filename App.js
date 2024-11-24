import { StyleSheet, FlatList, Text, View, Pressable } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PatientLanguageScreen from './patientLanguage';
import PatientDetailsScreen from './patientDetails';
import PatientInfoScreen from './PatientInfo';
import PatientQuestionsScreen from './patientQuestions';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Info" component={PatientInfoScreen} />
        <Stack.Screen name="Language" component={PatientLanguageScreen} />
        <Stack.Screen name="Details" component={PatientDetailsScreen} />
        <Stack.Screen name="Questions" component={PatientQuestionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

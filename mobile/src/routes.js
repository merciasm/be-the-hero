import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import React from 'react'
import Incidents from './pages/Incidents'
import Details from './pages/Details'

export default function Routes() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Incidents" component={Incidents} />
        <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
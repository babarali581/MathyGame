/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
 
   StyleSheet,
  
 } from 'react-native';
 
 // import {
 //   Colors,
 //   DebugInstructions,
 //   Header,
 //   LearnMoreLinks,
 //   ReloadInstructions,
 // } from 'react-native/Libraries/NewAppScreen';
 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const  Stack = createNativeStackNavigator();
import Game from "./parentComponents/addGames"
import Home from "./parentComponents/Home"
 
 
 export default App =() => {
 
   return (
      //  <Timer/>

      <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
   )
 }
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 
 
 
 // ibrary/Java/JavaVirtualMachines/jdk-11.0.12.jdk/Contents/Home
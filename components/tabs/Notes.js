import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NoteDetails from "../stack/NoteDetails";
import NotesList from "../stack/NotesList";

import Header from "../Header";

export default function Notes({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Notes">
        <Stack.Screen
          name="Notes"
          component={NotesList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Details" 
        options={{
            tabBarVisible: false,
          }} component={NoteDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 6,
    justifyContent: "center",
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { SearchBar, Card, ListItem, Button, Icon, Input } from "react-native-elements";

import Header from "../Header";
import { ScrollView } from "react-native-gesture-handler";

export default function NoteDetails({ navigation }) {

  const [value, setValue] = useState('Ajouter une note');
  return (
    <View style={styles.container}>
        <Text style={styles.hotelTitle}>1ere class CONFLANS</Text>
        <ScrollView>
        <TextInput style={styles.textInput} value={value}/>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeader: {
    flex: 1,
    backgroundColor: "red",
    height: 30,
  },
  hotelTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  tabContent: {
    flex: 6,
  },
  textInput : { height: 40, borderColor: 'gray', borderWidth: 1 }
});


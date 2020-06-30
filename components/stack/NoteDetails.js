import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { SearchBar, Card, ListItem, Button, Icon, Input } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';

import Header from "../Header";

import { ScrollView } from "react-native-gesture-handler";

export default function NoteDetails({ navigation }) {

  const [text, setText] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <View style={styles.container}>
        <Text style={styles.hotelTitle}>1ere class CONFLANS</Text>
        <ScrollView>
        <Text style={styles.hotelTitle}>Ajouter une note</Text>
        <View style={styles.textInputContainer}>
        <TextInput style={styles.textInput} multiline={true} numberOfLines={6} value={text} placeholder="Votre note" onChangeText={text => setText(text)}/>
        </View>
        <Text style={styles.hotelTitle}>Vos photos</Text>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={styles.btnText}>Ajouter des photos</Text>
          </TouchableOpacity>

        
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15
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
  textInput : { height: 40, borderColor: 'gray', borderWidth: 1, flex: 5},
  btn: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    width: '90%',
    backgroundColor: '#00528C',
  },
  btnText: {
    color: 'white',
  },
  textInputContainer: {
    alignItems: 'stretch',
  }
});


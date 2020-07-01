import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  SearchBar,
  Card,
  ListItem,
  Button,
  Icon,
  Input,
} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

import Header from "../Header";

import { ScrollView } from "react-native-gesture-handler";

export default function NoteDetails({ navigation }) {
  const [text, setText] = useState("");
  const [imageArray, setImageArray] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageArray(result);
    }
  };

  const handleAreaResize = () => {
    console.log("text changed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hotelTitle}>1ere class CONFLANS</Text>
      <ScrollView style={styles.scrollV}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} onChange={console.log("hello")}>
            Ajouter une note
          </Text>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              numberOfLines={6}
              value={text}
              placeholder="Notez les élements importants"
              onChangeText={(text) => setText(text)}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Vos photos</Text>
        <TouchableOpacity style={styles.btn} onPress={pickImage}>
          <Text style={styles.btnText}>Ajouter des photos</Text>
        </TouchableOpacity>
        {/* {imageArray.map(image => {
            <Image
            source={{ uri: image.uri }}
            style={styles.thumbnail}
          />            
          })} */}
        {imageArray !== null ? (
          <View style={styles.container}>
            <Image source={{ uri: imageArray.uri }} style={styles.thumbnail} />
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.actionBtn}>
        <TouchableOpacity style={styles.btnBack}>
          <Text style={styles.btnTextDark}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnConfirm}>
          <Text style={styles.btnText}>Sauvegarder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  section: {
    marginBottom: '10%'
  },
  tabHeader: {
    flex: 1,
    backgroundColor: "red",
    height: 30,
  },
  hotelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "10%",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  tabContent: {
    flex: 6,
  },
  scrollV: {
    marginBottom: "30",
  },
  textInput: { height: 40, borderColor: "gray", borderWidth: 1, flex: 5 },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    width: "90%",
    backgroundColor: "#00528C",
  },
  btnText: {
    color: "white",
  },
  textInputContainer: {
    alignItems: "stretch",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  btnConfirm: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    width: "45%",
    backgroundColor: "#00528C",
  },
  btnBack: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 5,
    width: "45%",
    backgroundColor: "transparent",
  },
  actionBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnTextDark: {
    color: "grey",
  },
});

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
import NumericInput from 'react-native-numeric-input'

import utils from '../../app.utils';

import Header from "../Header";

import { ScrollView } from "react-native-gesture-handler";

export default function NoteDetails({ navigation }) {
  const [text, setText] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [value, setValue] = useState(30)
 
  // const [rapportData, setRapportData] = useState({
  //   commentaire,
  //   note,
  //   visit_id
  // })

  const imageCarroussel = () => {
    // console.log(imageArray);
    // imageArray.map(i => {
    //   return <Image source={{ uri: imageArray[i].uri }} style={styles.thumbnail}></Image>

    // })
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if(image1 == null){
        setImage1(result);
        console.log(image1)
      } else if (image2 == null) {
        setImage2(result)
      } else {
        setImage3(result)
      }
    }
  };

  const handleSubmitRapport = () => {
    var data = {commentaire: text, note: value, visit_id: 1}
    console.log(value);
    utils.fetchReadyData('/rapport/create', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    })

  } 

  return (
    <View style={styles.container}>
      <Text style={styles.hotelTitle}>1ere class CONFLANS</Text>
      <ScrollView style={styles.scrollV}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle} onChange={console.log("hello")}>
            Ajouter un commentaire
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

        <View style={styles.section}>
        <Text style={styles.sectionTitle} onChange={console.log("hello")}>
            Selectionner une note
          </Text>
          <NumericInput maxValue={60} value={value} onChange={value => setValue({value})} />
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
        {image1 !== null ? <Image source={{ uri: image1.uri }} style={styles.thumbnail}></Image> : null}
        {image2 !== null ? <Image source={{ uri: image2.uri }}></Image>  : null}
        {image3 !== null ? <Image source={{ uri: image3.uri }}></Image>  : null}
      </ScrollView>

      <View style={styles.actionBtn}>
        <TouchableOpacity style={styles.btnBack}>
          <Text style={styles.btnTextDark}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSubmitRapport} style={styles.btnConfirm}>
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
    marginBottom: "30%",
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
    width: 150,
    height: 150,
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

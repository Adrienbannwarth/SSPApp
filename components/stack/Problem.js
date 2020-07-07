import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Header from "../Header";

export default function Problem({ navigation }) {

  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  function changeItem(item) {
    setValue(item.value);
  }

  return (

    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Signaler un problème</Text>
        <DropDownPicker
          items={[
            { label: 'Problème de santé', value: 'santé' },
            { label: 'Problème de transport', value: 'transport' },
            { label: 'Véhicule indisponible', value: 'vehicule' },
          ]}
          defaultIndex={0}
          placeholder={'Veuillez choisir un motif*'}
          style={styles.dropdown}
          containerStyle={{ height: 40 }}
          onChangeItem={item => changeItem(item)}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={6}
            value={text}
            placeholder="Ajouter un commentaire (facultatif)"
            onChangeText={(text) => setText(text)}
          />
        </View>
        <Text style={styles.textInfo}>* Champs obligatoire</Text>
      </View>
      <View style={styles.actionBtn}>
        <TouchableOpacity style={styles.btnBack}>
          <Text style={styles.btnTextDark}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnConfirm}>
          <Text style={styles.btnText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    flex: 1
  },
  content: {
    flex: 6,
    padding: 15
  },
  title: {
    marginTop: 40,
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold'
  },
  dropdown: {
    backgroundColor: 'transparent',
    borderColor: 'grey'
  },
  textInputContainer: {
    marginTop: 20,
    padding: 15,
    height: 150,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5
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
  btnText: {
    color: 'white'
  },
  textInfo: {
    marginTop: 30,
    color: 'grey'
  }
});
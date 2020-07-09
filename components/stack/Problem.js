import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import utils from '../../utils/app.utils';

import Header from "../Header";


import IconValid from "../../assets/icons/check-circle.svg";
import IconWarning from "../../assets/icons/alert-triangle.svg";

let items = [
  { label: 'Problème de santé', value: 'santé' },
  { label: 'Problème de transport', value: 'transport' },
  { label: 'Véhicule indisponible', value: 'vehicule' },
]

export default function Problem({ route, navigation }) {

  const { id_visit } = route.params;

  const [motif, setMotif] = useState(items[0].label)
  const [comment, setComment] = useState('')
  const [warningForm, setWarningForm] = useState(false)
  const [validForm, setValidForm] = useState(false)

  const submitProblem = () => {
    const recap = JSON.stringify({
      "motif": motif,
      "visit_id": id_visit,
      "commentaire": comment
    })

    setValidForm(!validForm)

    utils.fetchJson("/signalement/create", {
      method: "PUT",
      body: recap
    })
      .then(res => {
        console.log(res);
        setTimeout(() => {
          navigation.navigate("Home", {
            cancel: id_visit
          })
        }, 1500);
      })
      .catch(error => console.log(error))
  }

  function changeItem(item) {
    setMotif(item.label);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Signaler un problème</Text>
        <DropDownPicker
          items={items}
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
            value={comment}
            placeholder="Ajouter un commentaire (facultatif)"
            onChangeText={(comment) => setComment(comment)}
          />
        </View>
        <Text style={styles.textInfo}>* Champs obligatoire</Text>
      </View>
      {warningForm && <View style={styles.bg_black}>
        <View style={styles.contentWarning}>
          <View style={styles.contentIconWarning}>
            <IconWarning
              color={'white'}
              width={22}
              height={22} />
          </View>
          <Text style={styles.warning}>Êtes-vous sûr de confirmer le signalement ?</Text>
          <TouchableOpacity onPress={() => submitProblem()} style={styles.btnConfirm}>
            <Text style={styles.btnText}>Envoyer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWarningForm(!warningForm)} style={styles.btnAnnul}>
            <Text style={{ marginTop: 20 }}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>}
      {validForm &&
        <View style={styles.bg_black}>
          <View style={styles.contentWarning}>
            <View style={styles.contentIcon}>
              <IconValid
                color={'white'}
                width={22}
                height={22} />
            </View>
            <Text style={styles.warning}>Votre signalement a été envoyé</Text>
          </View>
        </View>}
      <View style={styles.actionBtn}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnBack}>
          <Text style={styles.btnTextDark}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWarningForm(!warningForm)} style={styles.btnConfirm}>
          <Text style={styles.btnText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// onPress={() => submitProblem()}

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "white",
  },
  actionBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  btnText: {
    color: 'white'
  },
  textInfo: {
    marginTop: 30,
    color: 'grey'
  },
  contentWarning: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 5
  },
  contentIcon: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#87D37C'
  },
  contentIconWarning: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 40,
    backgroundColor: '#FFB946'
  },
  warning: {
    textAlign: 'center'
  },
  bg_black: {
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .8)'
  }
});
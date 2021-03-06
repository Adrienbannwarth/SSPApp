import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import utils from '../../utils/app.utils';
const ImgLogo = require("../../assets/img/ssdp_logo.png");
//
import HelpersAsyncStorage from "../../utils/HelpersAsyncStorage"
import config from "../../config";

export default function Login({ navigation }) {
  /** States */
  const [stateEmail, setStateEmail] = useState(null)
  const [statePassword, setStatePassword] = useState(null)
  const [errorForm, setErrorForm] = useState('')

  const submitLogin = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(stateEmail) === false) {
      setErrorForm('ERROR_1')
      return false;
    }

    if (!stateEmail || !statePassword) {
      // show you must enter email and password!
      setErrorForm('ERROR_2')
    } else {
      utils.fetchForm("/auth/signin", {

        "email": stateEmail,
        "password": statePassword
      }).then(response => {
        if (response.error) {
          setErrorForm('ERROR_3')
          console.log(response.error);

          // credentials or invalid
        } else {
          HelpersAsyncStorage.set(config.LOCAL_STORAGE_ACCESS_TOKEN, response.data.token)

            .then(async () => {
              console.log('--> ', await HelpersAsyncStorage.get(config.LOCAL_STORAGE_ACCESS_TOKEN));
              navigation.navigate('Home');
              // changement de page
            })
        }
      })
        .catch(error => {
          console.error(error)
        })
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={ImgLogo}
        resizeMode="contain" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          onChangeText={stateEmail => setStateEmail(stateEmail)}
          placeholder="Adresse e-mail"
          placeholderTextColor="white"
        ></TextInput>

        <TextInput
          style={styles.input}
          onChangeText={statePassword => setStatePassword(statePassword)}
          placeholder="Mot de passe"
          secureTextEntry={true}
          placeholderTextColor="white"
        ></TextInput>
        {errorForm == "ERROR_1" && <Text style={styles.warning}>Adresse Email Invalide</Text>}
        {errorForm == "ERROR_2" && <Text style={styles.warning}>Renseigner tous les  champs</Text>}
        {errorForm == "ERROR_3" && <Text style={styles.warning}>Identifiant incorrect</Text>}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => submitLogin()}>
          <Text style={styles.btnText}> Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00528C'
  },
  logo: {
    width: '80%',
  },
  form: {
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    margin: 30,
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    fontSize: 20
  },
  btn: {
    padding: 15,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5
  },
  btnText: {
    color: '#00528C',
    fontWeight: 'bold'
  },
  warning: {
    color: 'white',
    padding: 10
  }
}); 
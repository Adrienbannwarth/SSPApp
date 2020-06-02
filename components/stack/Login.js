import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
import { AuthContext } from "../../context";

const ImgLogo = require("../../assets/img/ssdp_logo.png");

export default function Login(navigation) {
  const { signIn } = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={ImgLogo}
        resizeMode="contain" />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          placeholderTextColor="white"
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="white"
        ></TextInput>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => signIn()}>
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
  }
});
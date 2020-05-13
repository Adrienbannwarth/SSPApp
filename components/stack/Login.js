import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
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
      <Button
        title="Sign In"
        onPress={() => signIn()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#109CF1'
  },
  logo: {
    width: '80%',
  }
});
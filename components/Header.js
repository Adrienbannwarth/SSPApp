import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImgLogo = require("../assets/img/ssdp_logo.png");
const IconMenu = require("../assets/icons/menu.svg");

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btnDrawer}
        onPress={() => navigation.toggleDrawer()}>
        <Image
          style={styles.logo}
          source={IconMenu}
          resizeMode="contain" />
      </TouchableOpacity>
      <Image
        style={styles.logo}
        source={ImgLogo}
        resizeMode="contain" />
      <TouchableOpacity
        style={styles.btnDrawer}
        onPress={() => navigation.toggleDrawer()}>
        <Text>Cloche</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
    backgroundColor: '#109CF1'
  },
  logo: {
    width: '60%'
  },
  btnDrawer: {
  }
});
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ImgLogo = require("../assets/img/ssdp_logo.png");
import IconMenu from "../assets/icons/menu.svg";


export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <View style={styles.btnDrawer}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}>
          <IconMenu
            color={'white'}
            width={30}
            height={30} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.logo}
        source={ImgLogo}
        resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    paddingTop: 20,
    backgroundColor: '#00528C'
  },
  logo: {
    width: '50%'
  },
  btnDrawer: {
    position: 'absolute',
    left: 20,
    top: 55,
    zIndex: 2
  }
});
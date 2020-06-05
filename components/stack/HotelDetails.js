import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import call from 'react-native-phone-call';
import openMap from 'react-native-open-maps';
import Header from "../Header";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withTheme } from 'react-native-elements';
// Images

import IconPhone from "../../assets/icons/phone.svg";
import IconLocalisation from "../../assets/icons/localisation.svg";


export default function HotelDetails({ navigation }) {

  const call = () => {
    // handler to make a call
    const args = {
      number: '06450',
      prompt: false,
    };
    call(args).catch(console.error);
  };

  const _goToYosemite = () => {
    openMap({ latitude: 37.865101, longitude: -119.538330 });
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <View style={styles.contentTag}>
          <Text style={styles.tag}>Urgence</Text>
        </View>
        <Text style={styles.titleHotel}>1er classe conflans - ESPRERER</Text>
        <View style={styles.border}></View>
        <Text style={styles.adressName}>11 rue des belles hates, 78700 conflans sainte honorine</Text>
        <View style={styles.flexRow}>
          <View style={styles.contentIcon}>
            <IconPhone
              color={'white'}
              width={25}
              height={25}
              strokeWidth={1} />
          </View>
          <TouchableOpacity onPress={call}>
            <Text>06 78 23 56 78</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexRow}>
          <View style={styles.contentIcon}>
            <IconLocalisation
              color={'white'}
              width={25}
              height={25}
              strokeWidth={1} />
          </View>
          {/* onPress={_goToYosemite()} */}
          <TouchableOpacity>
            <Text>Localisation</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentContent}>
          <Text style={styles.commentTitle}>Commentaire de votre plannificateur</Text>
          <Text style={styles.commentText}>Verif de schambres de la partie dnord de l'immeuble</Text>
        </View>
        <View style={styles.sectionBtn}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Commencer la visite</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.helpText}>J'ai un problème</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 6,
    marginLeft: 25,
    marginTop: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  contentTag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 35,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#EB5757'
  },
  tag: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  titleHotel: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  border: {
    marginTop: 20,
    marginBottom: 20,
    width: 70,
    height: 3,
    backgroundColor: '#00528C'
  },
  adressName: {
    fontSize: 16
  },
  contentIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00528C',
    borderRadius: 8
  },
  commentContent: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'grey'
  },
  commentTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  commentText: {
    fontSize: 15
  },
  sectionBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 50
  },
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
  helpText: {
    marginTop: 20,
    marginRight: 25,
    textAlign: 'center'
  }
});
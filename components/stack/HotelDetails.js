import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView } from 'react-native';
import call from 'react-native-phone-call';
import openMap from 'react-native-open-maps';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import 'moment/locale/fr';
import * as Linking from 'expo-linking';

import IconPhone from "../../assets/icons/phone.svg";
import IconLocalisation from "../../assets/icons/localisation.svg";
import IconMap from "../../assets/icons/map.svg";
import IconClock from "../../assets/icons/clock.svg";
import IconInfo from "../../assets/icons/info.svg";
import IconBack from "../../assets/icons/back.svg";
import IconHelp from "../../assets/icons/help-circle.svg"


export default function HotelDetails({ route, navigation }) {

  const { id_visit, adresse, code_postal, ville, nom, priority, start, end } = route.params;
  const [openBeginVisit, setBeginVisit] = useState(false);

  const navigateToProblems = (id_visit) => {
    console.log(id_visit);

    navigation.navigate("Problem", {
      id_visit: id_visit
    });
  }

  const navigateToRapport = (id_visit, nom) => {
    console.log(id_visit);
    console.log(nom);

    navigation.navigate("Rapport", {
      id_visit: id_visit,
      nom: nom
    });
  }


  const call = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    }
    else {
      phoneNumber = 'telprompt:${1234567890}';
    }
    Linking.openURL(phoneNumber);
  };

  const _goToYosemite = () => {
    openMap({ latitude: 37.865101, longitude: -119.538330 });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigateToProblems(id_visit)}>
        <Text style={styles.helpText}>J'ai un problème</Text>
        <IconHelp
          marginRight={20}
          color={'white'}
          width={20}
          height={20} />
      </TouchableOpacity>
      <View style={styles.contentHeader}>
        <View style={styles.btn_back}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <IconBack
              style={styles.icon_back}
              color={'white'}
              width={25}
              height={25} />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.bg}
          source={require("../../assets/img/bg-hotel.jpg")}
        ></Image>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: -20 }}>
        <TouchableOpacity onPress={() => call()} style={styles.contentIcon}>
          <IconPhone
            color={'white'}
            width={22}
            height={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _goToYosemite()} style={styles.contentIcon}>
          <IconMap
            color={'white'}
            width={22}
            height={22} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.row}>
          <View style={[styles.contentTag, { backgroundColor: priority == false ? '#00528C' : '#EB5757' }]}>
            <Text style={styles.tag}>
              {priority == false ? 'normal' : 'urgence'}</Text>
          </View>
          {openBeginVisit && (
            <View style={[styles.contentTag, { backgroundColor: 'rgba(0, 107, 180, 0.25)' }]}>
              <Text style={styles.tag}>En cours</Text>
            </View>
          )}
        </View>
        <Text style={styles.titleHotel}>{nom}</Text>
        <View style={styles.hr}></View>
        <View style={styles.spaceBtween}>
          <View style={styles.row}>
            <IconClock
              style={styles.icon}
              color={'black'}
              width={22}
              height={22} />
            <Text>Horaire de visite</Text>
          </View>
          <Text style={styles.hours}>{moment(start).format("LT")} - {moment(end).format("LT")}</Text>
        </View>
        <View style={styles.hr}></View>
        <View style={styles.row}>
          <IconLocalisation
            style={styles.icon}
            color={'black'}
            width={22}
            height={22} />
          <View>
            <Text>{adresse}, {code_postal}</Text>
            <Text>- {ville}</Text>
          </View>
        </View>
        <View style={styles.hr}></View>

        <View style={styles.commentContent}>
          <View style={styles.row}>
            <IconInfo
              style={styles.icon}
              color={'black'}
              width={22}
              height={22} />
            <Text style={styles.commentTitle}>Recommandations de votre planificateur</Text>
          </View>
          <Text style={styles.commentText}>Verif de schambres de la partie dnord de l'immeuble</Text>
        </View>
      </ScrollView>
      <View style={styles.sectionBtn}>
        {!openBeginVisit && (
          <TouchableOpacity onPress={() => setBeginVisit(!openBeginVisit)} style={styles.btn}>
            <Text style={styles.btnText}>Commencer la visite</Text>
          </TouchableOpacity>
        )}
        {openBeginVisit && (
          <View>
            <TouchableOpacity style={styles.btn} onPress={() => navigateToRapport(id_visit, nom)}>
              <Text style={styles.btnText}>Ajouter des notes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    position: "relative",
    flex: 6,
    marginLeft: 25,
    marginTop: 10
  },
  contentHeader: {
    position: 'relative'
  },
  row: {
    flexDirection: 'row',
    alignItems: "center"
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  spaceBtween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentTag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    marginTop: 10,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 5
  },
  tag: {
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 13
  },
  titleHotel: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  hr: {
    marginTop: 20,
    marginBottom: 20,
    width: '92%',
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  adressName: {
    fontSize: 16
  },
  contentIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    width: 40,
    height: 40,
    backgroundColor: '#00528C',
    borderRadius: 8
  },

  commentTitle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  commentText: {
    marginTop: 20,
    fontSize: 15
  },
  sectionBtn: {
    backgroundColor: '#00528C',
    borderRadius: 20
  },
  btn: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 25,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5,
    backgroundColor: 'white',
    borderRadius: 50
  },
  btnText: {
    color: '#00528C',
  },
  helpText: {
    color: 'white',
    marginRight: 10
  },
  icon: {
    marginRight: 10
  },
  hours: {
    marginRight: 30,
    color: '#00528C',
    fontWeight: 'bold'
  },
  btn_back: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .8)",
    borderRadius: 5
  },
  btnFinish: {
    marginBottom: 25
  },
  icon_back: {
    marginRight: 2,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 100,
    paddingTop: 30,
    backgroundColor: '#00528C'
  },
  logo: {
    width: '50%'
  }
});
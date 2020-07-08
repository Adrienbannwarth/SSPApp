import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
import 'moment/locale/fr';

import Header from "../Header";
import HotelDetails from "../stack/HotelDetails"
import utils from '../../utils/app.utils'
import IconCalendar from "../../assets/icons/calendar.svg";
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import HelpersAsyncStorage from '../../utils/HelpersAsyncStorage';
import config from '../../config';

export default function Home({ navigation }) {

  const [selectedDate, setSelectedDate] = useState(new Date() || '');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [list, setList] = useState([]);

  // Methods
  const navigateToProposalDetails = (id_visit, id, nom, adresse, ville, priority, code_postal, start, end) => {
    navigation.navigate("HotelDetails", {
      id_visit: id_visit,
      id: id,
      nom: nom,
      adresse: adresse,
      ville: ville,
      priority: priority,
      code_postal: code_postal,
      start: start,
      end: end
    });
  }

  const nbPriority = list.filter(elem => elem.hotel.priority).length
  const nbIsCancelled = list.filter(elem => elem.is_canceled == true).length
  const totalVisit = (list.length - nbIsCancelled)

  const sort = list.sort((a, b) => Date.parse(a.start) - Date.parse(b.start))


  useEffect(() => {

    const url = "/visite?mine=1&day=" + moment(selectedDate).format("YYYY-MM-DD")

    console.log("url", url);

    utils.fetchJson(url, {})
      .then(res => {
        setList(res.data)
        console.log(res.data);
      })
      .catch(error => console.log(error))

  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>

        <View style={styles.headerNav}>
          <View style={styles.contentDate}>
            <Text style={styles.date}>{moment(selectedDate).format("dddd DD MMM YYYY")}</Text>
          </View>
          <TouchableOpacity onPress={() => setOpenDatePicker(!openDatePicker)}>
            <View style={styles.contentIconDatepicker}>
              <IconCalendar
                color={'black'}
                width={25}
                height={25} />
            </View>
          </TouchableOpacity>
        </View>

        {openDatePicker && (
          <DatePicker
            style={styles.datePicker}
            options={{
              mainColor: '#00528C',
            }}
            mode="calendar"
            onSelectedChange={date => setSelectedDate(date)}
          />
        )}

        <View style={styles.headerInfo}>
          <View style={styles.contentTag}>
            <View style={styles.tagInfo}>
              <Text style={styles.textTag}>{totalVisit}</Text>
            </View>
            <Text style={styles.textBold}>Visites à venir</Text>
          </View>
          <View style={styles.contentTag}>
            <View style={styles.tagWarning}>
              <Text style={styles.textTag}>{nbPriority}</Text>
            </View>
            <Text style={styles.textBold}>En urgences</Text>
          </View>
        </View>

        <ScrollView style={styles.contentVisit}>
          <FlatList
            keyExtractor={item => item.id + ""}
            style={styles.flatList}
            data={list}
            renderItem={
              ({ item }) => (
                <TouchableOpacity
                  style={[styles.card, {
                    borderColor: item.hotel.priority == false ? '#00528C' : '#EB5757',
                    backgroundColor: item.is_canceled == '' ? 1 : 'rgba(0, 0, 0, .3)'
                  }]}
                  onPress={() => navigateToProposalDetails(
                    item.id,
                    item.hotel.id,
                    item.hotel.nom,
                    item.hotel.adresse,
                    item.hotel.ville,
                    item.hotel.priority,
                    item.hotel.code_postal,
                    item.start,
                    item.end
                  )}>
                  <Text style={styles.hotelName}>{item.hotel.nom}</Text>
                  <Text style={styles.hotelAdress}>{item.hotel.adresse}</Text>
                  <View style={styles.flexRow}>
                    <View>
                      <View style={[styles.contentVisitTag, { backgroundColor: item.hotel.priority == false ? '#00528C' : '#EB5757' }]}>
                        <Text style={styles.visitTag}>{item.hotel.priority == false ? 'Normal' : 'Urgence'}</Text>
                      </View>
                      <Text style={styles.textBold}>{item.agents[0].nom} - {item.agents[1].nom}</Text>
                    </View>
                    <View>
                      <Text style={styles.visitHour}>{moment(item.start).format("LT")}</Text>
                      <Text style={styles.visitHour}>{moment(item.end).format("LT")}</Text>
                    </View>
                  </View>
                  <View style={styles.containerNotes}>
                    <Text style={styles.textInfo}>Commentaire planif :</Text>
                    <Text style={styles.textDesc}>Verification des chambres de la partie nord de l’immeuble</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          />

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },
  flexRow: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10
  },
  content: {
    flex: 6,
    alignItems: 'center'
  },
  contentDate: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 40,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
  },
  date: {
    color: '#00528C',
    fontSize: 16,
    textTransform: 'capitalize'
  },
  datePicker: {
    marginTop: 80,
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 2
  },
  headerNav: {
    marginTop: 20,
    flexDirection: 'row'
  },
  contentIconDatepicker: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerInfo: {
    flexDirection: 'row'
  },
  contentTag: {
    marginRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  tagInfo: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00528C'
  },
  tagWarning: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EB5757'
  },
  textTag: {
    color: 'white',
  },
  contentVisit: {
    marginTop: 30
  },
  card: {
    padding: 20,
    marginBottom: 15,
    marginLeft: 10,
    width: '95%',
    borderWidth: 2,
    borderRadius: 5
  },
  hotelName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  hotelAdress: {
    fontSize: 15
  },
  visitHour: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  contentVisitTag: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 105,
    height: 35,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  visitTag: {
    color: 'white',
    textTransform: 'uppercase'
  },
  textBold: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  containerNotes: {
    padding: 15,
    backgroundColor: 'rgba(0, 107, 180, 0.1)',
    borderRadius: 5
  },
  textInfo: {
    marginBottom: 10,
    color: 'grey',
    fontSize: 15
  },
  textDesc: {
    fontSize: 15
  }
});
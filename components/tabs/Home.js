import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from 'moment';
moment.updateLocale("fr", {
  firstDayOfWeek: 1
})

import Header from "../Header";
import utils from '../../utils/app.utils'

import IconCalendar from "../../assets/icons/calendar.svg";
import IconPrev from "../../assets/icons/back.svg";
import IconNext from "../../assets/icons/next.svg";

export default function Home(props) {

  const [selectedDate, setSelectedDate] = useState(new Date() || '');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [list, setList] = useState([]);
  const [forceSelectedDate, setForceSelectedDate] = useState(1)

  // Methods
  const navigateToProposalDetails = (id_visit, id, nom, adresse, ville, priority, code_postal, start, end) => {
    props.navigation.navigate("HotelDetails", {
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
    console.log("START", forceSelectedDate);
    const url = "/visite?mine=1&day=" + moment(selectedDate).format("YYYY-MM-DD")
    console.log(selectedDate);
    utils.fetchJson(url, {})
      .then(res => {
        setList([])
        setList(res.data)
        console.log(res.data);
      })
      .catch(error => console.log(error))

  }, [selectedDate, forceSelectedDate]);

  useEffect(() => {
    const reload = props.navigation.addListener('focus', () => {
      // relaod page
      console.log("endddd", forceSelectedDate);
      setForceSelectedDate(Date.now())
    });
    return reload
  }, [props.navigation])

  return (

    <View style={styles.container}>
      <Header navigation={props.navigation} />
      <View style={styles.content}>

        <View style={styles.headerNav}>
          <View style={styles.contentDate}>
            <TouchableOpacity onPress={() => setSelectedDate(moment(selectedDate).subtract(1, 'days').format("YYYY-MM-DD"))}>
              <IconPrev
                color={'black'}
                width={25}
                height={25} />
            </TouchableOpacity>
            <Text style={styles.date}>{moment(selectedDate).format("dddd DD MMM YYYY")}</Text>
            <TouchableOpacity onPress={() => setSelectedDate(moment(selectedDate).add(1, 'days').format("YYYY-MM-DD"))}>
              <IconNext
                color={'black'}
                width={25}
                height={25} />
            </TouchableOpacity>
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
            onDateChange={date => setSelectedDate(date)}
          />
        )}

        <View style={styles.headerInfo}>
          <View style={styles.contentTag}>
            <View style={styles.tagInfo}>
              <Text style={styles.textTag}>{totalVisit}</Text>
            </View>
            <Text style={styles.textBold}>{totalVisit > 1 ? 'Visites à venir' : 'Visite à venir'}</Text>
          </View>
          <View style={styles.contentTag}>
            <View style={styles.tagWarning}>
              <Text style={styles.textTag}>{nbPriority}</Text>
            </View>
            <Text style={styles.textBold}>{nbPriority > 1 ? 'En urgences' : 'En urgence'}</Text>
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
                    backgroundColor: (item.is_canceled === true || item.rapport) ? 'rgba(0, 0, 0, .3)' : ''
                  }]}
                  disabled={item.is_canceled == '' ? false : true}
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
                      <Text style={styles.visitHour}>{moment(item.start).format("LT")} </Text>
                      <Text style={styles.visitHour}>{moment(item.end).format("LT")} </Text>
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
    flexDirection: 'row',
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
    fontWeight: 'normal',
    fontSize: 15,
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
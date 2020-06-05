import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { SearchBar, Card, ListItem, Button, Icon } from "react-native-elements";

import Header from "../Header";
import { ScrollView } from "react-native-gesture-handler";

export default function NotesList({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>Mes notes</Text>
        <SearchBar></SearchBar>
      </View>
      <View style={styles.tabContent}>
        <ScrollView>
          <Card title="1ERE CLASSE CONFLANS">
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,

              }}
              onPress={() => navigation.navigate('NoteDetails')}
              title="Voir la note"
            />
          </Card>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabHeader: {
    flex: 1,
    backgroundColor: "white",
    height: 30,
  },
  tabTitle: {
    fontSize: 16,
  },
  tabContent: {
    flex: 6,
  },
});

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import Header from "../Header";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text>Home</Text>
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
    justifyContent: 'center'
  }
});
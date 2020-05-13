import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <Button
        title="Menu"
        onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#109CF1'
  }
});
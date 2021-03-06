import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

//Tab
import Home from "./components/tabs/Home";
import Contacts from "./components/tabs/Contacts";
import Notifications from "./components/tabs/Notifications";
import Notes from "./components/tabs/Notes";

//Stack
import Login from "./components/stack/Login";
import HotelDetails from "./components/stack/HotelDetails";
import Problem from "./components/stack/Problem";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName="Login"
  >
    <HomeStack.Screen
      name="Home"
      component={DrawerScreen}
      options={{ headerShown: false }} />
    <HomeStack.Screen
      name="HotelDetails"
      component={HotelDetails}
      options={({ route }) => ({
        title: route.params.name,
        headerShown: false
      })}
    />
    <HomeStack.Screen
      name="Problem"
      component={Problem}
      options={({ route }) => ({
        title: route.params.name,
        headerShown: false
      })}
    />
    <HomeStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
  </HomeStack.Navigator>
);


const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Accueil" component={Home} />
    <Drawer.Screen name="Mes notes" component={Notes} />
    <Drawer.Screen name="Déconnexion" component={Login} />
  </Drawer.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
};
import * as React from "react";
import { View, Text } from "react-native-animatable";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Home from "../screens/Home";
import Income from "../screens/Income";
import Expense from "../screens/Expense";
import Detail from "../screens/Detail";

const HomeName = "Dashboard";
const IncomeName = "Pemasukan";
const ExpenseName = "Pengeluaran";
const DetailName = "Data";

const Tab = createBottomTabNavigator();
export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={HomeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === HomeName) {
            iconName = focused ? "home" : "home";
          } else if (rn === IncomeName) {
            iconName = focused ? "money" : "money";
          } else if (rn === ExpenseName) {
            iconName = focused ? "opencart" : "opencart";
          } else if (rn === DetailName) {
            iconName = focused ? "list-alt" : "list-alt";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        }, headerShown: false
      })}
      tabBarOptions={{
        activeTintColor: "#5AB2FF",
        inactiveTintColor: "#a6bdd5",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
      }}
    >
      <Tab.Screen name={HomeName} component={Home} />
      <Tab.Screen name={IncomeName} component={Income} />
      <Tab.Screen name={ExpenseName} component={Expense} />
      <Tab.Screen name={DetailName} component={Detail} />
    </Tab.Navigator>
  );
}

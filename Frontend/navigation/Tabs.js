import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { HomeScreen, SettingScreen, ProfileScreen } from "./screens/index";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createMaterialTopTabNavigator();

export default function Tabs() {
  const size = 26;
  const activecolor='#462990'
  const nonactive = '#A097B3'
  return (
    <Tab.Navigator
    initialRouteName="HomeScreen"
    tabBarPosition="bottom"
    style={{backgroundColor:'white'}}
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      
      tabBarStyle: {
        borderTopWidth: 0.3,
        borderRightWidth:0.3,
        borderLeftWidth:0.3,
        borderColor: "#462990",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow:'hidden',
        backgroundColor:'#F6F6F7',
      },
      tabBarIndicatorStyle: {
        height: 0,
      },
      tabBarIconStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 'auto',
        width: 'auto',
      },
      
    }}
  >
    <Tab.Screen
      name="HomeScreen"
      options={{
        tabBarIcon: ({ focused}) => (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            color={focused ? activecolor : nonactive}
            size={size}
          />
        ),
      }}
      component={HomeScreen}
    />
    <Tab.Screen
      name="SettingScreen"
      options={{
        tabBarIcon: ({ focused}) => (
          <Ionicons
            name={focused ? "settings" : "settings-outline"}
            color={focused ? activecolor : nonactive}
            size={size}
          />
        ),
      }}
      component={SettingScreen}
    />
    <Tab.Screen
      name="ProfileScreen"
      options={{
        tabBarIcon: ({ focused}) => (
          <Ionicons
            name={focused ? "person" : "person-outline"}
            color={focused ? activecolor : nonactive}
            size={size}
          />
        ),
      }}
      component={ProfileScreen}
    />
    </Tab.Navigator>
  );
}
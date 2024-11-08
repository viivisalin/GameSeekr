import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

import Home from './views/Home';
import Login from './views/Login';
import Search from './views/Search';
import Favorites from './views/Favorites';
import Profile from './views/Profile';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let iconColor;

            if (route.name === 'Home') {
              iconName = 'home-outline';
              iconColor = "#797270";
            } else if (route.name === 'Search') {
              iconName = 'search';
              iconColor = "#797270";
            } else if (route.name === 'Favorites') {
              iconName = 'heart-outline';
              iconColor = "#797270";
            } else if (route.name === 'Profile') {
              iconName = 'person';
              iconColor = "#797270";
            } else if (route.name === 'Login') {
              iconName = 'open-outline';
              iconColor = "#797270";
            }

            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarStyle: {
            backgroundColor: '#37322F',
            borderTopWidth: 0,
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarActiveTintColor: '#7F7EFF',
          tabBarInactiveTintColor: '#CBCBCD',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Tab.Screen name="Search" component={Search} options={{ headerShown: false }}/>
        <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }}/>
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        <Tab.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


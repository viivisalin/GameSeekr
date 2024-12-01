import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './app/Home';
import Login from './app/Login';
import Search from './app/Search';
import Favorites from './app/Favorites';
import Profile from './app/Profile';


export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const StackNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
        initialParams={{ onLogin: handleLogin }} 
      />
    </Stack.Navigator>
  );

  const TabNavigator = () => (
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
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} initialParams={{ onLogout: handleLogout }}/>
      </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <StackNavigator />}
    </NavigationContainer>
  );

}


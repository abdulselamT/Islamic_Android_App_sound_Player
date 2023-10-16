/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StyleSheet, View, TouchableOpacity, Text,StatusBar, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './Screens/HomeScreen';
import About from './Screens/About';


const Tab = createMaterialTopTabNavigator();




const App = () => {
return (
    <NavigationContainer>
       <Tab.Navigator 
        activeColor="blue"
        

        screenOptions={
          {
            headerShown: false,
            tabBarStyle:{
              height:50,
            }
          }
        
        }
        >
          <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
              style={{height:25,width:25,}}
              source={require('./Screens/list.png')}
              />
            ),
            tabBarLabel:'',
          }}
          
          />

    <Tab.Screen 
          name="pro" 
          component={About}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
              style={{height:25,width:25,resizeMode:'contain'}}
              source={require('./Screens/abt.png')}
              />
            ),
            tabBarLabel:''
          }}
          
          />

        
        </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  btn: {
    backgroundColor: '#ff0044',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 160,
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default App;
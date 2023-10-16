/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import TrackPlayer,{
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
}from 'react-native-track-player';
import {StyleSheet, View, TouchableOpacity, Text,StatusBar} from 'react-native';
import Slider from '@react-native-community/slider';

const tracks = [
  {
    id: 1,
    url: require('./tracks/a.m4a'),
    title: 'Blues Beat',
  },
  {
    id: 2,
    url: require('./tracks/b.m4a'),
    title: 'b Beat',
  },
  {
    id: 3,
    url: require('./tracks/c.m4a'),
    title: 'c track',
  },
  {
    id: 4,
    url: require('./tracks/d.m4a'),
    title: 'good Beat',
  },
];



const setUpTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(tracks);
  console.log('Tracks added');
}
const togglePlayback = async(playbackstate)=>{
const currentTrack = await TrackPlayer.getCurrentTrack();
console.log("jjjj",currentTrack)
if (currentTrack != null){
  if(playbackstate == State.Paused){
    await TrackPlayer.play()
  } else{
    await TrackPlayer.pause();
  }

}
}

const App = () => {
   const playbackState=usePlaybackState()
   const progress =useProgress() 
  useEffect(() => {
    setUpTrackPlayer();
    console.log("is not");
    
  },[]);

  
    



return (
    <View style={styles.container}>
      <View style={{backgroundColor:'blue'}}>
        <Slider
          style={{width: 200, height: 40}}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          onSlidingComplete={async (value)=>{await TrackPlayer.seekTo(value)}}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View>
        <Text>{new Date(progress.position*1000).toISOString().substr(14,5)}</Text>
      </View>
      <View>
      <Text>{new Date(progress.duration*1000).toISOString().substr(14,5)}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={()=>togglePlayback(playbackState)}>
          <Text style={styles.text}>Pause-play</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => TrackPlayer.play()}>
          <Text style={styles.text}>Play</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
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



















/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import TrackPlayer,{
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
}from 'react-native-track-player';
import {StyleSheet, View, TouchableOpacity, Text,StatusBar, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Slider from '@react-native-community/slider';
import HomeScreen from './Screens/HomeScreen';
import About from './Screens/About';

const Tab = createMaterialTopTabNavigator();



const tracks = [
  {
    id: 1,
    url: require('./tracks/a.m4a'),
    title: 'Blues Beat',
  },
  {
    id: 2,
    url: require('./tracks/b.m4a'),
    title: 'b Beat',
  },
  {
    id: 3,
    url: require('./tracks/c.m4a'),
    title: 'c track',
  },
  {
    id: 4,
    url: require('./tracks/d.m4a'),
    title: 'good Beat',
  },
];



const setUpTrackPlayer = async () => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add(tracks);
  console.log('Tracks added');
}
const togglePlayback = async(playbackstate)=>{
const currentTrack = await TrackPlayer.getCurrentTrack();
if (currentTrack != null){
  if(playbackstate == State.Paused){
    await TrackPlayer.play()
  } else{
    await TrackPlayer.pause();
  }

}
}

const App = () => {
   const playbackState=usePlaybackState()
   const progress =useProgress() 
  useEffect(() => {
    setUpTrackPlayer();
    console.log("is not");
    
  },[]);

  
    



return (
    <NavigationContainer>
       <Tab.Navigator 
        activeColor="blue"
        barStyle={{height:90, }}
        screenOptions={
          {headerShown: false,
          }
        
        }
        >
          <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Image
              style={{height:44,width:44,}}
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
              style={{height:44,width:24,}}
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
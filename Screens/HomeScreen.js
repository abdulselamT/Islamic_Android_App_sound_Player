import {
  View,
  Text,
  StatusBar,
  Pressable,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Image,
  ToastAndroid,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {allfiles} from './Ousme';

const setUpTrackPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      // Media controls capabilities
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],


      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [Capability.Play, Capability.Pause],
    
     
    });
    await TrackPlayer.add(allfiles);
  } catch {
    console.log('Tracks not added');
  }
};
const togglePlayback = async playbackstate => {
  const currentTrack = await TrackPlayer.getCurrentTrack();

  if (currentTrack != null) {
    if (playbackstate == State.Paused) {
      await TrackPlayer.play();
      
    } else if (playbackstate == State.Playing) {
      await TrackPlayer.pause();
      
    } else {
      await TrackPlayer.play();
    }
  }
};

const HomeScreen = () => {
  const playbackState = usePlaybackState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [more,setMore]=useState(false);
  const [vol,setVol]=useState(0.5);
  const [repeatMode, setRepeatMode] = useState('off');
  
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      setCurrentIndex(event.nextTrack);
      
      
    }
  });




  const changeRepeatMode = () => {
    console.log("wats up")
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    }

    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setRepeatMode('repeat');
    }

    if (repeatMode == 'repeat') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setRepeatMode('off');
    }
  };




  const setData = async () => {
    console.log('i am called..');
    try {
      var user = {
        Ind: currentIndex,
        Time: progress.position,
      };
      await AsyncStorage.setItem('UserData', JSON.stringify(user));
      ToastAndroid.showWithGravity(
        'The audio saved @ ' +
          new Date(progress.position * 1000).toISOString().substr(14, 5) +
          ' you can play later by pressing The blue play button',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      AsyncStorage.getItem('UserData').then(async value => {
        if (value != null) {
          let user = JSON.parse(value);
          setCurrentIndex(user.Ind);
          await TrackPlayer.skip(user.Ind);
          await TrackPlayer.seekTo(user.Time);
          //play(user.Ind, user.Time);
          //startfrom(user.Time);
        }
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'you have not saved an audio at some time.',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const renderItem = useCallback(
    ({item, index}) => (
      <View
        key={index}
        style={[
          {
            borderBottomColor: 'black',
            borderBottomWidth: .5,
            padding: 5,
            paddingBottom: 25,
            paddingTop: 25,
          },
          {
            backgroundColor: index === currentIndex ? '#8533ff' : '#D6EEEE',
          },
        ]}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            TrackPlayer.skip(index);
            setCurrentIndex(index);
          }}>
          <Text
            style={{
              color: index === currentIndex ? 'white' : 'black',
              width: 30,
              
              marginRight: 5,
              fontWeight:'bold',
            }}>
            {Number(index) + 1}
          </Text>
          <Text style={{fontSize:16,color: index === currentIndex ? 'white' : 'black'}}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [currentIndex],
  );

  const progress = useProgress();
  useEffect( () => {
   
    try {
      setUpTrackPlayer();
      
    } catch {}
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <View></View>

      <View style={{height: 10, flexGrow: 1}}>
        <FlatList data={allfiles} renderItem={renderItem} />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 25,
          //backgroundColor: "#33ccff",
        }}>
        <View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 5,
            }}>
            <Text
              style={{
                alignContent: 'center',
                fontWeight: 'bold',
                color: 'black',
              }}>
              {allfiles[currentIndex].title}
            </Text>
          </View>

          <Slider
            style={{
              backgroundColor: 'transparent',
              width: 'auto',
              marginVertical: 10,
            }}
            minimumValue={0}
            maximumValue={progress.duration}
            value={progress.position}
            onSlidingComplete={async value => {
              await TrackPlayer.seekTo(value);
            }}
            minimumTrackTintColor="blue"
            maximumTrackTintColor="#999999"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15,
          }}>
          <View>
            <Text style={{color: 'black'}}>
              {new Date(progress.position * 1000).toISOString().substr(14, 5)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 30}}>
            
         {!vol && <View>
              <TouchableOpacity
                onPress={async () => {
                  setMore(!more);
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={require('./Images/voff.png')}
                />
              </TouchableOpacity>
            </View>
        }




            <View>
              <TouchableOpacity
                onPress={async () => {
                  await TrackPlayer.skipToPrevious();
                  
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={require('./Images/prev.png')}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={async () => {
                  
                  togglePlayback(playbackState);
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={
                    playbackState === State.Playing
                      ? require('./Images/pause.png')
                      : require('./Images/play.png')
                  }
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={async () => {
                  TrackPlayer.skipToNext();
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={require('./Images/fwd.png')}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  setMore(!more);
                }}>
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    bottom: 7,
                    resizeMode: 'contain',
                  }}
                  source={more ?require('./Images/up.png') : require('./Images/more.png')}
                />
              </TouchableOpacity>
            </View>
            
          </View>
          <View>
            <Text style={{color: 'black'}}>
              {new Date(progress.duration * 1000).toISOString().substr(14, 5)}
            </Text>
          </View>
        </View>
       {more &&
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap:20,
            marginHorizontal:20,
          }}>
            <View>
            <TouchableOpacity
              onPress={changeRepeatMode}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  bottom: 3,
                  resizeMode: 'contain',
                }}
                //source={require('./Images/repeat_once.png')}
                source={ repeatMode === 'off' ? require('./Images/repeat_off.png'):repeatMode==='repeat'?require('./Images/repeat.png'):require('./Images/repeat_once.png')}
              />
             
            </TouchableOpacity>
            
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setData();
              }}>
              <Image
                style={{
                  height: 40,
                  width: 40,
                  bottom: 3,
                  resizeMode: 'contain',
                }}
                source={require('./Images/bbm.png')}
              />
            </TouchableOpacity>
          </View>

          

          <View style={{flex:3,flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>{vol?setVol(0):setVol(0.5)}}>
          <Image
                style={{
                  height: 30,
                  width: 30,
                  bottom: 3,
                  resizeMode: 'contain',
                }}
                source={vol ? require('./Images/vol.png'):require('./Images/voff.png')}
              />
              </TouchableOpacity>
            <Slider
              style={{
                flexGrow:1,
                backgroundColor: 'transparent',
                width: 'auto',
                marginVertical: 10,
              }}
              minimumValue={0}
              maximumValue={1}
              value={vol}
              onSlidingComplete={async value => {
                await TrackPlayer.setVolume(value);
                setVol(value);
                
              }}
              minimumTrackTintColor="black"
              maximumTrackTintColor="#999999"
            />
          </View>

          
          <View>
              <TouchableOpacity
                onPress={() => {
                  getData();
                }}>
                  
                <Image
                  style={{height: 38, width: 38, bottom: 5}}
                  source={require('./Images/rop.png')}
                />
                
              </TouchableOpacity>
            </View>
        </View>
}
      </View>
    </View>
  );
};

export default HomeScreen;

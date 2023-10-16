import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Button,
  Image,
  RefreshControl,
  View,
  Alert,
  StatusBar,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import AnimatedTyping from './AnimatedT';

const About = () => {
  return (
    <ScrollView style={styles.allabout}>
      <View
        style={{
          width: '100%',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{flexShrink: 1}}>
          <Text style={{fontSize: 20, alignContent: 'center', color: 'black'}}>
            ባፈድል በ ሸይኽ ሳላህ ሙሃመድ #ዳዕዋ_ቲቪ #daewatv
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://www.youtube.com/watch?v=Q8XO4se2890&list=PLYpN7I_Wo22rD3OdTN6eF3MVJ5ge0eFNJ`,
            )
          }>
          <Image
            style={{height: 50, width: 50}}
            source={require('./Images/yt.png')}
          />
        </TouchableOpacity>
      </View>
      <AnimatedTyping/>
      <View>
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        </View>

        <View style={styles.centv}>
          <View>
            <Image
              style={{
                width: Dimensions.get('window').width,
                resizeMode: 'stretch',
              }}
              source={require('./aosqalogo.jpg')}
            />
          </View>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => Linking.openURL(`https:t.me/aosqa_dev_islamic`)}>
                <Image
                  style={{height: 50, width: 50,resizeMode:'contain'}}
                  source={require('./Images/tg.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`mailto:abdulselam4246@gmail.com`)
                }>
                <Image
                  style={{height: 50, width: 50,resizeMode:'contain'}}
                  source={require('./Images/gm.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(`https:linkedin.com/in/abduselamm/`)
                }>
                <Image
                  style={{height: 50, width: 50,resizeMode:'contain'}}
                  source={require('./Images/in.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:+251935664245`)}>
                <Image
                  style={{height: 50, width: 50,marginBottom:4}}
                  source={require('./Images/po.png')}
                />
              </TouchableOpacity>
            </View>
          </View>


        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  allabout: {
    flex: 1,
    backgroundColor:'#fff'
  },
  centv: {
    justifyContent: 'center',
  },
});

export default About;

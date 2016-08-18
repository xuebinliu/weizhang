/**
 * Created by free on 8/18/16.
 */

import React from 'react';
import{
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';

import NavigationBar from '../../widget/TabNavigator';

import {NAV_HEIGHT} from '../../const';

export default class Login extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <NavigationBar
            title={'Test'}
            height={NAV_HEIGHT}
            titleColor={'#fff'}
            backgroundColor={'#149be0'}
        />

        <Text style={{marginTop:NAV_HEIGHT}}>
          Login
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  line:{
    height:1,
    backgroundColor:'#ccc',
    marginLeft:8,
    marginRight:8,
  },

});



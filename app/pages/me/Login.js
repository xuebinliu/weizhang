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

import gstyles from '../../gstyles';


export default class Login extends React.Component {

  render() {
    return (
      <View style={styles.container}>

        <NavigationBar
            title={'Test'}
            titleColor={'#fff'}
        />

        <View style={[gstyles.content, {marginTop: 80}]}>
          <TextInput style={styles.input} placeholder={"邮箱/手机号"}/>

          <TextInput style={styles.input} placeholder={"密码"}/>

          <TouchableOpacity style={[gstyles.button, {marginTop:30}]}>

            <Text>登陆</Text>

          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    height: 60,
    marginHorizontal:15,
  },

});



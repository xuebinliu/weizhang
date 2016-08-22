/**
 * Created by free on 8/20/16.
 *
 * 注册界面
 */



import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    InteractionManager,
    TextInput,
    Platform,
    ToastAndroid,
} from 'react-native';


import Ionicons from 'react-native-vector-icons/Ionicons';

import NavigationBar from '../../widget/TabNavigator';
import {naviGoBack} from '../../utils/common';

import gstyles from '../../gstyles';


export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'注册'}
              titleColor={'#fff'}
              leftButtonIcon="ios-arrow-round-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>

            <TextInput style={[gstyles.input, {marginTop: 20}]} placeholder={"昵称"}/>

            <TextInput style={gstyles.input} placeholder={"邮箱/手机号"}/>

            <TextInput secureTextEntry={true} style={gstyles.input} placeholder={"密码"}/>

            <TextInput secureTextEntry={true} style={gstyles.input} placeholder={"确认密码"}/>

            <TouchableOpacity style={[gstyles.button, {marginTop:30}]}>
              <Text style={{color:'white'}} >注册</Text>
            </TouchableOpacity>
          </View>

        </View>
    );
  }

}
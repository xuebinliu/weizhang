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
    TextInput,
    Alert,
} from 'react-native';

import AV from 'leancloud-storage';

import NavigationBar from '../../widget/TabNavigator';
import {naviGoBack} from '../../utils/common';

import DeviceStorage from '../../utils/Storage';
import {SK_ACCOUNT_INFO} from '../../const/StorageKey';

import gstyles from '../../gstyles';
import LoadingView from '../../widget/LoadingView';

let nickName;
let account;
let pwd;
let confirmPwd;

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRegister() {
    if(nickName == undefined || nickName.length < 1) {
      Alert.alert('提示', '请输入昵称');
      return;
    }

    if(account == undefined || account.length < 1) {
      Alert.alert('提示', '请输入账号');
      return;
    }

    if(pwd == undefined || pwd.length < 1) {
      Alert.alert('提示', '请输入密码');
      return;
    }

    if(confirmPwd == undefined || confirmPwd.length < 1) {
      Alert.alert('提示', '请输入确认密码');
      return;
    }

    if(pwd !== confirmPwd) {
      Alert.alert('提示', '两次输入密码不一致, 请重新输入');
      return;
    }

    // 新建 AVUser 对象实例
    var user = new AV.User();
    // 设置用户名
    user.setUsername(account);
    // 设置密码
    user.setPassword(pwd);
    // 设置邮箱
    // if(account.contains("@")) {
    //   user.setEmail(account);
    // }

    user.signUp().then(function (loginedUser) {
      console.log('register success, ' + loginedUser);
      // 注册成功

      DeviceStorage.save(SK_ACCOUNT_INFO, loginedUser);

    }, (function (error) {
      console.log('register faild, ' + error);

    }));

  }

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'注册'}
              titleColor={'#fff'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>

            <TextInput onChangeText={(text) => nickName=text} style={[gstyles.input, {marginTop: 20}]} placeholder={"昵称"}/>

            <TextInput onChangeText={(text) => account=text} style={gstyles.input} placeholder={"账号(邮箱/手机号)"}/>

            <TextInput onChangeText={(text) => pwd=text} secureTextEntry={true} style={gstyles.input} placeholder={"密码"}/>

            <TextInput onChangeText={(text) => confirmPwd=text} secureTextEntry={true} style={gstyles.input} placeholder={"确认密码"}/>

            <TouchableOpacity onPress={this.onRegister} style={[gstyles.button, {marginTop:30}]}>
              <Text style={{color:'white'}} >注册</Text>
            </TouchableOpacity>
          </View>

        </View>
    );
  }

}
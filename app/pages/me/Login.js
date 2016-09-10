/**
 * Created by free on 8/18/16.
 *
 * 登陆界面
 */

import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    TextInput,
    Alert,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
    Register,
} from '../../header';

import ResetPassword from './ResetPassword';

import AV from 'leancloud-storage';

let account;
let pwd;

export default class Login extends React.Component {
  constructor(props){
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onRightButtonPress = this.onRightButtonPress.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onBackHandle(){
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  // register
  onRightButtonPress(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Register,
      });
    });
  };

  onLogin(){
    if(account == undefined || account.length < 1) {
      Alert.alert('提示', '亲, 请输入账号');
      return;
    }

    if(pwd == undefined || pwd.length < 1) {
      Alert.alert('提示', '亲, 请输入密码');
      return;
    }

    const that = this;
    AV.User.logIn(account, pwd).then(function (loginedUser) {
      toastShort('登陆成功');
      that.onBackHandle();
    }, function (error) {
      console.error(error);
      toastShort('登陆失败');
    });
  }

  onReset(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: ResetPassword,
      });
    });
  }

  render() {
    return (
      <View style={gstyles.container}>
        <NavigationBar
            title={'登陆'}
            leftButtonIcon="md-arrow-back"
            onLeftButtonPress={this.onBackHandle}
            rightButtonTitle={"注册"}
            rightButtonTitleColor={'white'}
            onRightButtonPress={this.onRightButtonPress}
        />

        <View style={gstyles.content}>
          <TextInput autoFocus={true} onChangeText={(text)=> account=text} style={[gstyles.input, {marginTop: 20}]} placeholder={"邮箱/手机号"}/>

          <TextInput onChangeText={(text)=> pwd=text} secureTextEntry={true} style={gstyles.input} placeholder={"密码"}/>

          <TouchableOpacity onPress={this.onReset}>
            <Text style={{color:'blue', alignSelf:'flex-end', marginRight:15}}>
              忘记密码?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.onLogin} style={[gstyles.button, {marginTop:30}]}>
            <Text style={{color:'white'}} >登陆</Text>
          </TouchableOpacity>

          <View style={{marginTop:70,alignItems:'center'}}>
            <Text style={{fontSize:13,color:'#777'}}>------------第三方账号登录------------</Text>
            <View style={{flexDirection:'row',marginTop:20}}>
              <TouchableOpacity>
                <Image source={require('../../img/ic_login_weixin.png')} style={{width:50,height:50}}/>
              </TouchableOpacity>
            </View>
          </View>

        </View>

      </View>
    );
  }
}



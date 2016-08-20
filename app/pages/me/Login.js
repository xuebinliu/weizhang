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
import {naviGoBack} from '../../utils/common';

import gstyles from '../../gstyles';


export default class Login extends React.Component {

  constructor(props){
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onRightButtonPress = this.onRightButtonPress.bind(this);
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRightButtonPress() {

  };

  render() {
    return (
      <View style={styles.container}>

        <NavigationBar
            title={'Test'}
            titleColor={'#fff'}
            leftButtonIcon="ios-arrow-round-back"
            onLeftButtonPress={this.onBackHandle}
            rightButtonTitle={"注册"}
            rightButtonTitleColor={'white'}
            onRightButtonPress={this.onRightButtonPress}
        />

        <View style={[gstyles.content, {marginTop: 80}]}>
          <TextInput style={styles.input} placeholder={"邮箱/手机号"}/>

          <TextInput style={styles.input} placeholder={"密码"}/>

          <TouchableOpacity>
            <Text style={{color:'blue', alignSelf:'flex-end', marginRight:15}}>
              忘记密码?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[gstyles.button, {marginTop:30}]}>
            <Text style={{color:'white'}} >登陆</Text>
          </TouchableOpacity>


          <View style={{marginTop:70,alignItems:'center'}}>
            <Text style={{fontSize:13,color:'#777'}}>----------------第三方账号登录----------------</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    height: 60,
    marginHorizontal:15,
  },

});



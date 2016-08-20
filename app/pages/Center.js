/**
 * Created by free on 8/16/16.
 */

import React from 'react';
import {
    Text,
    View,
    InteractionManager,
    TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import gstyles from '../gstyles';
import NavigationBar from '../widget/TabNavigator';

import Login from './me/Login';



export default class Center extends React.Component {

  constructor(props) {
    super(props);

    this.loginButtonAction=this.loginButtonAction.bind(this);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onForwardHandle = this.onForwardHandle.bind(this);

  }


  onBackHandle() {

  };

  onForwardHandle() {

  };

  //登录
  loginButtonAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Login,
        name: 'Login'
      });
    });
  }

  render() {
    return (
        <View style={gstyles.container}>

          <NavigationBar
              title={'Test3'}
              titleColor={'white'}
          />

          <View style={gstyles.content}>
            <TouchableOpacity onPress={() => {this.loginButtonAction()}}>
              <View style={{flexDirection:'row', backgroundColor:'white', height:80, marginTop:80}}>
                <Ionicons name={"md-contact"} size={60} color="coral" style={{marginLeft:10, alignSelf:'center'}}/>
                <View style={{flexDirection:'column', justifyContent:'center', marginLeft:10}}>
                  <Text> 用户名 </Text>
                  <Text> 简介 </Text>
                </View>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={30} color="#4F8EF7" style={{alignSelf:'center', marginRight:10}}/>
                </View>
              </View>
            </TouchableOpacity>

          </View>


        </View>
    );
  }
}

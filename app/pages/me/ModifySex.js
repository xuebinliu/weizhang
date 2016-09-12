/**
 * Created by free on 9/12/16.
 * 修改性别
 */
import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
} from '../../header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

export default class ModifySex extends React.Component {
  constructor(props){
    super(props);

    let type = AV.User.current().get('sex');
    this.init(type);
  }

  init= (type)=>{
    switch (type){
      case 0:
        this.state = {
          isCheckMan:true,
          isCheckWoman:false,
          isCheckSecret:false,
        };
        break;
      case 1:
        this.state = {
          isCheckMan:false,
          isCheckWoman:true,
          isCheckSecret:false,
        };
        break;
      case 2:
        this.state = {
          isCheckMan:false,
          isCheckWoman:false,
          isCheckSecret:true,
        };
        break;
      default:
        this.state = {
          isCheckMan:false,
          isCheckWoman:false,
          isCheckSecret:false,
        };
        break;
    }
  };

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  save= (type)=>{
    AV.User.current().set('sex', type);
    AV.User.current().save();

    const {route} = this.props;
    route.callback();

    this.onBackHandle();
    toastShort('修改成功');
  };

  onPressMan= ()=>{
    this.save(0);
  };

  onPressWoman= ()=>{
    this.save(1);
  };

  onPressSecret= ()=>{
    this.save(2);
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改性别'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>
            <TouchableOpacity onPress={this.onPressMan}>
              <View style={[gstyles.listItem, {height:50, flexDirection:'row', alignItems:'center', paddingHorizontal:15}]}>
                <Text>男</Text>
                <View style={{flex:1,flexDirection:'row-reverse'}}>
                  <Ionicons name={this.state.isCheckMan ? "ios-radio-button-on" : "ios-radio-button-off"} size={24} color="dimgray"/>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onPressWoman}>
              <View style={[gstyles.listItem, {height:50, flexDirection:'row', alignItems:'center', paddingHorizontal:15}]}>
                <Text>女</Text>
                <View style={{flex:1,flexDirection:'row-reverse'}}>
                  <Ionicons name={this.state.isCheckWoman ? "ios-radio-button-on" : "ios-radio-button-off"} size={24} color="dimgray"/>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onPressSecret}>
              <View style={[gstyles.listItem, {height:50, flexDirection:'row', alignItems:'center', paddingHorizontal:15}]}>
                <Text>保密</Text>
                <View style={{flex:1,flexDirection:'row-reverse'}}>
                  <Ionicons name={this.state.isCheckSecret ? "ios-radio-button-on" : "ios-radio-button-off"} size={24} color="dimgray"/>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>
    );
  }
}
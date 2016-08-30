/**
 * Created by free on 8/16/16.
 *
 * 我的界面
 */

import React from 'react';
import {
    Text,
    View,
    InteractionManager,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import gstyles from '../gstyles';
import NavigationBar from '../widget/TabNavigator';

import Login from './me/Login';
import Feedback from './me/Feedback';


export default class Center extends React.Component {

  constructor(props) {
    super(props);

    this.loginButtonAction=this.loginButtonAction.bind(this);
    this.onFeedback=this.onFeedback.bind(this);
  }

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

  // 反馈
  onFeedback() {
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Feedback,
        name: 'Feedback'
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
              <View style={[gstyles.listItem, {flexDirection:'row', height:70, marginTop:15, position:'relative'}]}>
                <Ionicons name={"md-contact"} size={60} color="coral" style={{marginLeft:10, alignSelf:'center'}}/>
                <View style={{flexDirection:'column', justifyContent:'center', marginLeft:10}}>
                  <Text> 用户名 </Text>
                  <Text> 简介 </Text>
                </View>

                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>

              </View>
            </TouchableOpacity>

            <View style={[gstyles.listItem, styles.item, {marginTop:15}]}>
              <Text>当前版本</Text>
            </View>

            <View style={gstyles.noMarginline}/>

            <View style={[gstyles.listItem, styles.item]}>
              <TouchableOpacity onPress={() => {this.onFeedback()}}>
                <Text>反馈</Text>
              </TouchableOpacity>
            </View>

            <View style={gstyles.noMarginline}/>

            <View style={[gstyles.listItem, styles.item]}>
              <Text>关于</Text>
            </View>

          </View>


        </View>
    );
  }
}

const styles = StyleSheet.create({
  item:{
    justifyContent:'center',
    height:40,
    paddingHorizontal:10,
  }
});



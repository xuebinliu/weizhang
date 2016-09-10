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

import {
    gstyles,
    DeviceStorage,
    NavigationBar,
    toastShort,
    Login,
    Feedback,
    Profile,
} from '../header';

import AV from 'leancloud-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class Center extends React.Component {
  constructor(props) {
    super(props);

    this.onLogin=this.onLogin.bind(this);
    this.onFeedback=this.onFeedback.bind(this);
    this.onVersion=this.onVersion.bind(this);
    this.onAbout=this.onAbout.bind(this);
  }

  onLogin(){
    const {navigator} = this.props;
    if (AV.User.current()) {
      // go user profile
      navigator.push({
        component: Profile,
      });
    }
    else {
      // go login
      navigator.push({
        component: Login,
      });
    }
  }

  onFeedback(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Feedback,
      });
    });
  }

  onVersion(){

  }

  onAbout(){

  }

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'Test3'}
              titleColor={'white'}
          />

          <View style={gstyles.content}>
            <TouchableOpacity onPress={() => {this.onLogin()}}>
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

            <TouchableOpacity onPress={() => {this.onVersion()}}>
              <View style={[gstyles.listItem, styles.item, {marginTop:15, position:'relative'}]}>
                <Text>已发单</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>
            <View style={gstyles.noMarginline}/>
            <TouchableOpacity onPress={() => {this.onVersion()}}>
              <View style={[gstyles.listItem, styles.item,]}>
                <Text>已接单</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.onVersion()}}>
              <View style={[gstyles.listItem, styles.item, {marginTop:15, position:'relative'}]}>
                  <Text>版本</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>
            <View style={gstyles.noMarginline}/>
            <TouchableOpacity onPress={() => {this.onFeedback()}}>
              <View style={[gstyles.listItem, styles.item]}>
                <Text>反馈</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>
            <View style={gstyles.noMarginline}/>
            <TouchableOpacity onPress={() => {this.onAbout()}}>
              <View style={[gstyles.listItem, styles.item]}>
                  <Text>关于</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>

          </View>


        </View>
    );
  }
}

const styles = StyleSheet.create({
  item:{
    alignItems:'center',
    flexDirection:'row',
    height:40,
    paddingLeft:10,
    position:'relative'
  }
});



/**
 * Created by free on 9/9/16.
 * 个人信息展示页面
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

import ModifyAge from './ModifyAge';
import ModifyEmail from './ModifyEmail';
import ModifyHead from './ModifyHead';
import ModifyName from './ModifyName';
import ModifySex from './ModifySex';

export default class Profile extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      userinfo:AV.User.current(),
    }
  }

  onChangeProfile= ()=>{
    this.setState({
      userinfo:AV.User.current(),
    });
  };

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onLogout= ()=>{
    AV.User.logOut();
    toastShort('退出登录成功');
  };

  onModifyHead= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: ModifyHead,
    });
  };

  onModifyName= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: ModifyName,
    });
  };

  onModifyEMail= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: ModifyEmail,
    });
  };

  onModifySex= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: ModifySex,
      callback:this.onChangeProfile
    });
  };

  onModifyAge= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: ModifyAge,
    });
  };

  getSex= ()=>{
    let sex = this.state.userinfo.get('sex');
    if(sex === 0) {
      return '男';
    } else if(sex === 1){
      return '女';
    } else if(sex ===2){
      return '保密';
    } else {
      return '未设置';
    }
  };

  render(){
    return(
      <View style={gstyles.container}>
        <NavigationBar
            title={'个人信息'}
            leftButtonIcon="md-arrow-back"
            onLeftButtonPress={this.onBackHandle}
        />

        <ScrollView style={[gstyles.content,]}>
          <TouchableOpacity onPress={this.onModifyHead}>
            <View style={[gstyles.listItem, styles.item, {height:70, marginTop:15}]}>
              <Text>头像</Text>
              <View style={{flex:1, flexDirection:'row', marginRight:10, justifyContent:'flex-end'}}>
                <Image style={{width:60, height:60}} source={require('../../img/ic_setting.png')}></Image>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="gray"/>
            </View>
          </TouchableOpacity>
          <View style={gstyles.line}/>

          <TouchableOpacity onPress={this.onModifyName}>
            <View style={[gstyles.listItem, styles.item]}>
              <Text>昵称</Text>
              <View style={{flex:1, flexDirection:'row', marginRight:10, justifyContent:'flex-end'}}>
                <Text>{this.state.userinfo.getUsername()}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="gray"/>
            </View>
          </TouchableOpacity>
          <View style={gstyles.line}/>

          <TouchableOpacity onPress={this.onModifySex}>
            <View style={[gstyles.listItem, styles.item]}>
              <Text>性别</Text>
              <View style={{flex:1, flexDirection:'row', marginRight:10, justifyContent:'flex-end'}}>
                <Text>{this.getSex()}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="gray"/>
            </View>
          </TouchableOpacity>
          <View style={gstyles.line}/>

          <TouchableOpacity onPress={this.onModifyAge}>
            <View style={[gstyles.listItem, styles.item]}>
              <Text>年龄</Text>
              <View style={{flex:1, flexDirection:'row', marginRight:10, justifyContent:'flex-end'}}>
                <Text>未设置</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="gray"/>
            </View>
          </TouchableOpacity>
          <View style={gstyles.line}/>

          <TouchableOpacity onPress={this.onModifyEMail}>
            <View style={[gstyles.listItem, styles.item]}>
              <Text>绑定邮箱</Text>
              <View style={{flex:1, flexDirection:'row', marginRight:10, justifyContent:'flex-end'}}>
                <Text>未绑定</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="gray"/>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={this.onLogout} style={[gstyles.button, {marginTop:30}]}>
            <Text style={{color:'white'}}>退出登录</Text>
          </TouchableOpacity>

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
    alignItems:'center',
    height:40,
    position:'relative',
    paddingHorizontal:15,
  },
});
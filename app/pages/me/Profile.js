/**
 * Created by free on 9/9/16.
 */
import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
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

export default class Profile extends React.Component {

  constructor(props){
    super(props);
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onLogout= ()=>{
    AV.User.logOut();
    toastShort('退出登录成功');
  };

  onModifyHead= ()=>{

  };

  onModifyName= ()=>{

  };

  onModifyEMail= ()=>{

  };

  onModifySex= ()=>{

  };

  onModifyAge= ()=>{

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
                <Text>nickname</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="gray"/>
            </View>
          </TouchableOpacity>
          <View style={gstyles.line}/>

          <TouchableOpacity onPress={this.onModifySex}>
            <View style={[gstyles.listItem, styles.item]}>
              <Text>性别</Text>
              <View style={{flex:1, flexDirection:'row', marginRight:10, justifyContent:'flex-end'}}>
                <Text>未设置</Text>
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
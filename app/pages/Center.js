/**
 * Created by free on 8/16/16.
 *
 * 我的界面
 */

import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

import {
    gstyles,
    DeviceStorage,
    NavigationBar,
    toastShort,
    Login,
    Feedback,
    About,
    Profile,
    AlbumContainer,
    Follows,
} from '../header';

import AV from 'leancloud-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Center extends React.Component {
  constructor(props) {
    super(props);

    this.updateUserState = this.updateUserState.bind(this);

    this.state = {
      nickName:'未登陆',
      mind:'',
      avatar_url:null,
    };
  }

  componentDidMount() {
    this.setUser();
  }

  /**
   * 更新头像、昵称状态
   */
  setUser = ()=>{
    const that = this;
    AV.User.currentAsync().then((currentUser)=>{
      console.log('setUser currentUser', currentUser);
      let nickName='未登录';
      if(currentUser) {
        nickName = this.getNickName(currentUser);
      }

      that.setState({
        nickName:nickName,
        mind:currentUser.get('mind'),
        avatar_url:currentUser.get('avatar_url'),
      });
    }).catch(function (error) {
      console.log('setUser no user info', error);
      that.setState({
        nickName:'未登陆',
        mind:'',
        avatar_url:null,
      });
    });
  };

  /**
   * 获取昵称，如果没设置则返回用户名
   * @returns {*}
   */
  getNickName= (currentUser)=>{
    let nickname = currentUser.get('nickname');
    if(nickname) {
      return nickname;
    } else {
      return currentUser.getUsername();
    }
  };

  // login success callback
  updateUserState(){
    this.setUser();
  }

  // 点击登录
  onLogin= ()=>{
    const {navigator} = this.props;
    AV.User.currentAsync().then((currentUser)=>{
      if(currentUser) {
        navigator.push({
          component: Profile,
          callback: this.updateUserState,
        });
      } else {
        // go login
        navigator.push({
          component: Login,
          callback: this.updateUserState,
        });
      }
    });
  };

  // 点击关注
  onPressFollows= ()=>{
    const {navigator} = this.props;
    AV.User.currentAsync().then((currentUser)=>{
      if(currentUser) {
        navigator.push({
          component: Follows,
          title: '关注列表',
        });
      } else {
        // go login
        navigator.push({
          component: Login,
          callback: this.updateUserState,
        });
      }
    });
  };

  // 点击粉丝
  onPressFollowees= ()=>{
    const {navigator} = this.props;
    AV.User.currentAsync().then((currentUser)=>{
      if(currentUser) {
        navigator.push({
          component: Follows,
          title: '粉丝列表',
        });
      } else {
        // go login
        navigator.push({
          component: Login,
          callback: this.updateUserState,
        });
      }
    });
  };

  // 建议
  onFeedback= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: Feedback,
    });
  };

  // 相册
  onPressAlbum = ()=>{
    const that = this;
    AV.User.currentAsync().then((currentUser)=>{
      const {navigator} = that.props;
      if(currentUser) {
        navigator.push({
          component: AlbumContainer,
          currentUser:currentUser,
        });
      } else {
        navigator.push({
          component: Login,
          callback: this.updateUserState,
        });
      }
    });
  };

  onAbout = ()=>{
    const {navigator} = this.props;
    navigator.push({
      component: About,
    });
  };

  renderAvatar= ()=>{
    let url = this.state.avatar_url;
    if(url) {
      return (
          <Image style={{width:60, height:60, borderRadius:30, marginLeft:10, alignSelf:'center'}} source={{uri:url}}></Image>
      );
    } else {
      return (
          <Ionicons name={"md-contact"} size={60} color="coral" style={{marginLeft:10, alignSelf:'center'}}/>
      );
    }
  };

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
                {this.renderAvatar()}
                <View style={{flexDirection:'column', justifyContent:'center', marginLeft:10}}>
                  <Text>{this.state.nickName}</Text>
                  <Text>{this.state.mind}</Text>
                </View>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>
            <View style={gstyles.line}/>

            <View style={[gstyles.listItem, {flexDirection:'row', paddingVertical:10}]}>
              <TouchableOpacity style={styles.op_action}>
                <View style={{flexDirection:'column'}}>
                  <Text>红豆</Text>
                  <Text>100</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressFollowees} style={styles.op_action}>
                <View style={{flexDirection:'column'}}>
                  <Text>粉丝</Text>
                  <Text>100</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressFollows} style={styles.op_action}>
                <View style={{flexDirection:'column'}}>
                  <Text>关注</Text>
                  <Text>100</Text>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => {this.onPressAlbum()}}>
              <View style={[gstyles.listItem, styles.item, {marginTop:15, position:'relative'}]}>
                <Text>相册</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>
            <View style={gstyles.noMarginline}/>
            <TouchableOpacity onPress={() => {this.onPressVersion()}}>
              <View style={[gstyles.listItem, styles.item,]}>
                <Text>充值</Text>
                <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
                  <Ionicons name="ios-arrow-forward" size={20} color="gray" style={{alignSelf:'center', marginRight:15}}/>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {this.onFeedback()}}>
              <View style={[gstyles.listItem, styles.item, {marginTop:15, position:'relative'}]}>
                <Text>建议</Text>
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
  op_action:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },

  item:{
    alignItems:'center',
    flexDirection:'row',
    height:40,
    paddingLeft:15,
    position:'relative'
  }
});

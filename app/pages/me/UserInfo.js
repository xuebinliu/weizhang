/**
 * Created by free on 12/26/16.
 *
 * 展示用户的基本信息
 */

import React from 'react';
import{
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  naviGoBack,
} from '../../header';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default class UserInfo extends React.Component {
  constructor(props){
    super(props);

    const {route} = this.props;
    this.state = {
      userData:route.userData,
    }
  }

  onBackHandle= ()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onPressLook= ()=>{
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'TA的主页'}
              titleColor={'#fff'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <ScrollView style={gstyles.content}>
            <Image style={styles.userAvatar} source={{uri:this.state.userData.attributes.avatar_url}}/>

            <View style={styles.userTimeLine}>
              <Ionicons name={"md-person"} size={24} color="darkgray" style={{marginLeft:10,}}/>
              <Text style={{marginLeft:15, fontSize:20, fontFamily:'bold', color:'black'}}>{this.state.userData.attributes.username}</Text>
            </View>

            <View style={styles.userTimeLine}>
              <Ionicons name={"md-heart"} size={24} color="darkgray" style={{marginLeft:10,}}/>
              <Text style={{marginLeft:15, fontSize:16}}>{this.state.userData.attributes.mind}</Text>
            </View>

            <View style={styles.userTimeLine}>
              <Ionicons name={"md-albums"} size={24} color="darkgray" style={{marginLeft:10,}}/>
              <Text style={{marginLeft:15, fontSize:16}}>TA的相册</Text>
            </View>

            <View style={styles.userTimeLine}>
              <Ionicons name={"md-menu"} size={24} color="darkgray" style={{marginLeft:10,}}/>
              <Text style={{marginLeft:15, fontSize:16}}>详细资料</Text>
            </View>
            <Text style={styles.materialText}>年龄: {this.state.userData.attributes.age}</Text>
            <Text style={styles.materialText}>身高: {this.state.userData.attributes.height}</Text>
            <Text style={styles.materialText}>体重: {this.state.userData.attributes.weight}</Text>
            <Text style={styles.materialText}>地址: {this.state.userData.attributes.address}</Text>

            <TouchableOpacity onPress={this.onPressLook} style={[gstyles.button, {marginVertical:20}]}>
              <Text style={{color:'white'}}>VIP查看联系方式</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    )
  };

}

const styles = StyleSheet.create({
  userAvatar:{
    width:Dimensions.get('window').width,
    height:300,
  },

  userTimeLine:{
    flexDirection:'row',
    marginTop:15,
    alignItems:'center',
  },

  materialText:{
    marginLeft:48,
    marginTop:5,
    fontSize:16,
  },

});

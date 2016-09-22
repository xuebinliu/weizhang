/**
 * Created by free on 9/12/16.
 *
 * 修改头像
 */
import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Platform,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
    ImagePicker,
} from '../../header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

export default class ModifyHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: {}
    };
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRightButtonPress= ()=>{

    const {navigator} = this.props;
    navigator.push({
      component:ImagePicker,
    });

    // // upload
    // let avFile = new AV.File(response.fileName, {base64:response.data}, response.type);
    // avFile.save().then(function (obj) {
    //   console.log(obj);
    // }, function (error) {
    //   console.error(error);
    // });

  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改头像'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonIcon="ios-more"
              onRightButtonPress={this.onRightButtonPress}
          />

          <View style={[gstyles.content, ]}>

            <Image source={this.state.avatarSource}></Image>
          </View>


        </View>
    );
  }
}

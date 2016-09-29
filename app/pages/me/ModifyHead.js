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
    NativeModules,
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

let uri;

export default class ModifyHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: {}
    }
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRightButtonPress= ()=>{
    const {navigator} = this.props;
    navigator.push({
      component:ImagePicker,
      callback:this.onPickerImages
    });
  };

  onPickerImages= (image)=>{
    console.log("pickerImages", image);
    this.setState({
      avatarSource:image,
    });
  };

  renderAvatar= ()=>{
    // console.log("avatarSource", this.state.avatarSource);
    // if(this.state.avatarSource.uri) {
    //   return <Image source={{uri:this.state.avatarSource}}
    //                 style={{height: this.state.avatarSource.height, width: this.state.avatarSource.width}}/>;
    // } else {
    //   return <Image source={require('../../img/ic_setting_f.png')}/>;
    // }
  };

  render(){
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改头像'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'选择'}
              onRightButtonPress={this.onRightButtonPress}
          />

          <View style={[gstyles.content, ]}>

            {this.renderAvatar()}


          </View>


        </View>
    );
  }
}

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
} from '../../header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';
import ImagePicker from 'react-native-image-picker';

export default class ModifyHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: ''
    };
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRightButtonPress= ()=>{

    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });

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


        </View>
    );
  }
}
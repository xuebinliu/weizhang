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
      avatarSource: {}
    };
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRightButtonPress= ()=>{
    var options = {
      title: '选择头像',
      cancelButtonTitle:'取消',
      takePhotoButtonTitle:'拍照',
      chooseFromLibraryButtonTitle:'从相册选择',
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
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        // let source;
        // if (Platform.OS === 'ios') {
        //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // } else {
        //   source = {uri: response.uri, isStatic: true};
        // }

        this.setState({
          avatarSource: source
        });

        // upload
        // let avFile = new AV.File(response.fileName, {base64:response.data}, response.type);
        // avFile.save().then(function (obj) {
        //   console.log(obj);
        // }, function (error) {
        //   console.error(error);
        // });

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

          <View style={[gstyles.content, ]}>

            <Image source={this.state.avatarSource}></Image>
          </View>


        </View>
    );
  }
}

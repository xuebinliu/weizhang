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
    if(this.state.avatarSource.uri) {
      return <Image source={{uri:this.state.avatarSource.uri}}
                    style={{height: this.state.avatarSource.height, width: this.state.avatarSource.width}}/>;
    } else {
      return <Image source={require('../../img/ic_setting_f.png')}/>;
    }
  };

  // 提交头像
  commit= ()=> {
    console.log('uploadFile start');
    NativeModules.FileUpload.uploadFile(new String(this.state.avatarSource.uri), function (error, data) {
      console.log('uploadFile', error, data);
      toastShort('头像上传成功');
    })
  };

  render(){
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改头像'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'选择'}
              rightButtonTitleColor={'white'}
              onRightButtonPress={this.onRightButtonPress}
          />

          <View style={[gstyles.content, ]}>

            {this.renderAvatar()}

            <TouchableOpacity onPress={this.commit} style={[gstyles.button, {marginTop:30}]}>
              <Text style={{color:'white'}}>提交</Text>
            </TouchableOpacity>

          </View>


        </View>
    );
  }
}

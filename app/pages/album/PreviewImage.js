/**
 * Created by free on 12/19/16.
 *
 * 浏览大图
 */

import React from 'react';
import{
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  naviGoBack,
} from '../../header';

export default class PreviewImage extends React.Component {

  constructor(props){
    super(props);

    const {route} = this.props;
    this.state = {
      url:route.url,
    };

    console.log('PreviewImage constructor url', this.state.url);
  }

  onBackHandle=()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onDeleteImage=()=> {
    const that = this;
    Alert.alert(
        '提示',
        '确定要删除这张照片吗?',
        [
          {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: '确定',
           onPress: () => {
             const {route} = that.props;
             route.deletePictureCallback(that.state.url);
             that.onBackHandle();
           }
          },
        ]
    );
  };

  render(){
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'预览'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle='删除'
              onRightButtonPress={this.onDeleteImage}
              rightButtonTitleColor={'white'}
          />

          <View style={gstyles.content}>
            <Image
                   source={{uri:this.state.url}}
                   style={{
                     width:Dimensions.get('window').width,
                     height:Dimensions.get('window').height,
                   }}/>
          </View>

        </View>
    );
  }
}

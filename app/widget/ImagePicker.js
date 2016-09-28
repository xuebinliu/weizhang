/**
 * Created by free on 9/22/16.
 */
import React from 'react';
import {
    ActivityIndicator,
    Text,
    StyleSheet,
    View,
    Image,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
} from '../header';

import * as Const from '../const';
import CameraRollPicker from 'react-native-camera-roll-picker';

export default class ImagePicker extends React.Component{

  constructor(props) {
    super(props);

    console.log('ImagePicker constructor');

    this.state = {
      num: 0,
      selected: [],
    };
  }

  onBackHandle= ()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onRightButtonPress= ()=>{

  };

  getSelectedImages(images, current){
    var num = images.length;
    this.setState({
      num: num,
      selected: images,
    });

    const {route} = this.props;
    route.callback(current);
  };

  render(){
    return(
        <View style={gstyles.container}>
          <NavigationBar
              title={'选择图片'}
              leftButtonIcon={Const.IC_NAV_BACK}
              onLeftButtonPress={this.onBackHandle}
              rightButtonIcon={Const.IC_NAV_CHECK}
              onRightButtonPress={this.onRightButtonPress}
          />

          <View style={[gstyles.content, ]}>
            <CameraRollPicker
                initialListSize={1}
                pageSize={3}
                removeClippedSubviews={true}
                selected={this.state.selected}
                callback={this.getSelectedImages.bind(this)}/>
          </View>


        </View>
    );
  }
}



/**
 * Created by free on 9/22/16.
 */
import React from 'react';
import {
    ActivityIndicator,
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

let currentImage;

export default class ImagePicker extends React.Component{

  constructor(props) {
    super(props);

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
    this.onBackHandle();

    const {route} = this.props;
    route.callback(currentImage);
  };

  getSelectedImages(images, current){
    var num = images.length;
    this.setState({
      num: num,
      selected: images,
    });

    currentImage = current;
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


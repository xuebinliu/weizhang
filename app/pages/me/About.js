/**
 * Created by free on 2/5/17.
 */

import React from 'react';
import{
  View,
  TextInput,
} from 'react-native';

import {
  gstyles,
  DeviceStorage,
  NavigationBar,
  naviGoBack,
  toastShort,
} from '../../header';

export default class About extends React.Component {

  onBackHandle= ()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'关于'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>

          </View>
        </View>
    );
  }
}
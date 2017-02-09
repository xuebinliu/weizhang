/**
 * Created by free on 09/02/2017.
 *
 * 粉丝列表
 */

import React from 'react';
import{
  View,
} from 'react-native';

import {
  gstyles,
  NavigationBar,
  naviGoBack,
} from '../../header';

import AV from 'leancloud-storage';

export default class Follows extends React.Component {

  onBackHandle= ()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={this.props.route.title}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>
          </View>
        </View>
    );
  }
}
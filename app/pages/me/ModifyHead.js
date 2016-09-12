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
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
} from '../../header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AV from 'leancloud-storage';

export default class ModifyHead extends React.Component {
  constructor(props) {
    super(props);
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改头像'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>
          </View>
        </View>
    );
  }
}
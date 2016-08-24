/**
 * Created by free on 8/24/16.
 *
 * 位置信息, 选择用户当前的城市
 */

import React from 'react';
import {
  View,
  Text,
  ListView,
} from 'react-native';

import NavigationBar from '../widget/TabNavigator';
import {naviGoBack} from '../utils/common';

import LoadingView from '../widget/LoadingView';

import gstyles from '../gstyles';

export default class Location extends React.Component {

  constructor(props){
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  render(){
    return(
        <View style={gstyles.container}>

          <NavigationBar
              title={'城市'}
              leftButtonIcon="ios-arrow-round-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>

          </View>

          <LoadingView/>

        </View>
    );
  }

}
/**
 * Created by free on 8/31/16.
 *
 * 发布单子页面
 *
 */

import React from 'react';
import {
    View,
    InteractionManager,
} from 'react-native';

import {naviGoBack} from '../utils/common';

import gstyles from '../gstyles';
import NavigationBar from '../widget/TabNavigator';


export default class Publish extends React.Component{
  constructor(props) {
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onClickPublish = this.onClickPublish.bind(this);
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onClickPublish(){

  }

  render(){
    return(
        <View style={gstyles.container}>

          <NavigationBar
              title={'发单'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              onRightButtonPress={this.onClickPublish}
              rightButtonIcon={'md-checkmark'}
          />

          <View style={gstyles.content}>

          </View>

        </View>
    );
  }
}
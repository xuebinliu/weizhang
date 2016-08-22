/**
 * Created by free on 8/16/16.
 *
 * 首页
 */

import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import gstyles from '../gstyles';
import NavigationBar from '../widget/TabNavigator';

import {getCurrentCity} from '../utils/common';


export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onForwardHandle = this.onForwardHandle.bind(this);

    this.state = {
      city:''
    };
  }

  onBackHandle() {

  };

  onForwardHandle() {

  };

  componentDidMount() {
    getCurrentCity((city)=>{
      if(city !== 'error') {
        this.setState({
          city:city
        });
      }
    });
  }

  render() {
    return (
        <View style={gstyles.container}>

          <NavigationBar
              title={'Test1'}
              leftButtonTitle={this.state.city}
              leftButtonTitleColor={'#fff'}
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'forward'}
              rightButtonTitleColor={'#fff'}
              onRightButtonPress={this.onForwardHandle}
          />
        </View>
    );
  }
}

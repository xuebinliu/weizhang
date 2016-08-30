/**
 * Created by free on 8/16/16.
 *
 * 闪屏
 */


import React from 'react';
import {
    Dimensions,
    Image,
    InteractionManager,
    View,
} from 'react-native';

import Main from './MainContainer';

var {height, width} = Dimensions.get('window');

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigator} = this.props;
    this.timer = setTimeout(() => {
      InteractionManager.runAfterInteractions(() => {
        navigator.resetTo({
          component: Main,
          name: 'Main'
        });
      });
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
        <View style={{flex:1}}>
          <Image
              style={{flex:1,width:width,height:height}}
              source={require('../img/ic_welcome.jpg')}
          />
        </View>
    );
  }
}
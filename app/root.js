/**
 * Created by free on 8/16/16.
 */


import React from 'react';
import {
    StyleSheet,
    Navigator,
    BackAndroid,
    View,
    StatusBar,
    Platform,
} from 'react-native';

import {NaviGoBack} from './utils/common';
import Splash from './pages/Splash';


export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)

var _navigator;
export default class Root extends React.Component {

  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);

    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    return NaviGoBack(_navigator);
  }

  renderScene(route, navigator) {
    let Component = route.component;
    _navigator = navigator;
    return (
        <Component navigator={navigator} route={route} />
    );
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
        <View style={{flex: 1}}>

          <Navigator
              ref='navigator'
              style={styles.navigator}
              configureScene={this.configureScene}
              renderScene={this.renderScene}
              initialRoute={{
                component: Splash,
                name: 'Splash'
              }}
          />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});
/**
 * Created by free on 8/16/16.
 */

import React from 'react';
import {
    Navigator,
    BackAndroid,
    View,
} from 'react-native';

import {naviGoBack} from './utils/common';
import Splash from './pages/Splash';

let _navigator;

export default class Root extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.goBack);
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
  }

  goBack() {
    return naviGoBack(_navigator);
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
              style={{flex:1}}
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
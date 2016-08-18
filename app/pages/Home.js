/**
 * Created by free on 8/16/16.
 *
 * 首页
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {NAV_HEIGHT} from '../const';
import NavigationBar from '../widget/TabNavigator';

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onForwardHandle = this.onForwardHandle.bind(this);
  }

  onBackHandle() {

  };

  onForwardHandle() {

  };

  render() {
    return (
        <View style={styles.container}>

          <NavigationBar
              title={'Test1'}
              height={NAV_HEIGHT}
              titleColor={'#fff'}
              backgroundColor={'#149be0'}
              leftButtonTitle={'back'}
              leftButtonTitleColor={'#fff'}
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'forward'}
              rightButtonTitleColor={'#fff'}
              onRightButtonPress={this.onForwardHandle}
          />

          <Text style={styles.welcome}>
            Home
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
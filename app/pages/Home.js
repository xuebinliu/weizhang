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
              title={'this is a test'}
              height={44}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
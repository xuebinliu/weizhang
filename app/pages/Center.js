/**
 * Created by free on 8/16/16.
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Center extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Center
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

});
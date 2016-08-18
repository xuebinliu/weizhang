/**
 * Created by free on 8/16/16.
 *
 * 养车资讯页面
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';


import {NAV_HEIGHT} from '../const';
import NavigationBar from '../widget/TabNavigator';

export default class News extends React.Component {
  render() {

    return (
        <View style={styles.container}>
          <NavigationBar
              title={'Test2'}
              height={NAV_HEIGHT}
              titleColor={'#fff'}
              backgroundColor={'#149be0'}
          />

          <Text style={{marginTop:NAV_HEIGHT}}>
            Keep
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
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


import gstyles from '../gstyles';
import NavigationBar from '../widget/TabNavigator';

export default class News extends React.Component {
  render() {

    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'Test2'}
          />

        </View>
    );
  }
}
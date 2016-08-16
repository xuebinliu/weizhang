/**
 * Created by free on 8/16/16.
 *
 * 主框架界面
 *
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './Home';
import Center from './Center';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab:'home'
    };
  }

  render() {
    return (
        <TabNavigator>

          <TabNavigator.Item
              title="主页"
              selected={this.state.selectedTab === 'home'}
              selectedTitleStyle={styles.selectedTextStyle}
              titleStyle={styles.textStyle}
              renderIcon={() => <Icon
                  name="ios-paper"
                  size={30}
                  color="#6B8E23"
              />}
              renderSelectedIcon={() => <Icon
                  name="ios-paper"
                  size={30}
                  color="#6B8E23"
              />}
              onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home {...this.props}/>
          </TabNavigator.Item>

          <TabNavigator.Item
              title="我的"
              selected={this.state.selectedTab === 'center'}
              selectedTitleStyle={styles.selectedTextStyle}
              titleStyle={styles.textStyle}
              renderIcon={() => <Icon
                  name="ios-paper"
                  size={30}
                  color="#6B8E23"
              />}
              renderSelectedIcon={() => <Icon
                  name="ios-paper"
                  size={30}
                  color="#6B8E23"
              />}
              onPress={() => this.setState({ selectedTab: 'center' })}>
            <Center {...this.props}/>
          </TabNavigator.Item>

        </TabNavigator>
    );
  }
}
const styles=StyleSheet.create({
  iconStyle:{
    width:26,
    height:26,
  },
  textStyle:{
    color:'#999',
  },
  selectedTextStyle:{
    color:'black',
  }
});

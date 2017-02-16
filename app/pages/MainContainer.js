/**
 * Created by free on 8/16/16.
 *
 * 主框架界面
 *
 */
import React from 'react';

import TabNavigator from 'react-native-tab-navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Hall from './hall/Hall';
import Message from './msg/Message';
import Center from './Center';
import BaseTest from '../base/BaseTest';

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
            title="同城"
            selected={this.state.selectedTab === 'home'}
            titleStyle={{color:'gray'}}
            selectedTitleStyle={{color:'green'}}
            renderIcon={() => <Ionicons name="ios-home-outline" size={28} color="gray"/>}
            renderSelectedIcon={() => <Ionicons name="ios-home" size={28} color="green"/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
          <Hall {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
            title="私信"
            selected={this.state.selectedTab === 'news'}
            titleStyle={{color:'gray'}}
            selectedTitleStyle={{color:'green'}}
            renderIcon={() => <Ionicons name="ios-aperture-outline" size={28} color="gray"/>}
            renderSelectedIcon={() => <Ionicons name="ios-aperture" size={28} color="green"/>}
            onPress={() => this.setState({ selectedTab: 'news' })}>
          <Message {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
            title="我的"
            selected={this.state.selectedTab === 'center'}
            titleStyle={{color:'gray'}}
            selectedTitleStyle={{color:'green'}}
            renderIcon={() => <Ionicons name="ios-person-outline" size={28} color="gray"/>}
            renderSelectedIcon={() => <Ionicons name="ios-person" size={28} color="green"/>}
            onPress={() => this.setState({ selectedTab: 'center' })}>
          <Center {...this.props}/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

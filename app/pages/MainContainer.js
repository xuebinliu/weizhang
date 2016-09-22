/**
 * Created by free on 8/16/16.
 *
 * 主框架界面
 *
 */
import React from 'react';

import TabNavigator from 'react-native-tab-navigator';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Hall';
import News from './News';
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
            title="Test"
            selected={this.state.selectedTab === 'home'}
            titleStyle={{color:'gray'}}
            selectedTitleStyle={{color:'green'}}
            renderIcon={() => <Ionicons name="ios-home-outline" size={28} color="gray"/>}
            renderSelectedIcon={() => <Ionicons name="ios-home" size={28} color="green"/>}
            onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
            title="Test"
            selected={this.state.selectedTab === 'news'}
            titleStyle={{color:'gray'}}
            selectedTitleStyle={{color:'green'}}
            renderIcon={() => <Ionicons name="ios-aperture-outline" size={28} color="gray"/>}
            renderSelectedIcon={() => <Ionicons name="ios-aperture" size={28} color="green"/>}
            onPress={() => this.setState({ selectedTab: 'news' })}>
          <News {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
            title="Test"
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

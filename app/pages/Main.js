/**
 * Created by free on 8/16/16.
 *
 * 主框架界面
 *
 */

import React from 'react';
import {
    StyleSheet,
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';


import Home from './Home';
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
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image
                source={require('../img/ic_discovery.png')}
                style={styles.iconStyle}/>
            }
            renderSelectedIcon={() => <Image
                source={require('../img/ic_discovery_f.png')}
                style={styles.iconStyle}/>
            }
            onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
            title="Test"
            selected={this.state.selectedTab === 'news'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image
                source={require('../img/ic_setting.png')}
                style={styles.iconStyle}/>
            }
            renderSelectedIcon={() => <Image
                source={require('../img/ic_setting_f.png')}
                style={styles.iconStyle}/>
            }
            onPress={() => this.setState({ selectedTab: 'news' })}>
          <News {...this.props}/>
        </TabNavigator.Item>

        <TabNavigator.Item
            title="Test"
            selected={this.state.selectedTab === 'center'}
            selectedTitleStyle={styles.selectedTextStyle}
            titleStyle={styles.textStyle}
            renderIcon={() => <Image
                source={require('../img/ic_setting.png')}
                style={styles.iconStyle}/>
            }
            renderSelectedIcon={() => <Image
                source={require('../img/ic_setting_f.png')}
                style={styles.iconStyle}/>
            }
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
    color:'#ADADAD',
  },
  selectedTextStyle:{
    color:'#6B8E23',
  }
});

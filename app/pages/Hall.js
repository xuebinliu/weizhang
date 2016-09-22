/**
 * Created by free on 8/16/16.
 *
 * 大厅页面
 */
import React from 'react';
import {
    View,
    InteractionManager,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    getCurrentCity,
    Location,
    Publish,
} from '../header';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.onClickCity = this.onClickCity.bind(this);
    this.onClickPublish = this.onClickPublish.bind(this);

    this.state = {
      city:'未知'
    };
  }

  onClickCity(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Location,
      });
    });
  };

  onClickPublish(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Publish,
      });
    });
  }

  componentDidMount(){
    getCurrentCity().then((city)=>{
      if(city !== 'error') {
        this.setState({
          city:city
        });
      }
    });
  }

  render(){
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'Test1'}
              leftButtonTitle={this.state.city}
              leftButtonTitleColor={'#fff'}
              onLeftButtonPress={this.onClickCity}
              onRightButtonPress={this.onClickPublish}
              rightButtonIcon={'md-add'}
          />

          <View style={[gstyles.content]}>
          </View>
        </View>
    );
  }
}

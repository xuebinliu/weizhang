/**
 * Created by free on 9/9/16.
 */
import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
    Register,
} from '../../header';

import AV from 'leancloud-storage';

export default class Profile extends React.Component {

  constructor(props){
    super(props);

    this.onBackHandle = this.onBackHandle.bind(this);

  }

  onBackHandle(){
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  render(){
    return(
      <View style={gstyles.container}>
        <NavigationBar
            title={'个人信息'}
            leftButtonIcon="md-arrow-back"
            onLeftButtonPress={this.onBackHandle}
        />

        <View style={gstyles.content}>

        </View>

      </View>
    );
  }
}
/**
 * Created by free on 9/12/16.
 * 修改个人简介
 */
import React from 'react';
import{
    View,
    TextInput,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
} from '../../header';

import AV from 'leancloud-storage';

var yourMind;

export default class ModifySex extends React.Component {
  constructor(props){
    super(props);

    yourMind = AV.User.current().get('mind');
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onSubmit= ()=>{
    AV.User.current().set('mind', yourMind);
    AV.User.current().save();

    const {route} = this.props;
    route.callback();

    this.onBackHandle();
    toastShort('提交成功');
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改心情'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'提交'}
              onRightButtonPress={this.onSubmit}
              rightButtonTitleColor={'white'}
          />

          <View style={gstyles.content}>
            <TextInput
                style={{flex:1, fontSize: 18, padding: 15, textAlignVertical: 'top' }}
                placeholder={typeof yourMind == 'undefined' ? '亲，请写下您的心情~' : yourMind}
                placeholderTextColor="#aaaaaa"
                underlineColorAndroid="transparent"
                numberOfLines={20}
                multiline={true}
                autoFocus={true}
                onChangeText={(text) => yourMind=text}
            />

          </View>
        </View>
    );
  }
}
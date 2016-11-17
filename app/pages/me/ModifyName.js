/**
 * Created by free on 9/12/16.
 * 修改昵称
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

var yourNickName;

export default class ModifyName extends React.Component {
  constructor(props){
    super(props);

    yourNickName = AV.User.current().get('nickname');
  }

  onBackHandle= ()=>{
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  onSubmit= ()=>{
    AV.User.current().set('nickname', yourNickName);
    AV.User.current().save();

    const {route} = this.props;
    route.callback();

    this.onBackHandle();
    toastShort('修改成功');
  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'修改昵称'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'确定'}
              onRightButtonPress={this.onSubmit}
              rightButtonTitleColor={'white'}
          />

          <View style={gstyles.content}>
            <TextInput
                style={{flex:1, fontSize: 18, padding: 15, textAlignVertical: 'top' }}
                placeholder={typeof yourNickName == 'undefined' ? '亲，请输入昵称' : yourNickName}
                placeholderTextColor="#aaaaaa"
                underlineColorAndroid="transparent"
                numberOfLines={1}
                multiline={true}
                autoFocus={true}
                onChangeText={(text) => yourNickName=text}
            />

          </View>
        </View>
    );
  }
}
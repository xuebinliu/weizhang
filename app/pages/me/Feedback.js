/**
 * Created by free on 8/30/16.
 */

import React from 'react';
import{
    View,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    TextInput,
} from 'react-native';

import AV from 'leancloud-storage';

import DeviceStorage from '../../utils/Storage';
import {SK_ACCOUNT_INFO} from '../../const/StorageKey';

import NavigationBar from '../../widget/TabNavigator';
import {naviGoBack} from '../../utils/common';

import gstyles from '../../gstyles';

import {toastShort} from '../../utils/ToastUtil';

let feedbackContent;
let contact;

export default class Feedback extends React.Component {
  constructor(props){
    super(props);

    console.log('Feedback constructor');

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onFeedback = this.onFeedback.bind(this);
  }

  onBackHandle() {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };

  // 反馈
  onFeedback() {
    let FeedbackObj = AV.Object.extend('FeedbackObj');
    let feedbackObj = new FeedbackObj();

    feedbackObj.set('account', DeviceStorage.get(SK_ACCOUNT_INFO));
    feedbackObj.set('content', feedbackContent);
    feedbackObj.set('contact', contact);

    console.log('onFeedback feedbackContent=' + feedbackContent + ', contact=' + contact);

    const that = this;
    feedbackObj.save().then(function (success) {
      console.log(success);

      toastShort('提交成功');

      that.onBackHandle();

    }, function (error) {
      console.log(error);

      toastShort('提交失败');
    });
  }

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'用户反馈'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
          />

          <View style={gstyles.content}>


            <TextInput
                onChangeText={(text)=> feedbackContent=text}
                multiline={true}
                style={[gstyles.input, {height:150}]}
                placeholder={"请输入反馈内容"}/>

            <TextInput
                onChangeText={(text)=> contact=text}
                multiline={false}
                style={[gstyles.input, {marginTop: 20}]}
                placeholder={"联系方式"}/>

            <TouchableOpacity onPress={this.onFeedback} style={[gstyles.button, {marginTop:30}]}>
              <Text style={{color:'white'}} >提交</Text>
            </TouchableOpacity>

          </View>
        </View>
    );
  }
}
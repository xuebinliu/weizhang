/**
 * Created by free on 11/8/16.
 *
 * 相册容器
 */

import React from 'react';
import{
    View,
    ListView,
    Text,
    TouchableOpacity,
    Image,
    InteractionManager,
    TextInput,
    Alert,
} from 'react-native';

import {
    gstyles,
    NavigationBar,
    naviGoBack,
    toastShort,
} from '../../header';


export default class AlbumContainer extends React.Component {
  constructor(props){
    super(props);

  }

  onBackHandle=()=> {
    const {navigator} = this.props;
    return naviGoBack(navigator);
  };
  
  onEditAlbum= ()=>{

  };

  render() {
    return (
        <View style={gstyles.container}>
          <NavigationBar
              title={'相册'}
              leftButtonIcon="md-arrow-back"
              onLeftButtonPress={this.onBackHandle}
              rightButtonTitle={'编辑'}
              onRightButtonPress={this.onEditAlbum}
              rightButtonTitleColor={'white'}
          />

          <View style={gstyles.content}>

          </View>
        </View>
    );
  }

}
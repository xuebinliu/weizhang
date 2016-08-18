/**
 * Created by free on 8/16/16.
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    InteractionManager,
    TouchableOpacity,
    Image,
    Dimensions,

} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {NAV_HEIGHT} from '../const';
import NavigationBar from '../widget/TabNavigator';

import Login from './me/Login';



const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Center extends React.Component {

  constructor(props) {
    super(props);

    this.loginButtonAction=this.loginButtonAction.bind(this);

    this.onBackHandle = this.onBackHandle.bind(this);
    this.onForwardHandle = this.onForwardHandle.bind(this);

  }


  onBackHandle() {

  };

  onForwardHandle() {

  };

  //登录
  loginButtonAction(){
    const {navigator} = this.props;
    InteractionManager.runAfterInteractions(() => {
      navigator.push({
        component: Login,
        name: 'Login'
      });
    });
  }

  render() {
    return (
        <View style={styles.container}>

          <NavigationBar
              title={'Test3'}
              height={NAV_HEIGHT}
              titleColor={'#fff'}
              backgroundColor={'#149be0'}
          />

          <View style={{flexDirection:'row', backgroundColor:'white', height:80, marginTop:NAV_HEIGHT}}>
            <TouchableOpacity onPress={() => {this.loginButtonAction()}} >
              <Image  style={{width:60,height:60,marginLeft:10,marginTop:10, alignSelf:'center'}} source={require('../img/ic_discovery.png')}/>
            </TouchableOpacity>

            <View style={{flexDirection:'column', justifyContent:'center', marginLeft:10}}>
              <Text> 用户名 </Text>
              <Text> 简介 </Text>
            </View>

            <View style={{flexDirection:'row', flex:1, justifyContent:'flex-end'}}>
              <Ionicons name="ios-arrow-forward" size={30} color="#4F8EF7" style={{alignSelf:'center', marginRight:10}}
                        onPress={() => {this.loginButtonAction()}}/>
            </View>
          </View>



        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  line:{
    height:1,
    backgroundColor:'#ccc',
    marginLeft:8,
    marginRight:8,
  },

});
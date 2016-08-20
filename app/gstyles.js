/**
 * Created by free on 8/20/16.
 *
 * 全局样式定义
 */

import {StyleSheet} from 'react-native';

export default gstyles = StyleSheet.create({

  // 所有页面容器
  container:{
    flex:1,
    backgroundColor:'#f6f6f6',
  },

  // 导航栏
  nav_bar:{

  },

  // 页面
  content:{
    flex:1,
    marginTop:44,
  },

  // 分割线
  line:{
    height:1,
    backgroundColor:'#dddddd',
    marginLeft:8,
    marginRight:8,
  },

  // 长按钮
  button:{
    marginHorizontal:30,
    height:40,
    borderRadius:3,
    backgroundColor:'forestgreen',
    justifyContent:'center',
    alignItems:'center',

  },

});

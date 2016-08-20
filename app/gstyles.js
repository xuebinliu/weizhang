/**
 * Created by free on 8/20/16.
 *
 * 全局样式定义
 */

import {StyleSheet} from 'react-native';

export default gstyles = StyleSheet.create({

  // all page container
  container:{
    flex:1,
    backgroundColor:'white',
  },

  // page content
  content:{
    flex:1,
    marginTop:44,
  },

  // list item
  listItem:{
    backgroundColor:'whitesmoke',
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

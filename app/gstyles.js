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
    backgroundColor:'whitesmoke',
  },

  // list item
  listItem:{
    backgroundColor:'white',
  },

  input: {
    height: 60,
    marginHorizontal:15,
    color:'#777',
  },

  // 分割线
  line:{
    height:1,
    backgroundColor:'#dddddd',
    marginLeft:8,
    marginRight:8,
  },

  // 分割线
  noMarginline:{
    height:1,
    backgroundColor:'#dddddd',
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

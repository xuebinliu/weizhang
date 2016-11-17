/**
 * Created by free on 11/8/16.
 *
 * 相册容器中的一个item
 */
import React from 'react';
import{
    View,
    ListView,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    InteractionManager,
    Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

// 每行显示相册个数
const ALBUM_LINE_COUNT = 2;

export default class Album extends React.Component {
  constructor(props){
    super(props);

    console.log('Album props', props);
  }

  static defaultProps = {
    isAddBtn:false,     // 是否是加号按钮
    isDel:false,        // 是否显示删除按钮
    navigator: null,    // 导航器
    rowData: null,      // 行数据，数组形式
  };

  renderItem0= ()=>{
    if(this.props.isAddBtn){
      // 渲染加号按钮
      return (
        <TouchableOpacity style={[styles.itemView, {borderWidth:1, borderColor:'#dddddd'}]}>
          <Ionicons name={"ios-add-outline"} size={60} color="blue" />
          <Text style={{color:'blue'}}>添加相册</Text>
        </TouchableOpacity>
      );
    } else {

    }
  };

  renderItem1= ()=>{
    return(<View style={styles.itemView}/>);
  };

  render(){
    return (
        <View style={styles.container}>
          {this.renderItem0()}
          {this.renderItem1()}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    height:200,
    justifyContent:'center',
  },

  itemView:{
    flex:1,
    margin:20,
    backgroundColor:"#ffffff",
    alignItems:'center',
    justifyContent:'center',
  }
});

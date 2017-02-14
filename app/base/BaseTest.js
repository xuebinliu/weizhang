/**
 * Created by free on 14/02/2017.
 */

import BaseListViewComponent from './BaseListViewComponent';

export default class BaseTest extends BaseListViewComponent {
  constructor(props){
    super(props);

    console.log('BaseTest constructor');
  }

  componentDidMount(){
    console.log('BaseTest componentDidMount');

    this.loadData();
  }
}
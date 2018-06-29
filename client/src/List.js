import React, {Component} from 'react';
import ListItem from './ListItem';

var colors = ["event purple", "event blue", "event green", "event pink"];

class List extends Component {
  render() {
    var listElements = [];
    for (var i = 0; i < this.props.items.length; i++) {
      var item = this.props.items[i];
      var className = this.props.className;
      if (className == "colorful") {
        className = colors[i % colors.length];
      }
      listElements.push(<ListItem className={className} item={item} onClickFunc={this.props.onClickFunc}/>);
    }
    return (
      <ul style={{margin: "0"}}>{listElements}</ul>
    );
  }
}



export default List;

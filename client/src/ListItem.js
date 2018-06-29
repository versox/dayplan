import React, { Component } from 'react';

class ListItem extends Component {
  
  onDrag = function() {
    console.log("DRAGGING");
    var newState = {
      style: {
        cursor: "move",
        display: "none"
      }
    }
    this.setState(newState);
  }.bind(this);
  
  onDragStart = function(event) {
    console.log(event);
    event.dataTransfer.setData("text/html", null);
    this.props.onClickFunc(this.props.item.id);
  }.bind(this);
  
  onDragEnd = function() {
    var newState = {
      style: {
        cursor: "move",
        display: "list-item"
      }
    }
    this.setState(newState);
  }.bind(this);
  
  onDragOver = function() {
    var newState = {
      style: {
        opacity: 0.4
      }
    }
    this.setState(newState);
  }.bind(this);
  
  onDragLeave = function() {
    console.log("LEAVES");
    var newState = {
      style: {
       
      }
    }
    this.setState(newState);
  }.bind(this);
  
  state = {
    style : {
      cursor: "move",
      position: "relative",
      margin: 0
    }
  }
  
  render() {
    return (
      <div>
        <li style={this.state.style} draggable="true" onDrag={this.onDrag} onDragStart={this.onDragStart} onDragEnd={this.onDragEnd} onDragEnter={this.onDragOver} onDragLeave={this.onDragLeave} className={this.props.className}>{this.props.item.name}</li>
        <li style={{marginBottom: 0, marginTop: 20}} className={this.props.className}> hi </li>
        <li style={{marginBottom: 0, marginTop: 0, padding: 10}}></li>
      </div>
    )
  }
}

export default ListItem;

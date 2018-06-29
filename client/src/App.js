import React, { Component } from 'react';
import './App.css';
import List from './List';
class App extends Component {
  
  state = {
    array: []
  };
  
  componentDidMount() {
    var req = new XMLHttpRequest();
    req.open("GET", "/hi", false);
    req.send();
    const newState = Object.assign({}, this.state, {
          array: JSON.parse(req.response)
        });
    this.setState(newState);
    
    console.log("OUTSIDE: " + this);
    var wait = function wait() {
      console.log("WAIT: " + this);
      var waitForChange = new XMLHttpRequest();
      var change = function() {
        console.log("CHANGE: " + this);
        if(waitForChange.readyState == 4 && waitForChange.status == 200){
          var newState = Object.assign({}, this.state, {
            array: this.state.array.concat(waitForChange.response)
          });
          this.setState(newState);
          wait.call(this);
        }
      }
      change = change.bind(this);
      waitForChange.onreadystatechange = change;
      waitForChange.open("GET", "/add", true);
      waitForChange.send(null);
    }
    wait = wait.bind(this);
    wait();
  }
  
  render() {
    return (
      <div id='main'>
        <div id='eventsContainer' class='gridItem'>
          <List id = 'urgent' items = {this.state.array}/>
        </div>
        <div id='activitiesContainer' class='gridItem'>
          
        </div>
      </div>
    );
  }
}

export default App;

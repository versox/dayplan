import React, {Component} from 'react';
import List from './List';

class Manager extends Component {
    state = {
      eventsList : [],
      redActivitiesList : [],
      yellowActivitiesList : [],
      blueActivitiesList : []
    };
    
    onClick = function(id) {
      var newState = {
        eventsList : [],
        redActivitiesList : [],
        yellowActivitiesList : [],
        blueActivitiesList : []
      };
      for(var i = 0; i < this.state.eventsList.length; i++) {
          var event = this.state.eventsList[i];
          console.log(event.id + "    " + id);
          if(event.id !== id) {
              newState.eventsList.push(event);
          }
      }
      console.log(this.state);
      console.log(newState);
      //this.setState(newState);
    }.bind(this);
    
    componentDidMount()
    {
        var initialDataRequest = new XMLHttpRequest();
        initialDataRequest.open("GET", "/getData", false);
        initialDataRequest.send();
        this.setState(JSON.parse(initialDataRequest.response));
        
        var dataUpdater = Object.create(this);
        dataUpdater.updateData = function() {
            this.updateDataRequest = new XMLHttpRequest();
            this.updateDataRequest.onreadystatechange = this.onReady;
            this.updateDataRequest.open("GET", "/getUpdate", true);
            this.updateDataRequest.send();
        }
        dataUpdater.onReady = function() {
            if(this.updateDataRequest.readyState == 4 && this.updateDataRequest.status == 200) {
                this.setState(JSON.parse(this.updateDataRequest.response));
                this.updateData();
            }
        }.bind(dataUpdater);
        dataUpdater.updateData();
    }
    
    render()
    {
        return (
            <div id="main">
                <div className="gridItem">
                    <List className="colorful" items={this.state.eventsList} onClickFunc={this.onClick}/>
                </div>
                <div className="gridItem">
                    <List className="red" items={this.state.redActivitiesList} onClickFunc={this.onClick}/>
                    <List className="yellow" items={this.state.yellowActivitiesList} onClickFunc={this.onClick}/>
                    <List className="blue" items={this.state.blueActivitiesList} onClickFunc={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default Manager;
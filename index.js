var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var data = {
    eventsList : [{id: 0, name: "Tea"}, {id: 1, name: "Work"}],
    redActivitiesList : [{id: 2, name: "Party"}],
    yellowActivitiesList : [{id: 3, name: "Work on app"}],
    blueActivitiesList : [{id: 4, name: "Bike"}, {id: 5, name: "Guitar"}]
}

app.get("/getData", function(req, res) {
    res.send(JSON.stringify(data));
});

var waitingForUpdates = [];

app.get("/getUpdate", function(req, res) {
     var update = function(data) {
        res.send(data);
    }
     waitingForUpdates.push(update);
});

function sendUpdate() {
    for(var i = 0; i < waitingForUpdates.length; i++) {
        waitingForUpdates[i](data);
    }
    waitingForUpdates = [];
}

app.post("/addEvent", function(req, res) {
    console.log(req.body);
    data.eventsList.push(req.body);
    sendUpdate();
    res.send();
});

app.listen(3000, process.env.IP, null, function() {console.log("Server started")});
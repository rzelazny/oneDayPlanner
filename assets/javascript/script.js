//array to store and retrieve saved events to local storage
var events = [];

//Find the timeblock elements for altering background color/displaying stored events
timeBlocks = $(".description");

//current hour in 24 hour time, our timeblock array starts at 9am, so subtract 9 to sync with the timeBlocks array
var curTimeBlock = (moment().format('H')) - 9;

//load saved events from local storage if there are any
function init() {
    // Parsing the JSON string to an object
    var storedEvents = JSON.parse(localStorage.getItem("events"));

    // If events were retrieved from localStorage, update the event array to it
    if (storedEvents !== null) {
        events = storedEvents;

        //display the stored events
        for (i=0; i < events.length; i++){
            timeBlocks[storedEvents[i].timeblock].innerHTML = storedEvents[i].event;
        }
    }
}
// set current day on jumbotron
$("#currentDay").text(moment().format('ll'));

//color time blocks
for (var i = 0;  i < timeBlocks.length; i++){
    if(i === curTimeBlock){
        //current time block is red
        $(timeBlocks[i]).attr("class", "form-control description present");
    }
    else if(i < curTimeBlock){
        //past time blocks are grey
        $(timeBlocks[i]).attr("class", "form-control description past");
    }
    else{
        //future time blocks are green
        $(timeBlocks[i]).attr("class", "form-control description future");
    }
}

//When a use clicks a save button store the event in the timeblock to local storage
$(".saveBtn").on("click", function(){
    var newEvent = {
        timeblock: this.attributes.timeindex.value,
        event: timeBlocks[this.attributes.timeindex.value].value
    }

    //see if timeblock already has an event saved
    var eventExists = findAttribute(events, "timeblock", newEvent.timeblock)

    //if there is a stored event and the new event is blank, remove the existing event from storage
    if(eventExists !== -1 && newEvent.event === ""){
        events.splice(eventExists, 1);
        localStorage.setItem("events", JSON.stringify(events));
    }
    
    //no need to store blank events unless they're deleting one that already exists
    if(newEvent.event !== ""){
        
        if (eventExists === -1){
            //if there isn't an event for the current timeblock, add it to the end
            events.push(newEvent);
        }
        else{
            //if there is already an event, overwrite the existing event
            events.splice(eventExists, 1, newEvent);
        }

        //store the updated event array
        localStorage.setItem("events", JSON.stringify(events));
    }
})

//function loops through an object array and returns the index of a given attribute
function findAttribute(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//always run initialization code
init();
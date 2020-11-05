// set current day on jumbotron
$("#currentDay").text(moment().format('ll'));

//get timeblock elements to set their background color
timeBlocks = $(".description");

//current time block in 24 hour time
var curTimeBlock = (moment().format('H'));

//our timeblock array starts at 9am, subtract 9 to sync with the array
curTimeBlock = curTimeBlock - 9;

//color time blocks
for (var i = 0;  i< timeBlocks.length; i++){

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

//store and retrieve saved events to local storage
var events = [];

function init() {
    // Parsing the JSON string to an object
    var storedEvents = JSON.parse(localStorage.getItem("events"));

    // If events were retrieved from localStorage, update the event array to it
    if (storedEvents !== null) {
        events = storedEvents;

        //set the stored events
        for (i=0; i < events.length; i++){
            if(events[i].event !== null){
                timeBlocks[storedEvents[i].timeblock].innerHTML = storedEvents[i].event;
            }
        }
    }
}

$(".saveBtn").on("click", function(){

    var newEvent = {
        timeblock: this.attributes.timeindex.value,
        event: timeBlocks[this.attributes.timeindex.value].value
    }

    //see if timeblock already has an event saved
    var eventExists = findAttribute(events, "timeblock", newEvent.timeblock)

    if (eventExists === -1){
        events.push(newEvent);
    }
    else{
        events.splice(eventExists,1,newEvent);
    }

    localStorage.setItem("events", JSON.stringify(events));
})

//function loops through an object array and returns the index of a given attribute
function findAttribute(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        console.log(array[i][attr]);
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//always run initialization code
init();




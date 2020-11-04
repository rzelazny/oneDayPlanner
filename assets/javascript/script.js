
// set Day
$("#currentDay").text(moment().format('ll'));

//get timeblock to set their colors
timeBlocks = $(".description");
    //var timeBlocks = document.getElementsByClassName("description");

//current time block in 24 hour time
var curTimeBlock = (moment().format('H'));

//our timeblock array starts at 9am, subtract 9 to sync with the array
curTimeBlock = curTimeBlock - 9;

console.log(timeBlocks[0]);

//color time blocks
for (var i = 0; i< timeBlocks.length; i++){

    if(i === curTimeBlock){
        //current time block is red
        timeBlocks[i].setAttribute("class", "form-control description present");
    }
    else if(i < curTimeBlock){
        //past time blocks are grey
        timeBlocks[i].setAttribute("class", "form-control description past");
    }
    else{
        //future time blocks are green
        timeBlocks[i].setAttribute("class", "form-control description future");
    }
}

//store and retrieve saved events to local storage
var events = [];
saveButtons = $(".saveBtn");

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

    //console.log($(this));
   // console.log(timeBlocks[0].value);

    var newEvent = {
        timeblock: this.attributes.timeindex.value,
        event: timeBlocks[this.attributes.timeindex.value].value
    }

    //console.log(newEvent);
    events.push(newEvent);

    //console.log(events);

    localStorage.setItem("events", JSON.stringify(events));
})

//always run initialization code
init();




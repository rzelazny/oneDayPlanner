
// set Day
var today = moment().format('ll');
$("#currentDay").text(today);

//get timeblock to set their colors

var timeBlocks = $(".description");
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





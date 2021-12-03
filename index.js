//set date as blank and adds 9 strings for the hours as displayed in the mockup
var eventsData = {
    date: "",
    events: ["", "", "", "", "", "", "", "", ""]
}
// ready makes function available after document is loaded
$(document).ready(() => {
// recalls the time from momentjs
    var today = moment()
    var now = moment()
    now.hour("")

    //Set the current day at the top, also from momentjs
    $("#currentDay").text(now.format("dddd, MMMM Do"))

    //Load events from local storage using JSON and parsing
    var events = JSON.parse(localStorage.getItem("events"))
/// if events is empty/ null then run the function 
    if (events === null) {
        eventsData.date = today
    } else {

        //make sure the existing events are for today
        let eventsDate = moment(events.date)
        if (eventsDate.date() !== today.date()) {
            console.log("not correct date")
            eventsData.date = today
        } else {
            eventsData = events
        }
    
    }
    console.log(eventsData)
    
    //runs a for loop displaying the hours from 9 to 5
    for (let i = 9; i < 18; i++) {

        today.hour(i)
        var hour = today.format("h")
     //sets am and pm denominations
        if (i < 12) {
            hour = hour + "AM"
        } else {
            hour = hour + "PM"
        }
        // sets classes and divs for the time/textarea/and save button displays
        let timeblockRow = $('<div class="row time-block"></div>')
        let time  = $(`<div class="col-2 hour">${hour}</div>`)
        let description = $('<textarea class="col-8 description"></textarea>')
        description.text(eventsData.events[i-9])
        //connects description class to the settings set on style.css based on wether or not the time is present, past, or future
        if (today.hour() < now.hour()) {
            description.addClass("past")
        } else if (today.hour() === now.hour()) {
            description.addClass("present")
        } else {
            description.addClass("future")
        }
          //creates a button and class for the right side of the document
        var saveBtn = $('<div class="col-2 saveBtn"><span class="align-middle">🖫</span></div>')
       //when button is clicked function
        saveBtn.click(() => {
             //adds the value of the text area when it is clicked
            eventsData.events[i - 9] = description.val()
             //data is stored in localstorage and then made into strings and displayed upon page refreshment
            localStorage.setItem("events", JSON.stringify(eventsData))
        
         
        })
        //appends the created values to the parent which is timeblockrow
        timeblockRow.append(time)
        timeblockRow.append(description)
        timeblockRow.append(saveBtn)
       ///appends timeblockrow to the parent container which is the timeblocks-container located in html
        $('#timeblocks-container').append(timeblockRow)
    }
    

})
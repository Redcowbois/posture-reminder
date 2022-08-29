const fs = require("fs")
const open = require("open")
const prompt = require("prompt")

let userSettings = {}
let timer = 0
console.log(`
===========================
WELCOME TO POSTURE REMINDER
===========================
`)

menuStart()

function menuStart() {
    timer = 0 
    console.log("")
    console.log("Please select one of the followings: [1] Quick Start, [2] Manual Start, [3] Settings")
    prompt.start()
    prompt.get("input", function(err, result) {
        if (result.input == 1) {
            quickStart()
        }
        else if (result.input == 2) {
            manualStart()
        }
        else if (result.input == 3) {
            settingsMenu()
        }
        else if (result.input == 4) {
            devStart()
        }
        else {
            console.log("")
            console.log("Please answer with a valid number")
            menuStart()
        }
    })
}

function manualStart() {
    prompt.start()
    console.log("")
    console.log("Enter the time interval (in minutes) you want to have between each reminder.")
    console.log("This interval must be between 1 and 60 minutes.")
    prompt.get([
        {
            name: "interval",
            description: "Reminder Interval (minutes)",
            required: "true"
        }
    ], function(err, result) {
        let userInterval = parseInt(result.interval)
        if (userInterval && userInterval>0 && userInterval <= 60) {
            console.log("")
            console.log("Starting the timer...")
            setTimeout(() => {
                console.log("")
                console.log("")
                console.log("")
                console.log("Timer started!")
                console.log("")
                console.log("Make sure you have your sounds on to hear the reminder!")
                console.log(timer)
                postureTimer(userInterval)
                console.time()
            }, 1500)
            setTimeout(stopTimerPrompt, 2500)
        }
        else {
            console.log("")
            console.log("Please enter a valid time interval.")
            manualStart()
        }
    })

}

function stopTimerPrompt() {
    console.log("")
    console.log("If you wish to stop the reminders, type any character and press enter.")
    prompt.start()
    prompt.get([{name: "end", description: "Enter any character to stop"}], function(err, result) {
        console.log("")
        console.log("Stopping timer and bringing back the home page...")
        setTimeout(menuStart, 1000)
    })

}
function postureTimer(maxTime) {
    if (timer >= maxTime*60) {
        return playSound()
    } else {
        if (timer%15 == 0) {
            timer++
        }
        timer++
        setTimeout(postureTimer, 1000, maxTime)
    }
}

function playSound() {
    open(`./sounds/random.mp3`)
    console.timeEnd()
    timer = 0 
    postureTimer()
}
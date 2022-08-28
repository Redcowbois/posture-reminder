const fs = require("fs")
const sound = require("sound-play")
const prompt = require("prompt")

let userSettings = {}
let timer = 0
sound.play("AHOY.mp3")
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
        if (result.input == 2) {
            manualStart()
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
            postureTimer(userInterval)
            stopTimerPrompt()
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
        setTimeout(menuStart,2000)
    })

}
function postureTimer(maxTime) {
    if (timer >= maxTime*60) {
        return playSound()
    } else {
        if (timer%10 == 0) {
            timer++
        }
        timer++
        setTimeout(postureTimer, 1000, maxTime)
    }
}

function playSound() {
    playSound.play
}
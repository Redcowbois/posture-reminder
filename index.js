const fs = require("fs")
const playSound = require("play-sound")
const prompt = require("prompt")

let userSettings = {}

console.log(`
===========================
WELCOME TO POSTURE REMINDER
===========================
`)

menuStart()

function menuStart() {
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
            postureReminder()
        }
        else {
            console.log("")
            console.log("Please enter a valid time interval.")
            manualStart()
        }
    })

}

function postureReminder() {
    console.log(`1`)
}
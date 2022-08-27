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
    console.log("Please select one of the followings: [1] Quick Start, [2] Manual Start, [3] Settings")
    prompt.start()
    prompt.get([input], function(err, result) {
        if (result.input == 1) {
            postureStart()
        }
        if (result.input == 2) {
            settingsStart()
        }
        else {
            console.log("Please answer with a valid number")
            menuStart()
        }
    })
}

function postureStart() {
    prompt.start()
    prompt.get()
}
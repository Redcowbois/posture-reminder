const fs = require("fs")
const open = require("open")
const prompt = require("prompt")

let userSettings = {}
let timer = 0
let running = true
let allSounds = {
    1: "ahoy",
    2: "onichan",
    3: "ping",
    4: "turnedon",
    5: "wise",
    6: "yooo"
}

console.log(`
===========================
WELCOME TO POSTURE REMINDER
===========================
`)

menuStart()

function menuStart() {
    timer = 0 
    running = true 

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
            prompt.start()
            prompt.get(["time", "sound"], function(err,result) {
                postureTimer(result.time/60, `./sounds/${result.sound}.mp3`)
                console.time("time")
                stopPostureTimer()
            })
        }
        else {
            console.log("")
            console.log("Please answer with a valid number")
            menuStart()
        }
    })
}

function quickStart() {
    let quickStartPromise = new Promise((resolve, reject) => {
        fs.readFile("userSettings.JSON", "utf8", function(err, data) {
            resolve(data)
        })
    })
    quickStartPromise.then((data) => {
        userSettings = JSON.parse(data) 
        console.log("")
        console.log(`The reminder interval has been set to ${userSettings.interval} minutes.`)
        console.log(`The alarm sound has been set to ${userSettings.sound}.`)
        console.log("")
        console.log("You can change these settings in the settings menu.")
        setTimeout(() => {
            console.log("")
            console.log("Timer Started")
        postureTimer(userSettings.interval, userSettings.sound)},1500)
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
            soundPrompt()
            function soundPrompt()
            {console.table(allSounds)
            console.log("Please select a reminder sound, you can preview these in the settings menu.")
            prompt.get(["sound id"], function(err, result) {
                if (allSounds[result["sound id"]]) {
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
                    postureTimer(userInterval, `./sounds/${allSounds[result["sound id"]]}.mp3`)
                    console.time("time")
                    }, 1500)
                    setTimeout(stopPostureTimer, 2500)
                } else {
                    console.log("Please input a valid sound id.")
                    soundPrompt()
                }}
    )}
        }
        else {
            console.log("")
            console.log("Please enter a valid time interval.")
            manualStart()
        }
    })

}

function postureTimer(maxTime, reminderSound) {
    if (running) {
        if (timer >= maxTime*60) {
            timer = 0 
            open(reminderSound)
            console.timeEnd("time")
            return postureTimer(maxTime, reminderSound)
        } else {
            if (timer%20 == 0 && timer > 0) {
                timer++
            }
            timer++
            console.log(timer)
            return setTimeout(postureTimer, 1000, maxTime, reminderSound)
        }
    }        
}

function stopPostureTimer() {
    console.log("")
    console.log("If you wish to stop the reminders, type any character and press enter.")
    prompt.start()
    prompt.get([{name: "end", description: "Enter any character to stop"}], function(err, result) {
        console.log("")
        console.log("Stopping timer and bringing back the home page...")
        running = false 
        setTimeout(menuStart, 1000)
    })

}

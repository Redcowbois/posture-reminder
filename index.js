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

<<<<<<< HEAD


function settingsMenu() {
    console.log("")
    console.log("Please choose one of the following:")
    console.log("")
    console.log("  [1] Change quick start settings")
    console.log("  [2] Preview sound effects")
    console.log("  [3] Return to main menu")
    console.log("")
    prompt.get(["input"], function(err, result) {
        switch(result["input"]) {
            case "1":
                settingsIntervalPrompt()
                function settingsIntervalPrompt() {
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
                    if (parseInt(result.interval) > 0 && parseInt(result.interval) <= 60) {
                        console.log(parseInt(result.interval))
                        settingsSoundPrompt(parseInt(result.interval))
                        function settingsSoundPrompt(interval) {
                            console.table(allSounds)
                            console.log("Please select a reminder sound, you can preview these in the settings menu.")
                            prompt.get(["sound id"], function(err, result) {
                                 if (allSounds[result["sound id"]]) {
                                    let userSettingsObject = {
                                        "interval": interval,
                                        "sound": `./sounds/${allSounds[result["sound id"]]}.mp3`
                                    }
                                    fs.writeFile("./userSettings.JSON", JSON.stringify(userSettingsObject), () => {
                                        console.log("")
                                        console.log(`Interval now set to ${interval} minutes.`)
                                        console.log(`Sound now set to ${allSounds[result["sound id"]]}.mp3`)
                                        console.log("")
                                        console.log("Returning to menu...")
                                        console.log("")
                                        setTimeout(menuStart, 1500)
                                    })
                                    } else {
                                        console.log("Please input a valid sound id.")
                                        settingsSoundPrompt()
                                    }
                        } 
                )}
                } else {
                    console.log("")
                    console.log("Please select a valid interval.")
                    settingsIntervalPrompt()
                }})}
                break
            case "2":
                previewSounds()
                function previewSounds() {
                    console.log("")
                    console.log("Please select a sound to preview.")
                    console.table(allSounds)
                    console.log(`Enter "exit" if you wish to return to the settings menu.`)
                    prompt.get(["sound"], (err, result) => {
                        if (result["sound"] == "exit") {
                            console.log("")
                            return settingsMenu()
                        }
                        else if (allSounds[result["sound"]]) {
                            open(`./sounds/${allSounds[result["sound"]]}.mp3`)
                            return previewSounds()
                        }
                        else {
                            return previewSounds()
                        }
                    })
                }
                break    
            case "3":
                console.log("")
                menuStart()
                break
            default: 
                console.log("")
                console.log("Please select a valid option.")
                settingsMenu()
                break
        }
    })
}

>>>>>>> settings
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

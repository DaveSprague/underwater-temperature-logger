// A Button, Start logging,
// 
// B Button, Stop Logging
// 
// A+B Button, DELETE LOG
datalogger.onLogFull(function () {
    logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    logging = true
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.AB, function () {
    basic.showIcon(IconNames.Skull)
    logging = false
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "Sensor",
    "WaterTemp1mC",
    "WaterTemp3mC"
    )
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.B, function () {
    logging = false
    basic.showIcon(IconNames.No)
})
let logging = false
let SensorLabel = "Z"
let samplePeriodSeconds = 1
logging = false
NTCSensorEq.setb(NTC_B.B3950)
basic.showIcon(IconNames.No)
datalogger.setColumnTitles(
"Sensor",
"WaterTemp1mC",
"WaterTemp3mC"
)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
datalogger.mirrorToSerial(true)
loops.everyInterval(samplePeriodSeconds * 1000, function () {
    if (logging) {
        basic.showIcon(IconNames.Happy)
        basic.clearScreen()
        datalogger.log(
        datalogger.createCV("Sensor", SensorLabel),
        datalogger.createCV("WaterTemp1mC", NTCSensorEq.Temperature(pins.analogReadPin(AnalogPin.P1))),
        datalogger.createCV("WaterTemp3mC", NTCSensorEq.Temperature(pins.analogReadPin(AnalogPin.P0)))
        )
    }
})

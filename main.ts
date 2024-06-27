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
    datalogger.deleteLog()
    datalogger.setColumnTitles(
    "WaterTemp1mC",
    "WaterTemp3mC"
    )
})
input.onButtonPressed(Button.B, function () {
    logging = false
    basic.showIcon(IconNames.No)
})
let logging = false
NTCSensor.set(NTC_B.B3950)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Seconds)
datalogger.mirrorToSerial(true)
logging = false
basic.showIcon(IconNames.No)
datalogger.setColumnTitles(
"WaterTemp1mC",
"WaterTemp3mC"
)
loops.everyInterval(5000, function () {
    if (logging) {
        basic.showIcon(IconNames.Happy)
        datalogger.log(
        datalogger.createCV("WaterTemp1mC", NTCSensor.Temperature(pins.analogReadPin(AnalogPin.P3))),
        datalogger.createCV("WaterTemp3mC", NTCSensor.Temperature(pins.analogReadPin(AnalogPin.P4)))
        )
        basic.clearScreen()
    }
})

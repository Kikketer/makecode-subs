namespace Player {
    export let myName: number
    let myBoats: Array<typeof Boat> = []

    function move() {
        console.log('Moving! ' + myName)
        myBoats[0].move(10, 5)
    }

    function perform() {
        myBoats[0].performAction()
    }

    export function init() {
        myName = Math.randomRange(0, 20)
        console.log('Init player ' + myName)

        Boat.init()

        controller.up.onEvent(ControllerButtonEvent.Pressed, move)
        controller.A.onEvent(ControllerButtonEvent.Pressed, perform)
    }

    export function onPlanningComplete() {}
}

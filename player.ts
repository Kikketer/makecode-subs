namespace Player {
    let mySprite: Sprite
    export let myName: number
    let myBoats: Array<Boat> = []

    function move() {
        console.log('Moving! ' + myName)
        myBoats[0].move(10, 5)
    }

    function perform() {
        // mp.setPlayerState(mp.getPlayerByIndex(0), 0, 1)
        mp.getPlayerProperty(mp.getPlayerByIndex(0), mp.PlayerProperty.Index)
        myBoats[0].performAction()
    }

    function createBoat() {
        myBoats.push(new Boat(60, 60))
    }

    export function init() {
        myName = Math.randomRange(0, 20)
        console.log('Init player ' + myName)

        myBoats[0] = new Boat(30, 30)

        controller.up.onEvent(ControllerButtonEvent.Pressed, move)
        controller.A.onEvent(ControllerButtonEvent.Pressed, perform)
        controller.B.onEvent(ControllerButtonEvent.Pressed, createBoat)
    }

    export function onPlanningComplete() {}
}

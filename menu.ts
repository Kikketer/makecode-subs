namespace Menu {
    const selections = [
        { text: 'Move Boat', callback: () => {} }, 
        { text: 'Drop Charge', callback: () => {} }
    ]

    let currentSelectionIndex: number = 0
    let menuSprite: Sprite

    export function focus({ onMoveBoat, onDropCharge }: { onMoveBoat: () => void, onDropCharge: () => void }) {
        menuSprite = sprites.create(assets.image`Menu Background`)

        selections[0].callback = onMoveBoat
        selections[1].callback = onDropCharge

        controller.down.addEventListener(ControllerButtonEvent.Pressed, onDown)
        controller.up.addEventListener(ControllerButtonEvent.Pressed, onUp)
        controller.A.addEventListener(ControllerButtonEvent.Pressed, onSelect)
    }

    export function blur() {
        controller.down.removeEventListener(ControllerButtonEvent.Pressed, onDown)
        controller.up.removeEventListener(ControllerButtonEvent.Pressed, onUp)
        controller.A.removeEventListener(ControllerButtonEvent.Pressed, onSelect)
    }

    function onDown() {
        currentSelectionIndex += 1
        if (currentSelectionIndex > selections.length - 1) {
            currentSelectionIndex = 0
        }
    }

    function onUp() {
        currentSelectionIndex -= 1
        if (currentSelectionIndex < 0) {
            currentSelectionIndex = selections.length - 1
        }
    }

    function onSelect() {
        selections[currentSelectionIndex].callback()
    }

    function render() {
        menuSprite.x = 80
        menuSprite.y = 50
    }
}
